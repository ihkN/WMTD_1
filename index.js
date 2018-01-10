"use strict";
var express = require("express");
var sio = require("socket.io");
var app = express();
var path = require("path");

app.use(express.static("app"));
app.use('/bower_components', express.static('bower_components'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/app/index.html"));
});

var server = app.listen("80", "*");

var io = sio.listen(server);

io.sockets.on("connect", (socket) => {

    socket.broadcast.emit("userConnected",{ "msg": "User Connected" });

    socket.on("textChange", (payload) => {

        console.log(payload);

        socket.broadcast.emit("textChanged", { payload });
    });
});
