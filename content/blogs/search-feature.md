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
│   └── _default/
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

programmatically making the json:

{{< HighlightJS language="json" >}}

{{- $.Scratch.Add "index" slice -}}
  {{- range where .Paginator.Pages "Section" "blogs" -}}
    {{- $.Scratch.Add "index" (dict "Title" .Title "Description" .Description) -}}
  {{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}

{{</ HighlightJS >}}

### Now it is time to write some code👍

Let's grab the search input and get all the blogs on the page:
{{< HighlightJS language="javascript" >}}
const searchInput = document.querySelector('.searchInput')
const blogs = document.querySelectorAll('.blog')
{{</ HighlightJS >}}

Then create a function to fetch the json and 
store the results in a variable like this:

{{< HighlightJS language="javascript" startFrom="4" >}}
let searchResults

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
{{</ HighlightJS >}}

After that we can create a search function
that checks if the function argument named value matches the
title or description:

{{< HighlightJS language="javascript" startFrom="19" >}}
async function search(value) {
  searchResults?.forEach((result, i) => {
    const isVisible =
      result.Title.toLowerCase().includes(value.trim()) ||
      result.Description.toLowerCase().includes(value.trim())
    blogs[i].classList.toggle('hidden', !isVisible)
  })
}
{{</ HighlightJS >}}

Lastly, we can listen for the input
and use the search function, passing
in the value as a paramater.

If you want to do extra, you can listen
for a '/' key press, which will focus
on the search input, and also listen to
the 'Escape' key, which will stop focusing
on the search input.

{{< HighlightJS language="javascript" startFrom="28" >}}
searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase()
  search(value)
})

//extra
document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') searchInput.blur()
  if (e.key === '/') searchInput.focus()
})
{{</ HighlightJS >}}

Now you should have a working search feature on your website!
{{< figure src="/images/search_feature.png" class="search-feature_____png" >}}
