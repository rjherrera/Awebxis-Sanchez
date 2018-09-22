const feedbacksJson = require('./feedbacks.json');

module.exports = {
  up: (queryInterface) => {
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
