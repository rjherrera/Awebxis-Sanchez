export default async function fetchToken() {
  const path = '/api/auth';
  const response = await fetch(path, { method: 'POST', headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.token;
}
