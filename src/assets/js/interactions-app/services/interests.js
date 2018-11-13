async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchInterests(username) {
  const path = `/users/${username}/interests/`;
  const json = await fetchJson(path, 'get');
  return json.interests;
}

export async function fetchOthersInterests(username) {
  const path = `/users/${username}/interests/others`;
  const json = await fetchJson(path, 'get');
  return json.interests;
}
