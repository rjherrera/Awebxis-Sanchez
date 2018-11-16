async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchPosessions(username) {
  const path = `/api/users/${username}/posessions`;
  const json = await fetchJson(path, 'get');
  return json.posessions;
}
