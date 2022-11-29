import { Op } from "sequelize";
import db from "../models/index";

let allMessages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let messages = db.ChatData.findAll({
        attributes: ["id_user", "name", "to", "message", "time"],
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
        attributes: ["id_user", "name", "to", "message", "time"],
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
        id_user: data.id,
        name: data.name,
        to: data.to,
        message: data.message,
        time: data.time,
      });
      resolve(response);
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
};
