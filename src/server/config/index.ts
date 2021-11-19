import * as dotenv from "dotenv";

dotenv.config();

export const sql_info = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
};

export const jwt_conf = {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION
};

export const aws = {
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
        bucketName: process.env.AWS_S3_BUCKET_NAME
    }
};
