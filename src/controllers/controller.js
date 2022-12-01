import services from "../services/services";
let index = (req, res) => {
  return res.render("index");
};

let getAllMessage = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let data = await services.allMessages();
  return res.status(200).json({
    messages: data,
  });
};

let getUserMessage = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let id = req.params.id;
  let data = await services.userMessages(id);
  return res.status(200).json({
    messages: data,
  });
};

let getAllUser = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let users = await services.allUsers();
  return res.status(200).json({
    users: users,
  });
};

let postMessage = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let data = req.body;
  let response = services.insertMessage(data);
  return res.status(200).json({
    response: response,
  });
};

let postMessageAllUsers = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let users = await services.allUsers();
  let { message } = req.body;

  users.forEach((user) => {
    if (user.id != -1) {
      let data = {
        id_message: new Date().getTime(),
        id_user: -1,
        name: user.name,
        to: user.id_user,
        message: message,
        time: new Date(),
        seen: false,
      };
      services.insertMessage(data);
    }
  });

  return res.status(200).json({
    message: "OK",
  });
};

let seenMessage = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let data = req.body;
  let response = services.seenMessage(data);
  res.status(200).json({
    response: response,
  });
};

module.exports = {
  index,
  getAllMessage,
  getUserMessage,
  getAllUser,
  postMessage,
  postMessageAllUsers,
  seenMessage,
};
