import * as express from "express";
import { Items, ReqUser } from "../../types";
import { v4 as uuidv4 } from "uuid";
import * as db from "../db";

const router = express.Router();

router.post("/", async (req: ReqUser, res) => {
    try {
        const {
            name,
            description,
            image_url,
            purchase_price,
            purchase_date,
            purchase_location,
            listing_price,
            listing_date,
            listing_links,
            comp_listings
        }: Items = req.body;

        const id = uuidv4();
        const user_id = req.user.id;

        const newItem = {
            id,
            user_id,
            name,
            description,
            image_url,
            purchase_price,
            purchase_date,
            purchase_location,
            listing_price,
            listing_date,
            listing_links,
            comp_listings
        };
        await db.items.create(newItem);
        res.status(201).json({ message: "Item created!", id });
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

router.get("/profile", (req: ReqUser, res) => {
    res.json(req.user);
});

router.get("/", async (req: ReqUser, res) => {
    try {
        const userId = req.user.id;
        const items = await db.items.getAllByUser(userId);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

router.get("/:id", async (req: ReqUser, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.params.id;
        const [item] = await db.items.getOneBy("id", itemId, userId);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

router.put("/:id", async (req: ReqUser, res) => {
    try {
        const {
            name,
            description,
            image_url,
            purchase_price,
            purchase_date,
            purchase_location,
            listing_price,
            listing_date,
            listing_links,
            comp_listings
        }: Items = req.body;

        const id = req.params.id;
        const user_id = req.user.id;

        const updatedItem = {
            id,
            user_id,
            name,
            description,
            image_url,
            purchase_price,
            purchase_date,
            purchase_location,
            listing_price,
            listing_date,
            listing_links,
            comp_listings
        };
        await db.items.update(updatedItem, id, user_id);
        res.status(201).json({ message: "Item created!", id });
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

router.delete("/:id", async (req: ReqUser, res) => {
    try {
        const id = req.params.id;
        const userId = req.params.id;

        await db.items.destroy(id, userId);
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

export default router;
