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
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log(message);
  });

});


const server = http.listen(4000, function() {
  console.log("listening on *:4000");
});