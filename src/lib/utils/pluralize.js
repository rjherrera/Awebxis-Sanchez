const pluralize = (value, singular) => `${singular}${value === 1 ? '' : 's'}`;

module.exports = pluralize;
