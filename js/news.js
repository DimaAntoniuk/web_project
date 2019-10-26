document.addEventListener("DOMContentLoaded", function() {
  if(!window.navigator.onLine) {
    alert("Sorry lastest news aren't avalivle");
    window.addEventListener('online', function() {
      if(localStorage.getItem('news')) {
        var allNews = JSON.parse(localStorage.getItem('news'));
        for(i=0;i<allNews.length;i++) {
          postNews(allNews[i].title, allNews[i].body);
        }
        localStorage.setItem('news', JSON.stringify([]));
      }
    });
  } else {
    if(localStorage.getItem('news')) {
      var allNews = JSON.parse(localStorage.getItem('news'));
      for(i=0;i<allNews.length;i++) {
        postNews(allNews[i].title, allNews[i].body);
      }
      localStorage.setItem('news', JSON.stringify([]));
    }
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
