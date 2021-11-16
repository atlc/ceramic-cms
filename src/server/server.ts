import * as express from "express";
import routes from "./routes";
import * as passport from "passport";

import "./middlewares/passport.mw";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(routes);
app.use(passport.initialize());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
