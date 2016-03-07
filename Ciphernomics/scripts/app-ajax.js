var localWord = '';
var  alphaArray = {
  'a':0,
  'b':1,
  'c':2,
  'd':3,
  'e':4,
  'f':5,
  'g':6,
  'h':7,
  'i':8,
  'j':9,
  'k':10,
  'l':11,
  'm':12,
  'n':13,
  'o':14,
  'p':15,
  'q':16,
  'r':17,
  's':18,
  't':19,
  'u':20,
  'v':21,
  'w':22,
  'x':23,
  'y':24,
  'z':25
}
var userInput = 'submit';
var userLevel = 0;

var testWord = 'submit'

window.onload = function(evt) {
  console.log("Ready for some AJAX fun");
  var lengthOfWord = 5;

  $.ajax ({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://randomword.setgetgo.com/get.php?len=' + lengthOfWord,
    jsonpCallback: 'randomWord',
    success: function randomWord(data) {
    return localWord = data.Word.toLowerCase();
      }
  });
}

$(document).ajaxSuccess(function() {
  for (var userLevel = 0; userLevel < 5; userLevel++) {
    if (localWord === userInput.toLowerCase())
    {
      // json query to remove from body and keep the area clean
      $('body').append('YOU WIN ROUND #'+parseInt(userLevel+1));
    } else {
      // complete until timer runs out.
    }
  }
});






