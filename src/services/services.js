import db from "../models/index";

let allMessage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let messages = db.ChatData.findAll({
        attributes: ["id_user", "name", "to", "message", "time"],
        raw: true,
      });
      resolve(messages);
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  allMessage,
};
