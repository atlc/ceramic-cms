import * as mysql from "mysql";
import { sql_info } from "../config";

interface MySQL_Res {
    affectedRows: number;
}

const pool = mysql.createPool(sql_info);

export const Query = <T = MySQL_Res>(query: string, values: unknown) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, data) => (err ? reject(err) : resolve(data)));
    });
};

export * as users from "./queries/users";
export * as items from "./queries/items";
