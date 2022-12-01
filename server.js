const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { default: configViewEngine } = require("./src/config/viewEngine");
const { default: initAPIRoutes } = require("./src/routers/api");

const app = express();
const http = require("http").createServer(app);

const PORT = 3001;

// app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
configViewEngine(app);
initAPIRoutes(app);

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("sendMessage", (msg) => {
    console.log("gui mess on sever: ", msg);
    axios({
      method: "post",
      url: "http://localhost:3001/api/chat",
      data: {
        id_message: new Date().getTime(),
        id_user: msg.id_user,
        name: msg.name,
        message: msg.message,
        to: msg.to,
        time: new Date(),
        seen: false,
      },
    });
    socket.broadcast.emit("sendToAll", msg);
    //socket.broadcast.emit("sendTo${userID}");
  });
});

http.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
