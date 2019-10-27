document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('send').addEventListener('click', function() {
    var appeal_text = document.getElementById('text').value.trim();
    if(appeal_text !== '') {
      var element = document.createElement('li');
      var hr = document.createElement('hr');
      var big_div = document.createElement('div');
      var left_div = document.createElement('div');
      var right_div = document.createElement('div');
      big_div.setAttribute('class', 'block d-flex');
      left_div.setAttribute('class', 'both left text-center');
      right_div.setAttribute('class', 'both right');
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes();
      var date = (today.getDate()) + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
      left_div.innerHTML = 'Dima Antinuk <br>'+time+'<br>'+date;
      right_div.innerHTML = appeal_text;
      big_div.appendChild(left_div);
      big_div.appendChild(right_div);
      element.appendChild(hr);
      element.appendChild(big_div);
      document.getElementById('appeals').appendChild(element);
    } else {
      alert('You need to write appeal first!')
    }
  });
});
