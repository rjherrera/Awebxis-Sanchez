async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

export default async function fetchStats(bookIsbn) {
  const path = `/api/books/${bookIsbn}/stats`;
  const json = await fetchJson(path, 'get');
  return json;
}
