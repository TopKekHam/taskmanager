let jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJ1c2VybmFtZSI6ImxzdGVjaCJ9LCJpYXQiOjE2ODk4NDg0NzksImV4cCI6MTY4OTg1NTY3OX0.FQMFrBLD0-xjo9y5u_VouUl95YQg0S7uEVKfyMJsMpw";

export function fetchGet(path: string) {
  return fetch(path, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwtToken,
    }
  });
}

export function fetchPost(path: string, body: any) {
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
    body: JSON.stringify(body),
  });
}

export function fetchPatch(path: string, body: any) {
	console.log(path);
	console.log(JSON.stringify(body));

	return fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
    body: JSON.stringify(body),
  });
}

export function fetchDelete(path: string) {
	return fetch(path, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  });
}
