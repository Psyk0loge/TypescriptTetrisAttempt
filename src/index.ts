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
  playField.createPlayField()
  gameLoop()
  setInterval(gameLoop, playSpeed)
}

function gameLoop(){
  if(playControlls.playBlockExists()){
    playControlls.createNewPlayBlock()
  }
  playControlls.checkColision()

  //mit jedem ticken muss der PlayBlock eins runter gehen...
  //setInterval()
}

setupGame()




