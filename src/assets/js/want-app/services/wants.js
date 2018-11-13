export async function fetchInterest(username, bookId) {
  const path = `/interests/${username}/${bookId}`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.id;
}


export async function wantBook(path, bookId) {
  fetch(path, {
    method: 'post',
    body: JSON.stringify({ bookId }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then(response => response);
}

export async function dontWantBook(path, interestId) {
  return fetch(`${path}${interestId}`, {
    method: 'post',
    body: JSON.stringify({
      _method: 'delete',
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then(response => response);
}
