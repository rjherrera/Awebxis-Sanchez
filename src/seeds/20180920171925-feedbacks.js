const getJSON = require('../lib/seeds/get-json');
const { User } = require('../models');

const randint = n => Math.floor(Math.random() * n) + 1;

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({ attributes: ['id'] });
    const feedbacksJson = await getJSON('feedbacks.json');
    const feedbacksData = [];
    feedbacksJson.forEach((feedback) => {
      const firstId = users[randint(users.length - 1)].id;
      feedbacksData.push({
        feedbackerId: firstId,
        feedbackeeId: users.filter(u => u.id !== firstId)[randint(users.length - 2)].id,
        rating: feedback.stars,
        comment: feedback.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('Feedbacks', feedbacksData);
  },

  down: queryInterface => queryInterface.bulkDelete('Feedbacks', null, {}),
};
