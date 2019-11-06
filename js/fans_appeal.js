var storage;

document.addEventListener('DOMContentLoaded', function(){
  storage = new Provider();
  window.addEventListener('online', function() {
    storage.provider.get('appeals', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postAppeal(data[i].name, data[i].text);
        }
        storage.provider.delete('appeals');
        appeals = [];
        console.log('SERVER');
      }
    });
  });

  document.getElementById('send').addEventListener('click', function() {
    var name = document.getElementById('name').value.trim();
    var appeal_text = document.getElementById('text').value.trim();
    if(appeal_text === '' || name === '') {
      alert("Fill forms, please!");
    } else {
      if(checkConnection()) {
        alert('SERVER');
        postAppeal(name, appeal_text);
      } else {
        storage.provider.get('appeals', function(data) {
          var appeals
          if (data) {
            appeals = data;
          }
          else {
            appeals = [];
          }
          appeals.push({name:name, text: appeal_text});
          storage.provider.add('appeals', appeals);
          console.log("PROVIDER");
        });
      }
      document.getElementById('name').value = '';
      document.getElementById('text').value = '';
    }
  });
});

function postAppeal(name, appeal_text) {
  var element = document.createElement('li');
  var hr = document.createElement('hr');
  var big_div = document.createElement('div');
  var left_div = document.createElement('div');
  var right_div = document.createElement('div');
  big_div.setAttribute('class', 'block d-flex');
  left_div.setAttribute('class', 'both left text-center');
  right_div.setAttribute('class', 'both right');

  var today = new Date();
  var time = '';
  if(today.getHours().toString().length === 1) {
    time = time + '0';
  }
  time = time + today.getHours() + ":";
  if(today.getMinutes().toString().length === 1) {
    time = time + '0';
  }
  time = time + today.getMinutes();
  var date = '';
  if((today.getDate()).toString().length === 1) {
    date = date + '0';
  }
  date = date + today.getDate() + '.';
  if((today.getMonth()+1).toString().length === 1) {
    date = date + '0';
  }
  date = date + (today.getMonth()+1) + '.' + today.getFullYear();

  left_div.innerHTML = name + '<br>'+time+'<br>'+date;
  right_div.innerHTML = appeal_text;
  big_div.appendChild(left_div);
  big_div.appendChild(right_div);
  element.appendChild(hr);
  element.appendChild(big_div);
  document.getElementById('appeals').appendChild(element);
}
function checkConnection() {
  return window.navigator.onLine;
}
