const moment = require('moment');

const formatDate = date => moment(date).format('YYYY-MM-DD');
const formatDateTz = date => moment(date).tz('GMT').format('MMMM Do, YYYY');

module.exports = {
  formatDate,
  formatDateTz,
};
