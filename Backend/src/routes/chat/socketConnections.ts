import * as socketio from "socket.io";
import * as path from "path";
import express from 'express';
const app = express();
app.set("port", process.env.PORT || 4000);
let http = require("http").Server(app);
let io = require("socket.io")(http);



app.get("/", (req: any, res: any) => {
  res.send({
    working : true
});
});


io.on("connection", function(socket: any) {
  console.log("a user connected");
});


const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});