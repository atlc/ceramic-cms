import * as express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import * as passport from "passport";

const router = express.Router();

router.use("/api/token_check", passport.authenticate("jwt"), (req, res) => {
    res.status(200).json({ message: "All good here!" });
});

router.use("/api/items", passport.authenticate("jwt"), apiRouter);
router.use("/auth", authRouter);

export default router;
