const fetch = require('node-fetch');

const fetchAvgRating = async (book) => {
  const { isbn: bookISBN } = book;
  const url = `https://www.goodreads.com/book/review_counts.json?key={M15y1EyDKjbpaeuJ5ahQ1w}&isbns=${bookISBN}`;
  const response = await fetch(url).then(data => data.json().then(json => json));
  return response.books[0].average_rating;
};

module.exports = {
  fetchAvgRating,
};
