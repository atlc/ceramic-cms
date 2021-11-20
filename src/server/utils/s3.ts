import * as AWS from "aws-sdk";
import { aws as aws_conf } from "../config";

AWS.config.update({ region: aws_conf.region });
const s3 = new AWS.S3({ apiVersion: aws_conf.apiVersion });

export const uploadS3 = (file: Buffer, filename: string) => {
    return new Promise((resolve, reject) => {
        const uploadParams = {
            Bucket: aws_conf.s3.bucketName,
            Key: filename,
            Body: file,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: "image/jpeg"
        };

        //@ts-ignore
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
