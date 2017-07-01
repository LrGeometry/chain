$(document).ready(function(){
  // docgenerate returning undefined objects when creating search index files. TEMP FIX
  const steps = window.searchIndex.filter(function(n){ return n != undefined })

  var options = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.5,
    tokenize: true,
    location: 0,
    distance: 100000,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [{
      name: "Body",
      weight: .4
    },{
      name: "Title",
      weight: .4
    },{
      name: "Snippet",
      weight: .4
    }]
  }
  var fuse = new Fuse(steps, options)
  var query = decodeURIComponent(window.location.search.slice(3))
  var result = fuse.search(query)
  $('#search-results').empty()
  $('#search-results').append('<div id="search-result">Search results for <b>' + query + '</b></div>')
  result.some(function(res) {
    if(res.score > .3){
      return true
    }
    var obj = res["item"]
    var url = obj["Url"].slice(0,-3)
    var title = obj["Title"]
    var snippet = obj["Snippet"]
    if(title == ""){
      title = url.split('/').slice(-1)[0].replace(/-/g, ' ')
    }
    $('#search-results').append('<div id="search-result"><a href="' + url +'" target="blank">'+ title +'</a><br><span id="search-snippet">' + snippet + '</span></div>')
  })
})
