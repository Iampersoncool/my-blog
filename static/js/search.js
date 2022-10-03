const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')

async function getDocuments() {
  try {
    const response = await fetch('/index.json')
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

async function search(value) {
  const documents = await getDocuments()

  documents.forEach((document, i) => {
    const isVisible =
      document.Title.toLowerCase().includes(value.trim()) ||
      document.Description.toLowerCase().includes(value.trim())

    blogs[i].classList.toggle('hidden', !isVisible)
  })

}

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase()

  search(value)
})
