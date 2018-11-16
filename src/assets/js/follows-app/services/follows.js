async function fetchJson(path, method) {
  const response = await fetch(path, { method, headers: { Accept: 'application/json' } });
  return response.json();
}

async function requestFollow(currentUsername, username, method) {
  const path = `/api/users/${currentUsername}/follow/${username}`;
  return fetchJson(path, method);
}

export async function fetchFollowers(username) {
  const path = `/api/users/${username}/followers`;
  const json = await fetchJson(path, 'get');
  return json.followers;
}

export async function fetchFollowing(username) {
  const path = `/api/users/${username}/following`;
  const json = await fetchJson(path, 'get');
  return json.following;
}

export async function fetchFollow(currentUsername, username) {
  const json = await requestFollow(currentUsername, username, 'get');
  return json.follow;
}

export async function followUser(currentUsername, username) {
  const json = await requestFollow(currentUsername, username, 'post');
  return json.isFollowing;
}

export async function unfollowUser(currentUsername, username) {
  const json = await requestFollow(currentUsername, username, 'delete');
  return json.isFollowing;
}
