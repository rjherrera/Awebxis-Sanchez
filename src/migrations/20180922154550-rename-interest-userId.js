module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Interests', 'UserId', 'userId',
  ),
  down: () => { },
};
