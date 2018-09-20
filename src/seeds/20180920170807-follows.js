const followsJson = require('./follows.json');

 module.exports = {
   up: (queryInterface) => {
     const followsData = [];
     followsJson.forEach((follow) => {
       followsData.push({
         id: follow.id,
         followerId: follow.followerId,
         followeeId: follow.followeeId,
         createdAt: new Date(),
         updatedAt: new Date(),
       });
     });
     return queryInterface.bulkInsert("Follows", followsData);
   },

   down: queryInterface => queryInterface.bulkDelete("Follows", null, {}),
 };
 