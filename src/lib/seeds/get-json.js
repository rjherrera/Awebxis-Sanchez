async function getJSON(fileName) {
  if (process.env.SEEDS_SERVER) {
    const response = await fetch(`${process.env.SEEDS_SERVER}/${fileName}`);
    return response.json();
  }
  return require(`../../seeds/${fileName}`);
}

module.exports = getJSON;
