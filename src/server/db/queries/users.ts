import { Query } from "..";
import { Users } from "../../../types";

export const register = (newUser: Users) => Query("INSERT INTO Users SET ?", [newUser]);
export const getOneBy = (column: string, value: string) => Query<Users[]>("SELECT * FROM Users WHERE ?? = ?", [column, value]);
