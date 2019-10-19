document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('send').addEventListener('click', function() {
    var title_text = document.getElementById('title').value;
    var body_text = document.getElementById('body').value;
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
    if(title_text !== '' && body_text !== '') {
      document.getElementById('title').value = '';
      document.getElementById('body').value = '';
      alert('DONE');
    }
  });
});
