
const axios = require("axios")
const express = require("express");
const path = require("path");

const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("sendMessage", (msg) => {
    // console.log(msg);
    axios({
      method: 'post',
      url: 'https://sheetdb.io/api/v1/eqmb0knb7l8rv',
      data: {
        id: msg.user,
        type: msg.type,
        tinnhan: msg.message,
        time:  new Date(),
      }
    });
    socket.broadcast.emit("sendToAll", msg);
    //socket.broadcast.emit("sendTo${userID}");
  });
});

http.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
