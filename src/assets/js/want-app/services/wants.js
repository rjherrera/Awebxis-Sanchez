async function fetchJson(path, method, body) {
  const response = await fetch(path, { method, body, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchInterest(username, bookId) {
  const path = `/interests/${username}/${bookId}`;
  const json = await fetchJson(path, 'GET');
  return json.id;
}

export async function wantBook(username, bookId) {
  const path = `/api/users/${username}/interests`;
  const json = await fetchJson(path, 'POST', JSON.stringify({ bookId }));
  return json.interest;
}

export async function dontWantBook(username, interestId) {
  const path = `/api/users/${username}/interests/${interestId}`;
  const json = await fetchJson(path, 'DELETE');
  return json;
}
