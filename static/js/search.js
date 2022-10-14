const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')

let searchResults

async function getDocuments() {
  try {
    const response = await fetch('/index.json')
    const data = await response.json()

    searchResults = data.map((d) => ({
      Description: d.Description,
      Title: d.Title,
    }))
  } catch (e) {
    console.log(e)
  }
}

getDocuments()

async function search(value) {
  blogs.forEach((blog, i) => {
    const isVisible =
      searchResults[i]?.Title.toLowerCase().includes(value.trim()) ||
      searchResults[i]?.Description.toLowerCase().includes(value.trim())

    blog.classList.toggle('hidden', !isVisible)
  })
}

searchInput.addEventListener('input', (e) => {
  search(e.target.value.toLowerCase())
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') searchInput.blur()
  if (e.key === '/') searchInput.focus()
})
