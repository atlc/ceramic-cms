import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { ReqUser, Users } from "../../types";
import * as bcrypt from "bcrypt";
import * as db from "../db";
import * as passport from "passport";
import { createToken } from "../utils/tokens";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, name, password }: Users = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Missing one or more fields from registration" });
        }

        const id = uuidv4();
        const hashed = await bcrypt.hash(password, 12);

        const newUser = { id, email, name, password: hashed };
        await db.users.register(newUser);

        const token = createToken({ id, email });
        res.status(201).json({ message: "Registered successfully!", id, token });
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred", error });
    }
});

router.post("/login", passport.authenticate("local"), async (req: ReqUser, res) => {
    const token = createToken({ id: req.user.id, email: req.user.email });
    res.status(200).json({ message: "Login successful!", id: req.user.id, token });
});

export default router;
