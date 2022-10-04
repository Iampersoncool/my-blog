---
title: "Search Feature"
date: 2022-10-04T12:51:06-07:00
draft: false
code: true
description: "How I made a search feature for my website"
---

### Today I wanted to make a search feature for my website.

Directory structure:
{{< HighlightJS language="plaintext" startFrom="8" lineNumbers="f" >}}
.
├── layouts/
│   └── default/
│       └── index.json
└── static/
    └── js/
        └── search.js
{{</ HighlightJS >}}

Change the output of home(index page) and add json to it
so we can fetch the json

{{< HighlightJS language="toml" startFrom="8" >}}
[outputs]
  home = ["HTML", "JSON", "RSS"]
{{</ HighlightJS >}}

Now we can use scratch to programmatically make the json.

{{< HighlightJS language="json" >}}

{{- $.Scratch.Add "index" slice -}}
  {{- range where .Paginator.Pages "Section" "blogs" -}}
    {{- $.Scratch.Add "index" (dict "Title" .Title "Description" .Description) -}}
  {{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}

{{</ HighlightJS >}}

In search.js we can do a simple fetch, and map it to a new array.
Then, we can run a loop whenever the user inputs something and check
if it includes a value from the title, or the description.

We can also listen for an / press on key up to focus on the input,
and stop focusing on it when we press escape.

{{< HighlightJS language="javascript" >}}

const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')

let searchResults

//get search results
async function getDocuments() {
  try {
    const response = await fetch('/index.json')
    const data = await response.json()

    searchResults = data.map(d => ({ Description: d.Description, Title: d.Title}))
  } catch (e) {
    console.log(e)
  }
}

getDocuments()

//search and check if the value includes 
//a value from the title, or the description.
async function search(value) {
  searchResults?.forEach((result, i) => {
    const isVisible =
      result.Title.toLowerCase().includes(value.trim()) ||
      result.Description.toLowerCase().includes(value.trim())
    blogs[i].classList.toggle('hidden', !isVisible)
  })
}

//listen for search input and run the search function
searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase()
  search(value)
})

//focus and stop focus on keyup
document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') searchInput.blur()
  if (e.key === '/') searchInput.focus()
})

{{</ HighlightJS >}}

Now you should have a working search feature on your website!
{{< figure src="/images/search_feature.png" class="search-feature_____png" >}}
