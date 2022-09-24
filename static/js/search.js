function fetch() {
  fetch('/index.json')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(console.log)
}

fetch()