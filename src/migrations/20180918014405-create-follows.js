'use strict';
 module.exports = {
   up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('Follows', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       followerId: {
         type: Sequelize.INTEGER,
       },
       followeeId: {
         type: Sequelize.INTEGER,
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
     return queryInterface.dropTable('Follows');
   }
 }; 
