var data
// eslint-disable-next-line no-undef
var request = new XMLHttpRequest()
request.open('GET', '/data/transformers', true)

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    data = JSON.parse(request.responseText)
    render(data)
  } else {
    // We reached our target server, but it returned an error
  }
}

request.onerror = function () {
  // There was a connection error of some sort
}

request.send()
function render (data) {
  var container = document.getElementById('container')
  for (var i = 0; i < data.length; i++) {
    var p = document.createElement('p')
    p.appendChild(document.createTextNode(`${data[i].Name} is an ${data[i].Type}`))
    container.append(p)
  }
  console.log(...data)
  console.log('still un-done')
}
