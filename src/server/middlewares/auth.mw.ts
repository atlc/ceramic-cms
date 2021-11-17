import * as passport from "passport";
import { RequestHandler } from "express";

export const hasValidToken: RequestHandler = (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
        if (err) return res.status(500).json({ message: "An unknown error occurred.", error: err });
        if (info) return res.status(401).json({ message: "An error occured authenticating.", error: info.message });
        if (!user) return res.status(401).json({ message: "Invalid credentials." });

        if (user.password) delete user.password;
        req.user = user;
        next();
    })(req, res, next);
};

export const validateLocalAuth: RequestHandler = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ message: "An unknown error occurred.", error: err });
        if (info) return res.status(401).json({ message: "An error occured authenticating.", error: info.message });
        if (!user) return res.status(401).json({ message: "Invalid credentials." });

        if (user.password) delete user.password;
        req.user = user;
        next();
    })(req, res, next);
};
