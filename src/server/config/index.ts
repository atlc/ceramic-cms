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
