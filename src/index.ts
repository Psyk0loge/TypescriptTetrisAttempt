/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const playerBlock = <HTMLDivElement>document.getElementById("ballID");

let marginLeft = 0;
let marginTop = 0;
playerBlock.style.marginLeft = 0 + "px"
playerBlock.style.marginTop = 0 + "px"

function setup(){
  //vllt ne funktion, die am Anfang alles auf 0 margin setztz...
  playerBlock.style.marginLeft = 0 + "px"
  playerBlock.style.marginTop = 0 + "px"
}

const directions = {
  Left : 'left',
  Right : 'right',
  Up : 'up',
  Down : 'down',
}

window.addEventListener("keydown",
  x =>{
    playerControl(x.key)
  }
  

)

let margin = 0;

let w = 980
let l = window.screen.width
//let myVar = setInterval(moveItems,10)
function moveItems(){
  console.log(playerBlock)
  if(playerBlock != null && playerBlock != undefined){
    console.log(w)
    if(margin >= w){
      margin = 0
    }else{
      playerBlock.style.marginLeft = margin + "px";
    }
    margin += 3
  }
}

function playerControl(key : string){
  if(playerBlock != null && playerBlock != undefined){
    switch(key) {
      case "ArrowUp":
        marginTop -= 10
        playerBlock.style.marginTop = marginTop + "px";
        break
      case "ArrowDown":  
        marginTop += 10
        playerBlock.style.marginTop = marginTop + "px";
        break
      case "ArrowLeft":  
        marginLeft -= 10
        playerBlock.style.marginLeft = marginLeft + "px";
        break
      case "ArrowRight":  
        marginLeft += 10
        playerBlock.style.marginLeft = marginLeft + "px";
        break
      }
  }
}


function getPlayer(elementClass : string): HTMLDivElement{
  return <HTMLDivElement>document.getElementsByClassName(elementClass)[0]
}