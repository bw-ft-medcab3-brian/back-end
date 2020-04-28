const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const fetch = require("node-fetch");

const usersRouter = require("../users/user-router.js");
const authRouter = require("../auth/auth-router.js");
const authenticator = require("../auth/authenticator.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});
server.get("/external", (req, res) => {
    fetch("https://medcab-3.herokuapp.com/strains.json")
        .then(res => console.log(res.text()))
        .catch(error => error.json({ error: error }))
})

module.exports = server;