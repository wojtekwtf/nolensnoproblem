// import { getSimpleAccount } from "@/utils/getSimpleAccount";

export default function Button() {

  //   const deployAcount = async () => {

  //     // // create the account
  //     // const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  //     // console.log(provider)
  //     // const accountAPI = getSimpleAccount(
  //     //   provider,
  //     //   config.signingKey,
  //     //   config.entryPoint,
  //     //   config.simpleAccountFactory
  //     // );
  //     // const address = await accountAPI.getCounterFactualAddress();

  //     // console.log(`SimpleAccount address: ${address}`);

  //     // setLoading(true);

  //     // create the account
  //     // 
  //     // deploy the account
  //     // send the transaction
  //     // encode call data with


  //     // // WEB2 SHIT
  //     // content = captureTextFromTextbox()

  //     // // verification
  //     // sismoProof = VerifyWithSismo()
  //     // worldcoinProof = VerifyWithWorldcoin()


  //     // // POST LOGIC
  //     // contentURI = uploadContentToFilestorage(content)
  //     // account = createAccount(contractCode);
  //     // deployAccount(account, sismoProof, worldcoinProof)
  //     // sendTransaction(account, content, sismoProof, worldcoinProof)




  //     const txHash = await window.ethereum.request({
  //       method: 'eth_sendTransaction',
  //       params: [
  //         {
  //           from: activeAccount,
  //           to: ethers.constants.AddressZero,
  //           data: '0x',
  //         },
  //       ],
  //     });

  //     // setLoading(false);
  //   };

  return (
    <>
      <button
        onClick={() => deployAcount()}
        className="rounded-lg font-medium bg-[#ABFE2C] text-[#00501E] px-3.5 py-2.5 text-sm hover:bg-[#E5FFBE] mx-auto"
      >
        Post on Lens
      </button>
    </>
  )
}
