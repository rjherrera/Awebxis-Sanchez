const fetch = require('node-fetch');

async function getJSON(fileName) {
  if (process.env.SEEDS_SERVER) {
    const response = await fetch(`${process.env.SEEDS_SERVER}/${fileName}`);
    return response.json();
  }
  /* eslint-disable import/no-dynamic-require, global-require */
  return require(`../../seeds/${fileName}`);
}

module.exports = getJSON;
