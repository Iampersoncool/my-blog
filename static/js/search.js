import sort from './sort.js'

const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')
const sortSelect = document.getElementById('sort')

let searchResults

getDocuments()

let sortBy = localStorage.getItem('sort-by')
if (sortBy != null) {
  sortSelect.value = sortBy
  getDocuments().then((searchResults) => {
    const s = sort(searchResults, sortBy)
    updateHTMLSortFunc(s)
  })
}

async function getDocuments() {
  try {
    const response = await fetch('/index.json')
    const data = await response.json()

    searchResults = data.map((d) => ({
      Description: d.Description,
      Title: d.Title,
      Date: d.Date,
    }))

    return searchResults
  } catch (e) {
    console.log(e)
  }
}

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

sortSelect.addEventListener('input', (e) => {
  const value = e.target.value

  if (searchResults) {
    const s = sort(searchResults, value)
    updateHTMLSortFunc(s)
  }
})

function updateHTMLSortFunc(t) {
  t.forEach((sort, i) => {
    const title = blogs[i].querySelector('.title'),
      date = blogs[i].querySelector('.date'),
      description = blogs[i].querySelector('.description')

    title.textContent = sort.Title
    description.textContent = sort.Description
    date.textContent = new Date(sort.Date).toLocaleTimeString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  })
}

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') searchInput.blur()
  if (e.key === '/') searchInput.focus()
})
