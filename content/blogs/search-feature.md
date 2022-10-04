---
title: "Search Feature"
date: 2022-10-04T12:51:06-07:00
draft: true
code: true
description: "How I made a search feature for my website"
---

{{< HighlightJS language="html" >}}
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /HighlightJS >}}
