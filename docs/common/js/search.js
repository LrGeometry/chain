$(document).ready(function(){
  // docgenerate returning undefined objects when creating search index files. TEMP FIX
  const steps = window.searchIndex.filter(function(n){ return n != undefined })

  var options = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.5,
    tokenize: true,
    location: 0,
    distance: 10000,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [{
      name: "Url",
      weight: .2
    },{
      name: "Body",
      weight: .8
    }]
  }
  var fuse = new Fuse(steps, options)
  var query = decodeURIComponent(window.location.search.slice(1))
  var result = fuse.search(query)
  $('#search-results').empty()
  $('#search-results').append('<div id="search-result">Search results for <b>' + query + '</b></div>')
  result.slice(0,10).forEach(function(res) {
    var obj = res["item"]
    var url = obj["Url"].slice(0,-3)
    var title = url.split('/').slice(-1)[0].replace(/-/g, ' ')
    $('#search-results').append('<div id="search-result"><a href="' + url +'" target="blank">'+ title +'</a></div>')
  })
})
