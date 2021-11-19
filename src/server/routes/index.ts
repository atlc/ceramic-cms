import * as express from "express";
import itemsRouter from "./api";
import uploadsRouter from "./uploads";
import authRouter from "./auth";
import { hasValidToken } from "../middlewares/auth.mw";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/uploads", hasValidToken, uploadsRouter);
router.use("/api/items", hasValidToken, itemsRouter);
router.use("/api/token_check", hasValidToken, (req, res) => res.status(200).json({ message: "All good here!" }));

export default router;
