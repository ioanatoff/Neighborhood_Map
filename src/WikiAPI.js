const api = "https://en.wikipedia.org/w/api.php"
const headers = {
  'Accept': 'application/json'
}

export const getInfo = (title) =>
  fetch(`${api}?origin=*&action=query&prop=extracts&exintro=&exsentences=2&titles=${title}&format=json`, { headers })
    .then(res => res.json())

export const getImages = (title) =>
   fetch(`${api}?origin=*&action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=100`, { headers })
    .then(res => res.json())
