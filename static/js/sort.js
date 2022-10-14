function sort(searchResults, order) {
  switch (order) {
    case 'newest':
      localStorage.setItem('sort-by', order)
      return searchResults.sort((a, b) => {
        return new Date(b.Date) - new Date(a.Date)
      })

    case 'oldest':
      localStorage.setItem('sort-by', order)
      return searchResults.sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date)
      })
  }
}

export default sort
