export async function fetchInstance(username, bookId) {
  const path = `/instances/${username}/${bookId}`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.id;
}


export async function haveBook(path, bookId, state, comment) {
  fetch(path, {
    method: 'post',
    body: JSON.stringify({ bookId, state, comment }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then(response => response);
}

export async function dontHaveBook(path, instanceId) {
  return fetch(`${path}${instanceId}`, {
    method: 'post',
    body: JSON.stringify({
      _method: 'delete',
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then(response => response);
}
