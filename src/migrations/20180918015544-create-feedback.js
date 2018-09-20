'use strict';
 module.exports = {
   up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('Feedbacks', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       feedbackerId: {
         type: Sequelize.INTEGER,
       },
       feedbackeeId: {
         type: Sequelize.INTEGER,
       }, 
       stars: {
         type: Sequelize.INTEGER,
         allowNull: false
       },
       comment: {
         type: Sequelize.TEXT,
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
       }
     });
   },
   down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('Feedbacks');
   }
 }; 
