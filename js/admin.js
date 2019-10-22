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
