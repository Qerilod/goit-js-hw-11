export function getPosts(query) {
  const BASE_URL = "https://pixabay.com";
  const END_POINT = "/api/";
  const params = new URLSearchParams({
    key: "41636185-b642aedee9ddf38a3f46d8b56",
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true'
  });
const url = `${BASE_URL}${END_POINT}?${params}`

  return fetch(url)
    .then((res) => res.json())
    .catch(error => {
     throw new Error (`HTTP error! status: ${res.status}`)
    })
}



