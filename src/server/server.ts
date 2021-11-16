import * as express from "express";
import routes from "./routes";
import * as passport from "passport";
import * as path from "path";

import "./middlewares/passport.mw";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(routes);
app.use(passport.initialize());

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
