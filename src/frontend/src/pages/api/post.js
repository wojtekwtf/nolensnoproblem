import { ethers } from "ethers";

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
}
);

export default async function handler(req, res) {
  if (req.method === "POST") {

    const newName = `post-content-${uuidv4()}.json`

    const body = JSON.stringify({
      "name": req.body.content.slice(0, 20),
      "content": req.body.content,
      "metadata_id": `${uuidv4()}`,
      "version": "1.0.0",
      "appId": "nolensnoproblem"
    })

    s3.putObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newName,
      Body: body,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
    }, async (res) => { console.log(res) })

    const S3URL = `https://nolensnoproblem.s3.eu-west-2.amazonaws.com/${newName}`

    const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/MhC_Qtps3STFQYQ8oRyWtH02KmlnVx69");

    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractAddress = "0x69b43710cea07fa668e6efb71073d45bbd5aec42";
    const contractABI = [{ "inputs": [{ "internalType": "address", "name": "_lensHub", "type": "address" }, { "internalType": "address", "name": "_collectModule", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "string", "name": "postContent", "type": "string" }], "name": "post", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setHandleTokenId", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const postTxUnsigned = await contract.post.populateTransaction(S3URL);
    postTxUnsigned.chainId = 80001;
    postTxUnsigned.gasLimit = await contract.post.estimateGas(S3URL);
    postTxUnsigned.maxFeePerGas = (await provider.getFeeData()).maxFeePerGas;
    postTxUnsigned.maxPriorityFeePerGas = (await provider.getFeeData()).maxPriorityFeePerGas;
    postTxUnsigned.nonce = await provider.getTransactionCount(wallet.address);

    const submittedTx = await wallet.sendTransaction(postTxUnsigned);

    const postReceipt = await submittedTx.wait();
    if (postReceipt.status === 0) {
      console.log("fail")
    }
    else {
      console.log("success")
    }

    res.status(200).json({ data: "done" })
  }
}