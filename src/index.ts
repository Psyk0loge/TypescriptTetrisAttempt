/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const playerBlock = <HTMLDivElement>document.getElementById("ballID");

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
function moveItems(direction : string){
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
  const playerBlock = <HTMLDivElement>document.getElementById("ballID");
  if(playerBlock != null && playerBlock != undefined){
    switch(key) {
      case "ArrowUp":
        var top = parseInt(playerBlock?.style.marginTop) + 10
        playerBlock.style.marginTop = top + "px";
        console.log("Up")
        moveItems(directions.Up)
        break
      case "ArrowDown":  
        var top = parseInt(playerBlock?.style.marginTop) - 10
        playerBlock.style.marginTop = top + "px";
        console.log("Down")
        break
      case "ArrowLeft":  
        var top = parseInt(playerBlock?.style.left) - 10
        playerBlock.style.left = top + "px";
        console.log("Left")
        break
      case "ArrowRight":  
        var top = parseInt(playerBlock?.style.left) + 10
        playerBlock.style.left = top + "px";
        console.log("Right")
        break
      }
  }
}


function getPlayer(elementClass : string): HTMLDivElement{
  return <HTMLDivElement>document.getElementsByClassName(elementClass)[0]
}