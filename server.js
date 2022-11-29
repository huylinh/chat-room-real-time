const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { default: initAPIRoutes } = require("./src/routers/api");

const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
initAPIRoutes(app);

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("sendMessage", (msg) => {
    console.log("gui mess on sever: ", msg);
    axios({
      method: "post",
      url: "https://sheetdb.io/api/v1/eqmb0knb7l8rv",
      data: {
        id: msg.id,
        name: msg.name,
        message: msg.message,
        to: msg.to,
        realtime: new Date(),
        time: new Date().toLocaleTimeString(),
      },
    });
    socket.broadcast.emit("sendToAll", msg);
    //socket.broadcast.emit("sendTo${userID}");
  });
});

http.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
