/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import {PlayFieldBlock} from "./PlayFieldBlock"
import {PlayField} from "./PlayField"
import {Controlls} from "./Controlls"

//const PlayerBlock? = <HTMLDivElement>document.getElementById("ballID");

let playField = new PlayField(10,20,50);
let playControlls = new Controlls(playField);

function setupGame(){
  playField.createPlayField()
  
}

function gameLoop(){
  playField.printPlayField();
  playField.setFieldColor(1,2)
}

setupGame()



const directions = {
  Left : 'left',
  Right : 'right',
  Up : 'up',
  Down : 'down',
}



