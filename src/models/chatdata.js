"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatData.init(
    {
      id_message: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      name: DataTypes.STRING,
      to: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      time: DataTypes.DATE,
      seen: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ChatData",
    }
  );
  ChatData.removeAttribute("id");
  return ChatData;
};
