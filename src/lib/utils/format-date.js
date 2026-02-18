const { format } = require('date-fns');

const formatDate = date => date ? format(date, 'yyyy-MM-dd') : '';

module.exports = { formatDate };
