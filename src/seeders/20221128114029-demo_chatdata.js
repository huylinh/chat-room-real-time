"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "ChatData",
      [
        {
          id_message: 1,
          id_user: 1,
          name: "Minh",
          to: -1,
          message: "Chào ông chủ",
          time: new Date(),
          seen: 0,
        },
        {
          id_message: 2,
          id_user: -1,
          name: "Admin",
          to: 1,
          message: "Xin chào quý khách",
          time: new Date(),
          seen: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
