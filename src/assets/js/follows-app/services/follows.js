export async function fetchFollowers(userId) {
  const path = `/users/${userId}/followers`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.followers;
}

export async function fetchFollowing(userId) {
  const path = `/users/${userId}/following`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.following;
}
