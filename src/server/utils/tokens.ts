import * as jwt from "jsonwebtoken";
import { Payload } from "../../types";
import { jwt_conf } from "../config";

export const createToken = (payload: Payload) => {
    const token = jwt.sign(payload, jwt_conf.secret, { expiresIn: jwt_conf.expiration });
    return token;
};
