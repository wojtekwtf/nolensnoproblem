import type { NextApiRequest, NextApiResponse } from 'next'

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
  }
}
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: newName,
      Body: body,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
    }, async (res) => { console.log(res) })


    res.status(200).json({ data: "done" })
  }
}