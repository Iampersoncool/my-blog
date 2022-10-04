const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')

let searchResults

async function getDocuments() {
  try {
    const response = await fetch('/index.json')
    const data = await response.json()

    searchResults = data.map(d => {
      return { Description: d.Description, Title: d.Title}
    })
  } catch (e) {
    console.log(e)
  }
}

getDocuments()

async function search(value) {
  searchResults?.forEach((result, i) => {
    const isVisible =
      result.Title.toLowerCase().includes(value.trim()) ||
      result.Description.toLowerCase().includes(value.trim())
    blogs[i].classList.toggle('hidden', !isVisible)
  })
}

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase()
  search(value)
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') searchInput.blur()
  if (e.key === '/') searchInput.focus()
})
