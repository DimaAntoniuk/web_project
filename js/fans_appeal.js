var allAppeals = [];
document.addEventListener('DOMContentLoaded', function(){

  window.addEventListener('online', function() {
    if(localStorage.getItem('appeals')) {
      allAppeals = JSON.parse(localStorage.getItem('appeals'));
      for(i=0;i<allAppeals.length;i++) {
        postAppeal(allAppeals[i].name, allAppeals[i].appeal_text);
      }
      localStorage.setItem('appeals', JSON.stringify([]));
    }
  });

  document.getElementById('send').addEventListener('click', function() {
    var name = document.getElementById('name').value.trim();
    var appeal_text = document.getElementById('text').value.trim();
    if(appeal_text === '' || name === '') {
      alert("Fill forms, please!");
    } else {
      if(checkConnection()) {
        postAppeal(name, appeal_text);
        localStorage.setItem('appeals', JSON.stringify([]));
      } else {
        allAppeals.push({name:name, appeal_text:appeal_text});
        localStorage.setItem('appeals', JSON.stringify(allAppeals));
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
