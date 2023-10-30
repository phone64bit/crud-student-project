const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use("*/css", express.static(path.join(__dirname, "/public/css")));
app.use("*/js", express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");

app.use("", (req, res, next) => {
    console.log(`[${res.statusCode}] ${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
});

app.use("/student", require("./src/routes/student"));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});