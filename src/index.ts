/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import {PlayField} from "./PlayField"
import {Controlls} from "./GameLogic"

//const PlayerBlock? = <HTMLDivElement>document.getElementById("ballID");
let playField = new PlayField();
let playControlls = new Controlls();
let playSpeed = 750


function setupGame(){
  console.log("game started")
  playField.createPlayField()
  gameLoop()
  setInterval(gameLoop, playSpeed)
}

function gameLoop(){
  if(!playControlls.playBlockExists()){
    playControlls.createAndSetNewPlayBlock()
  }
  console.log("now checking for colision")

  if(!playControlls.checkCollisionDown()){
    console.log("start falling")
    playControlls.move(1, x => [x[0], x[1] + 1])
  } else {
    playControlls.checkFullLines()
    playControlls.createAndSetNewPlayBlock()
    //Punkte Zählen...
  }

  //mit jedem ticken muss der PlayBlock eins runter gehen...
  //setInterval()
}

setupGame()




