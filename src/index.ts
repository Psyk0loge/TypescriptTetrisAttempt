/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import {PlayField} from "./PlayField"
import {Controlls} from "./Controlls"
//import { PlayBlocks } from "./PlayBlocks";

//const PlayerBlock? = <HTMLDivElement>document.getElementById("ballID");

let playField = new PlayField(10,20,50);
let playControlls = new Controlls(playField);
let playSpeed = 750


function setupGame(){
  console.log("game started")
  playField.createPlayField()
  gameLoop()
  setInterval(gameLoop, playSpeed)
}

function gameLoop(){
  //Todo: mal schauen ob ich das wirklich noch brauhce...
  if(!playControlls.playBlockExists()){
    playControlls.createNewPlayBlock()
  }
  console.log("now checking for colision")

  if(!playControlls.checkCollisionDown()){
    console.log("start falling")
    playControlls.move(1, x => [x[0], x[1] + 1])
  } else {
    // das machen was passieren soll wenn andockt...
    // playControlls.checkFullLines()
    playControlls.createNewPlayBlock()
    //Punkte Zählen...
  }

  //mit jedem ticken muss der PlayBlock eins runter gehen...
  //setInterval()
}

setupGame()




