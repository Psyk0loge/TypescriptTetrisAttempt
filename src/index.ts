
const ball = document.getElementById("ballID");

var myVar = setInterval(spostaDiv, 90);
var margin = 0;

let l = window.screen.width;
let w = 1300;

function spostaDiv() {
  if(ball != null){
    console.log(w);
    if (margin == w) {
        margin = 0;
    } else {
        ball.style.marginLeft = margin + "px";
    }
    margin += 10;
  }
}
