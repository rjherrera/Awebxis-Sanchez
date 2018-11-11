async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchProposers(username) {
  const path = `/users/${username}/proposers`;
  const json = await fetchJson(path, 'get');
  return json.proposers;
}

export async function fetchProposing(username) {
  const path = `/users/${username}/proposing`;
  const json = await fetchJson(path, 'get');
  return json.proposing;
}
