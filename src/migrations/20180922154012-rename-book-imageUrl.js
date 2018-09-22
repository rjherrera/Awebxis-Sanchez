module.exports = {
  up: queryInterface => queryInterface.renameColumn(
    'Books', 'image_url', 'imageUrl',
  ),
  down: () => { },
};
