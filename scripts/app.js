window.onload = function () {
  var currentdate = new Date();
  var dateTime = "The time is currently: " + (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + (currentdate.getHours()-12) + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  console.log("Welcome to the my Portfolio.");
  console.log("I hope you enjoy what you find here.");
  console.log("Please note that you can reach to me at josh@joshenglish.com.");
  console.log("Remember you can change the world with each line of code you write.")
  console.log(dateTime);
}

$(function(){
    $(".element").typed({
        strings: ["Web Developer.^2000", "Builder.^2000","Growth Hacker.^2000", "FinTech Guru.^2000", "Maker.^2000"],
        typeSpeed: 25,
        loop: true
    });
});
