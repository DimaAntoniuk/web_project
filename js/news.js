var storage;

document.addEventListener("DOMContentLoaded", function() {
  storage = new Provider();
  if(!window.navigator.onLine) {
    alert("Sorry lastest news aren't avalivle");
  } else {
    var req = new XMLHttpRequest();
    req.open("GET", "/news", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Error");
        }
        else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            postNews(data[i]);
          }
        }
      }
    }
  }
  window.addEventListener('online', function() {
    storage.provider.get('news', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postNews(data[i]);
        }
        storage.provider.delete('news');

        var req = new XMLHttpRequest();
        req.open("POST", "/news", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              console.log("Error");
            }
            else {
              console.log('Server');
            }
          }
        }
      }
    });
  });
});
function postNews(obj) {
  var card = document.createElement('div');
  var img = document.createElement('img');
  var body = document.createElement('div');
  var title = document.createElement('h5');
  var text = document.createElement('p');
  img.setAttribute('src', 'images/scar_news.jpg');
  img.setAttribute('alt', '[News]');
  img.setAttribute('class', 'card-img-top');
  card.setAttribute('class', 'card news-card bg-dark text-white');
  body.setAttribute('class', 'card-body');
  title.setAttribute('class', 'card-title');
  text.setAttribute('class', 'card-text');
  title.innerHTML = obj.title_text;
  text.innerHTML = obj.body_text;
  body.appendChild(title);
  body.appendChild(text);
  card.appendChild(img);
  card.appendChild(body);
  document.getElementById('news').appendChild(card);
}
function isOnline() {
  return window.navigator.onLine;  
}
