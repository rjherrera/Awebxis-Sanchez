'use strict';

 module.exports = {
   up: (queryInterface, Sequelize) => {
     
     queryInterface.addColumn(
       'Users',
       'profile_pic_url',
       {
         type: Sequelize.STRING,
         allowNull: true
       }
     )
   },

   down: (queryInterface, Sequelize) => {
     queryInterface.removeColumn('Users', 'profile_pic_url')
   }
 };
