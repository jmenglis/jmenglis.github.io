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

var convertArr = [];
var finalString = '';
var userInput = ''; // userInput is stored so that a user can type the ciphered word.
var lengthOfWord = parseInt(localStorage.getItem("roundLength")) || 5; // userLevel is the level that the user is on.
var roundNum = parseInt(localStorage.getItem("whatRound")) || 1;

var randomNumber = Math.round(Math.random() * 12);
var cArr = [1,3,5,7,9,11,15,17,19,21,23,25];
var cShift = Math.round(Math.random() * 25);
var cNum;

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
    $('.time').html("<h2>" + minutes + ":" + seconds + "</h2>");
  }
  $('.currentRound').html('<h2>ROUND #' + roundNum + '<h2>');

  // convert localWord into finalword which displays for the user
  function getRandomWord() {
    $.ajax ({
      type: 'GET',
      dataType: 'jsonp',
      url: 'http://randomword.setgetgo.com/get.php?len=' + lengthOfWord,
      jsonpCallback: 'randomWord',
      success: function randomWord(data) {
        localWord = data.Word.toLowerCase();
      }
    });
  }
  $(document).ajaxSuccess(function() {
    convertArr = localWord.split("");
    console.log(convertArr)
    var numArray = [];
    var finalArray = [];
    convertArr.forEach(function(x) {
      numArray.push((cNum * alphaArray[x] + cShift) % 26);
    });
    numArray.forEach(function(x) {
      finalArray.push(Object.keys(alphaArray)[x]);
    });
    finalString = finalArray.join('');
    $('.word').html('<h2>Dicipher this word: <span class="red">' + finalString + '</span></h2>')
  });

  function enterKey() {
    $('input').keypress(function(evt) {
      if (evt.which === 13) {
        evt.preventDefault();
        userInput = $.trim($(this).val().toLowerCase());
          if (localWord === userInput) {
            // json query to remove from body and keep the area clean
            $('.time').addClass('winner');
            $('.time').removeClass('time');
            $('.loseWord').removeClass('loseWord');
            $('input[name="inputBox"]').prop('disabled', true);
            $('.winner').html('<H1>YOU WIN ROUND #' + roundNum + '</H1>');
            $('.nextLevel').html('<button type="button" name="roundUp">NEXT ROUND</button>');
            nextLevel();
            gifWin();
          }
      }
    });
  }
  function getRandomCipher() {
    var randomNumber = Math.round(Math.random() * 12);
    var cNumReverseArr;
    cNum = cArr[randomNumber];
    console.log(cNum);
    console.log(cNum + 'x + ' + cShift + ' % 26')
    // Euclid's Extended Algorithm
    function xgcd(a,b) {
      if (b == 0) {
        return [1, 0, a]
      } else {
      temp = xgcd(b, a % b)
      x = temp[0]
      y = temp[1]
      d = temp[2]
      return [y, x-y*Math.floor(a/b), d];
      }
    }
    cNumReverseArr = xgcd(cNum,26);
    var cNumReverse = cNumReverseArr.shift();
    cEq = cNumReverse + '(x - ' + cShift + ') % 26';
    $('div.equation').html('<H3>Decrypting Equation: ' + cEq + '</H3>');
  }

  // getRandomWord which is ran on CLICK of start-timer
  // start the countdown timer on the click of the timer start button.
  // convert button into a class for the button as there will be multiple
  // buttons on the screen.
  $('button[name="startButton"]').click(function() {
    getRandomCipher();
    getRandomWord();
    timer.start();
    $('p').remove('p');
    $('h3.instruct').remove('h3');
    $('#submissionBox').html('<input type="text" name="inputBox">')
    $(this).prop('disabled', true);
    enterKey();
  });

  // gameOver function kills the game
  function gameOver() {
    if (timer.expired()) {
      gifLost();
      $('input[name="inputBox"]').prop('disabled', true);
      $('.time').addClass('loser');
      $('.time').removeClass('time');
      $('.loser').html('<H1 class="red">YOU LOST!</H1>'/*+parseInt(userLevel+1)*/);
      $('.loseWord').html('<h2>The word was: <span class="red">' + localWord + '</span></h2>');
    }
  }
  function gifLost() {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=explosion',
      success: function(img) {
        var gifImg = $('<img>');
        gifImg.attr("src", img.data.image_url)
        $('.gifLose').append(gifImg);
      }
    });
  }
  function gifWin() {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=victory',
      success: function(img) {
        var gifImg = $('<img>');
        gifImg.attr("src", img.data.image_url)
        $('.gifWin').append(gifImg);
        $('.gifWin').removeClass('gifLose')
      }
    });
  }
  $('button[name="resetButton"]').click(function() {
    localStorage.setItem("roundLength", 0);
    localStorage.setItem("whatRound", 1);
    location.reload();
  });

  function nextLevel() {
    $('button[name="roundUp"]').click(function() {
      lengthOfWord = lengthOfWord + 2;
      roundNum = roundNum + 1
      localStorage.setItem("roundLength", lengthOfWord);
      localStorage.setItem("whatRound", roundNum);
      location.reload();
    });
  }
};



// Affine Cipher (Hardest)
// var a = coprimes < 26
// var b = shifting
// var x = current letter placement alphabet
// var m = total number of letters in the alphabet = 26
// E(x) = ax+b mod m

/*var a = 5
var b = 8
var m = 26
var x = 13 // match alphabet to number and get return.

function affineCipher() {
  var result = (a*x+b) % m;
  console.log(result);
}

*/





