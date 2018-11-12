async function fetchJson(path, method, body) {
  const response = await fetch(path, { method, body, headers: { Accept: 'application/json' } });
  return response.json();
}

export async function fetchProposers(username) {
  const path = `/users/${username}/proposers`;
  const json = await fetchJson(path, 'GET');
  return json.proposers;
}

export async function fetchProposing(username) {
  const path = `/users/${username}/proposing`;
  const json = await fetchJson(path, 'GET');
  return json.proposing;
}

export async function acceptMatch(match) {
  const path = `/matches/${match.id}`;
  const json = await fetchJson(path, 'PATCH');
  return json;
}

export async function cancelMatch(match) {
  const path = `/matches/${match.id}`;
  const json = await fetchJson(path, 'DELETE');
  return json;
}

export async function proposeExchange(proposerBookInstanceId, proposeeBookInstanceId) {
  const path = '/matches/new';
  const body = JSON.stringify({ proposerBookInstanceId, proposeeBookInstanceId });
  const json = await fetchJson(path, 'POST', body);
  return json;
}
