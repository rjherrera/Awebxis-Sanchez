async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchOwnInterests(username) {
  const path = `/users/${username}/interests`;
  const json = await fetchJson(path, 'get');
  return json.interests;
}
