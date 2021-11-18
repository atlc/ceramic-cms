import { Query } from "..";
import { Items } from "../../../types";

export const create = (newItem: Items) => Query("INSERT INTO Items SET ?", [newItem]);
export const getOneBy = (column: string, value: string, userId: string) =>
    Query<Items[]>("SELECT * FROM Items WHERE ?? = ? AND user_id=?", [column, value, userId]);
export const getAllByUser = (userId: string) => Query<Items[]>("SELECT * FROM Items WHERE user_id=?", [userId]);
export const update = (updatedItem: Items, itemId: string, userId: string) =>
    Query("UPDATE Items SET ? WHERE id=? AND user_id=?", [updatedItem, itemId, userId]);
export const destroy = (itemId: string, userId: string) => Query("DELETE FROM Items WHERE id=? AND user_id=?", [itemId, userId]);
