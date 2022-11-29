import services from "../services/services";

let getAllMessage = async (req, res) => {
  let data = await services.allMessages();
  return res.status(200).json({
    messages: data,
  });
};

let getUserMessage = async (req, res) => {
  let id = req.params.id_user;
  let data = await services.userMessages(id);
  return res.status(200).json({
    messages: data,
  });
};

let getAllUser = async (req, res) => {
  let users = await services.allUsers();
  return res.status(200).json({
    users: users,
  });
};

let postMessage = async (req, res) => {
  let data = req.body;
  let response = services.insertMessage(data);
  res.status(200).json({
    response: response,
  });
};

let putMessage = async (req, res) => {
  await services.updateMessage(req.params);
  return res.status(200).json({
    mess: "OK",
  });
};

module.exports = {
  getAllMessage,
  getUserMessage,
  getAllUser,
  postMessage,
  putMessage,
};
