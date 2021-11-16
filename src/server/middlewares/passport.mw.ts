import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as JWTStrategy from "passport-jwt";
import * as db from "../db";
import * as bcrypt from "bcrypt";
import { Users } from "../../types";
import { jwt_conf } from "../config";

passport.serializeUser((user: Users, done) => {
    if (user.password) delete user.password;
    done(null, user);
});

passport.deserializeUser((user, done) => done(null, user));

passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            session: false
        },
        async (email, password, done) => {
            try {
                const [user] = await db.users.getOneBy("email", email);

                if (!user || !user.password) return done(null, false);

                const matches = await bcrypt.compare(password, user.password);
                delete user.password;

                if (matches) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.use(
    new JWTStrategy.Strategy(
        {
            jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_conf.secret
        },
        (payload, done) => done(null, payload)
    )
);
