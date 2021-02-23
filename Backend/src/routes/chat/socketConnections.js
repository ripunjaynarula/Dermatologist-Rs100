"use strict";
exports.__esModule = true;
var app = require("express")();
app.set("port", 4000);
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get("/", function(req, res) {
    res.send({
        working: true
    });
});
io.on("connection", function(socket) {
    res.send({
        s: true
    });
    console.log("a user connected");
});
var server = http.listen(4000, function() {
    console.log("listening on *:3000");
});