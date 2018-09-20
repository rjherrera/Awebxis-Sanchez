/**
 * Checks whether the given string is a valid ISBN-10
 * @param {String} value
 */
const isISBN10 = (value) => {
  // Split numbers and check digit
  const number = value.slice(0, -1).split('').map(Number);
  const last = value.slice(-1);
  const lastDigit = (last !== 'X') ? parseInt(last, 10) : 'X';

  // Algorithm for checksum calculation (digit * position)
  const sum = number.map((digit, index) => digit * (index + 1)).reduce((a, b) => a + b, 0);

  // Validate control digit
  const controlDigit = sum % 11;
  return lastDigit === (controlDigit !== 10 ? controlDigit : 'X');
};

/**
 * Checks whether the given string is a valid ISBN-13
 * @param {String} value
 */
const isISBN13 = (value) => {
  // Split numbers and check digit
  const number = value.slice(0, -1).split('').map(Number);
  const lastDigit = parseInt(value.slice(-1), 10);

  // Algorithm for checksum calculation (digit alternately multiplied by 1 or 3)
  const sum = number.map((digit, index) => (index % 2 === 0 ? digit * 1 : digit * 3))
    .reduce((a, b) => a + b, 0);

  // Validate control digit
  const controlDigit = 10 - (sum % 10);
  return lastDigit === (controlDigit === 10 ? 0 : controlDigit);
};

/**
 * Checks whether the given string is a valid ISBN-10 or ISBN-13
 * @param {String} value
 */
const isISBN = (value) => {
  const PAT = /^(?:\d{9}[\dXx]|\d{13})$/;

  if (!PAT.test(value)) {
    return false;
  }

  return value.length === 10 ? isISBN10(value) : isISBN13(value);
};

module.exports = isISBN;
