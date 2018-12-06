async function fetchJson(path, method, body) {
  const response = await fetch(path, { method, body, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchInstance(username, bookId) {
  const path = `/api/instances/${username}/${bookId}`;
  const json = await fetchJson(path, 'GET');
  return json.id;
}

export async function haveBook(username, bookId, state, comment) {
  const path = `/api/users/${username}/posessions`;
  const json = await fetchJson(path, 'POST', JSON.stringify({ bookId, state, comment }));
  return json.instance;
}

export async function dontHaveBook(username, instanceId) {
  const path = `/api/users/${username}/posessions/${instanceId}`;
  const json = await fetchJson(path, 'DELETE');
  return json;
}
