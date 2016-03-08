var localWord = ''; // the localWord set by getting randomWord through AJAX.
// alphaArray is the stored matching value of the alphabet

var alphaArray = {
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
};

var userInput = ''; // userInput is stored so that a user can type the ciphered word.
var userLevel = 0; // userLevel is the level that the user is on.
/* Coprimes for a future version of game to allow randomization of Affine
Cipher

var a = [1,3,5,7,9,11,15,17,19,21,23,25];
var b = shifting the character by this much in cipher (b < 26);
*/
window.onload = function(evt) {
  console.log("Ready for some AJAX fun");

  // Creating the constructor function with start time of
  timer = new countDownTimer(300);
  timeObj = countDownTimer.parse(300);
  format(timeObj.minutes, timeObj.seconds);
  timer.onTick(format).onTick(gameOver)
  // Formats the time into the proper time and outputs to the div ID #item
  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $('#time').text(minutes + ":" + seconds);
  }
  function getRandomWord() {
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
  function enterKey() {
    $('input').keypress(function(evt) {
      if (evt.which === 13) {
        evt.preventDefault();
        console.log('You Hit Enter');
      }
    });
  }
  // getRandomWord which is ran on CLICK of start-timer
  // start the countdown timer on the click of the timer start button.
  // convert button into a class for the button as there will be multiple
  // buttons on the screen.

  $('button').click(function() {
    getRandomWord();
    timer.start();
    $('#submissionBox').html('<input type="text" id ="#textInput">')
    $(this).prop('disabled', true);
    enterKey();
  });

  // gameOver function kills the game
  function gameOver() {
    if (timer.expired()) {
      $('#body').html('<h1>Game is now over</h1>');
      $('#body').append(/*restart game from here.*/)
    }
  }
};



$(document).ajaxSuccess(function() {
  console.log(localWord);
  for (var userLevel = 0; userLevel < 5; userLevel++) {
    if (localWord === userInput.toLowerCase()) {
      // json query to remove from body and keep the area clean
      $('body').append('YOU WIN ROUND #'+parseInt(userLevel+1));
    } else {
      // complete until timer runs out.
    }
  }
});



// Affine Cipher (Hardest)
// var a = coprimes < 26
// var b = shifting
// var x = current letter placement alphabet
// var m = total number of letters in the alphabet = 26
// E(x) = ax+b mod m

var a = 5
var b = 8
var m = 26
var x = 13 // match alphabet to number and get return.

function affineCipher() {
  var result = (a*x+b) % m;
  console.log(result);
}







