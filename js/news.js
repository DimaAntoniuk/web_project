var storage;

document.addEventListener("DOMContentLoaded", function() {
  storage = new Provider();
  if(!window.navigator.onLine) {
    alert("Sorry lastest news aren't avalivle");
    window.addEventListener('online', function() {
      storage.provider.get('news', function(data) {
        if (data) {
          for (i = 0; i < data.length; i++) {
            postNews(data[i].title, data[i].body);
          }
          storage.provider.delete('news');
          console.log('SERVER');
        }
      });
    });
  } else {
    storage.provider.get('news', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postNews(data[i].title, data[i].body);
        }
        storage.provider.delete('news');
        console.log('SERVER');
      }
    });
  }
});
function postNews(title_text, body_text) {
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
  title.innerHTML = title_text;
  text.innerHTML = body_text;
  body.appendChild(title);
  body.appendChild(text);
  card.appendChild(img);
  card.appendChild(body);
  document.getElementById('news').appendChild(card);
}
