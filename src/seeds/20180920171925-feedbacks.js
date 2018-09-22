const getJSON = require('../lib/seeds/get-json');

module.exports = {
  up: async (queryInterface) => {
    const feedbacksJson = await getJSON('feedbacks.json');
    const feedbacksData = [];
    feedbacksJson.forEach((feedback) => {
      feedbacksData.push({
        id: feedback.id,
        feedbackerId: feedback.feedbackerId,
        feedbackeeId: feedback.feedbackeeId,
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
