document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('send').addEventListener('click', function() {
    var appeal_text = document.getElementById('text').value;
    if(appeal_text !== '') {
      var element = document.createElement('li');
      var hr = document.createElement('hr');
      var big_div = document.createElement('div');
      var left_div = document.createElement('div');
      var right_div = document.createElement('div');
      big_div.setAttribute('class', 'block d-flex');
      left_div.setAttribute('class', 'both left text-center');
      right_div.setAttribute('class', 'both right');
      left_div.innerHTML = 'Dima Antinuk <br> 22:18 <br> 08.10.2019';
      right_div.innerHTML = appeal_text;
      big_div.appendChild(left_div);
      big_div.appendChild(right_div);
      element.appendChild(hr);
      element.appendChild(big_div);
      document.getElementById('appeals').appendChild(element);
    }
  });
});
