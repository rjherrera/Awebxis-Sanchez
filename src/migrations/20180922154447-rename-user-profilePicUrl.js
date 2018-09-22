module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Users', 'profile_pic_url', 'profilePicUrl',
  ),
  down: () => { },
};
