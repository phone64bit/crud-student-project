const express = require("express");
const app = express();
const router = express.Router();
let userData = require("../data/user.json");
const fs = require("fs");

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", (req, res) => {
    let json = {"id": userData.length};
    Object.assign(json, req.body);
    userData.push(json);
    res.json({"status": "success", "header":"Success" ,"content": "Saved!"});
    fs.writeFile("./src/data/user.json", JSON.stringify(userData), (err) => { if(err) console.error(err); });
    delete require.cache[require.resolve("../data/user.json")];
    userData = require("../data/user.json");
})

router.get("/", (req, res) => {
    res.render("students", {user: userData});
});

router.post("/", (req, res) => {
    var id = req.body.id;
    var error = 1;
    userData.forEach((data) => {
        if(data.id==id) {
            userData.pop(data);
            error = 0;
            return;
        }
    })
    if(error == 0) res.json({"status": "success", "header":"Success" ,"content": "Saved!"});
    if(error == 1) res.json({"status": "error", "header":"Error" ,"content": "An Error Occurred!"});
    fs.writeFile("./src/data/user.json", JSON.stringify(userData), (err) => { if(err) console.error(err); });
    delete require.cache[require.resolve("../data/user.json")];
    userData = require("../data/user.json");
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.render("student", {user: userData[id]});
});

router.post("/:id", (req, res) => {
    const id = req.params.id;
    var error = 1;
    userData.forEach((data) => {
        if(data.id==id) {
            Object.assign(data, req.body);
            error = 0;
            return;
        }
    })
    if(error == 0) res.json({"status": "success", "header":"Success" ,"content": "Saved!"});
    if(error == 1) res.json({"status": "error", "header":"Error" ,"content": "An Error Occurred!"});
    fs.writeFile("./src/data/user.json", JSON.stringify(userData), (err) => { if(err) console.error(err); });
    delete require.cache[require.resolve("../data/user.json")];
    userData = require("../data/user.json");
});

module.exports = router;