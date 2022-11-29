import { Op } from "sequelize";
import db from "../models/index";

let allMessages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let messages = db.ChatData.findAll({
        attributes: ["id_message","id_user", "name", "to", "message", "time","seen"],
        raw: true,
        order: [["time", "ASC"]],
      });
      resolve(messages);
    } catch (error) {
      reject(e);
    }
  });
};

let userMessages = (id) => {
  return new Promise((resolve, reject) => {
    let condition = {
      [Op.or]: [
        {
          id_user: id,
        },
        {
          to: id,
        },
      ],
    };
    try {
      let messages = db.ChatData.findAll({
        attributes: ["id_message","id_user", "name", "to", "message", "time","seen"],
        where: condition,
        order: [["time", "ASC"]],
        raw: true,
      });
      resolve(messages);
    } catch (error) {
      reject(error);
    }
  });
};

let allUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.ChatData.findAll({
        attributes: ["id_user", "name"],
        group: ["id_user"],
      });
      resolve(users);
    } catch (error) {
      reject(e);
    }
  });
};

let insertMessage = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let response = db.ChatData.create({
        id_message: data.id_message,
        id_user: data.id_user,
        name: data.name,
        to: data.to,
        message: data.message,
        time: data.time,
        seen: false,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

let seenMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data)
      let mess = await db.ChatData.update({
        seen: data.seen,
      },{
        where: {
          id_user: data.id_user,
        },
      },{ multi: true });
      console.log(mess);
      resolve("Success");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  allMessages,
  userMessages,
  insertMessage,
  allUsers,
  seenMessage,
};
