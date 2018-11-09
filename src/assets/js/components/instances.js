export async function fetchInstance(username, bookId) {
  const path = `/instances/${username}/${bookId}`;
  console.log(path);
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  console.log(`jsonId is ${json.id}`);
  return json.id;
}


