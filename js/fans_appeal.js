var storage;

document.addEventListener('DOMContentLoaded', function(){
  storage = new Provider();

  sendAppeal();

  window.addEventListener('online', function() {
    storage.provider.get('appeals', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postAppeal(data[i].name, data[i].text);
        }
        storage.provider.delete('appeals');
        appeals = [];

        var req = new XMLHttpRequest();
        req.open("POST", "/fans_appeal", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              console.log("Error");
            }
            else {
              sendAppeal();
            }
          }
        }
      }
    });
  });

  document.getElementById('send').addEventListener('click', function() {
    var name = document.getElementById('name').value.trim();
    var appeal_text = document.getElementById('text').value.trim();
    if(appeal_text === '' || name === '') {
      alert("Fill forms, please!");
    } else {
      var obj = {name: name, date: getCurDate(), time: getCurTime(), appeal_text: appeal_text}
      if(isOnline()) {
        var req = new XMLHttpRequest();
        req.open("POST", "/fans_appeal", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(obj));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              alert("Something goes wrong");
            }
            else {
              sendAppeal();
            }
          }
        }
      } else {
        storage.provider.get('appeals', function(data) {
          var appeals;
          if (data) {
            appeals = data;
          }
          else {
            appeals = [];
          }
          appeals.push(obj);
          storage.provider.add('appeals', appeals);
          console.log("PROVIDER");
        });
      }
      document.getElementById('name').value = '';
      document.getElementById('text').value = '';
    }
  });
});

function formatDate(num) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

function getCurDate() {
  var date = new Date();
  return formatDate(date.getDate()) + '.' + formatDate(date.getMonth() + 1) + '.' + formatDate(date.getFullYear() % 100)
}

function getCurTime() {
  var date = new Date();
  return formatDate(date.getHours()) + ':' + formatDate(date.getMinutes());
}

function postAppeal(obj) {
  var element = document.createElement('li');
  var hr = document.createElement('hr');
  var big_div = document.createElement('div');
  var left_div = document.createElement('div');
  var right_div = document.createElement('div');
  big_div.setAttribute('class', 'block d-flex');
  left_div.setAttribute('class', 'both left text-center');
  right_div.setAttribute('class', 'both right');

  left_div.innerHTML = obj.name + '<br>' + obj.time + '<br>'+ obj.date;
  right_div.innerHTML = obj.appeal_text;
  big_div.appendChild(left_div);
  big_div.appendChild(right_div);
  element.appendChild(hr);
  element.appendChild(big_div);
  document.getElementById('appeals').appendChild(element);
}

function sendAppeal() {
  if (isOnline()) {
    var req = new XMLHttpRequest();
    req.open("GET", "/fans_appeal", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Something goes wrong!");
        }
        else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            postAppeal(data[i]);
          }
        }
      }
    }
  }
}
function isOnline() {
  return window.navigator.onLine;
}
