const fetch = require('node-fetch');

const fetchAvgRating = async (book) => {
  const { isbn: bookISBN } = book;
  const key = process.env.GOODREADS_KEY;
  const url = `https://www.goodreads.com/book/review_counts.json?key=${key}&isbns=${bookISBN}`;
  const response = await fetch(url).then(data => data.json()).catch(() => null);
  return response ? response.books[0].average_rating : '-';
};

module.exports = {
  fetchAvgRating,
};
