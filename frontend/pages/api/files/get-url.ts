import aws from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const post = s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 5242880], // up to 5 MB
    ],
  });

  res.status(200).json({post, fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.query.file}`});
}