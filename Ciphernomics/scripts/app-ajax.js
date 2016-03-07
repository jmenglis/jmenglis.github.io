window.onload = function(evt) {
  console.log("Ready for some AJAX fun");

  $.ajax ({
    type: 'get',
    dataType: 'json',
    url: 'http://randomword.setgetgo.com/get.php',
    success: function(word) {
      console.log(word);
    },
    error: function(err) {
      console.log('Not Working');
      console.log(err);
    };
  });
}
