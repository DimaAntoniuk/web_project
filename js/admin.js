var storage;

window.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();
});

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('send').addEventListener('click', function() {
    var title_text = document.getElementById('title').value;
    var body_text = document.getElementById('body').value;
    if(title_text == '' || body_text == '') {
      alert('Fill in text!');
      if(title_text == '') {
        document.getElementById('title').style.backgroundColor = "yellow";
      } else {
        document.getElementById('title').style.backgroundColor = "white";
      }
      if(body_text == '') {
        document.getElementById('body').style.backgroundColor = "yellow";
      } else {
        document.getElementById('body').style.backgroundColor = "white";
      }
    } else {
      var obj = {title_text : title_text, body_text : body_text};
      if(window.navigator.onLine) {
        alert('SERVER');
        var req = new XMLHttpRequest();
        req.open("POST", "/news", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(obj));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              alert("Error");
            }
            else {
              alert("Success!");
            }
          }
        }

      } else {
        storage.provider.get('news', function(data) {
          var news;
          if (data) {
            news = data;
          }
          else {
            news = [];
          }
          news.push(obj);
          storage.provider.add('news', news);
          console.log("PROVIDER");
        });
      }
      document.getElementById('title').style.backgroundColor = "white";
      document.getElementById('body').style.backgroundColor = "white";
      document.getElementById('title').value = '';
      document.getElementById('body').value = '';
      setTimeout(alert_custom);
    }
  });
});

function alert_custom() {
  alert('DONE');
}
