import * as express from "express";
import itemsRouter from "./api";
import authRouter from "./auth";
import { hasValidToken } from "../middlewares/auth.mw";

const router = express.Router();

router.use("/api/token_check", hasValidToken, (req, res) => {
    res.status(200).json({ message: "All good here!" });
});

router.use("/api/items", hasValidToken, itemsRouter);

router.use("/auth", authRouter);

export default router;
