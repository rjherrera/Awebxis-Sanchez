export async function fetchFollowers(username) {
  const path = `/users/${username}/followers`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.followers;
}

export async function fetchFollowing(username) {
  const path = `/users/${username}/following`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.following;
}

export async function fetchFollow(currentUsername, username) {
  const path = `/users/${currentUsername}/follow/${username}`;
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.follow;
}

export async function followUser(currentUsername, username) {
  const path = `/users/${currentUsername}/follow/${username}`;
  const response = await fetch(path, { method: 'post', headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.isFollowing;
}

export async function unfollowUser(currentUsername, username) {
  const path = `/users/${currentUsername}/follow/${username}`;
  const response = await fetch(path, { method: 'delete', headers: { Accept: 'application/json' } });
  const json = await response.json();
  return json.isFollowing;
}
