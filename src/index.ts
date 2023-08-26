/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import {PlayFieldBlock} from "./PlayFieldBlock"

//const PlayerBlock? = <HTMLDivElement>document.getElementById("ballID");

const TETRIS_FIELD_SIZE_X = 10;
const TETRIS_FIELD_SIZE_Y = 20;
const DEFAULT_FIELD_BLOCK_SIZE = 50;



//the array will always be created with 4 more unvisible blocks in the height
function initializeEmptyPlayField(width: number, height: number): PlayFieldBlock[][]{
  const playFieldArray: PlayFieldBlock[][] = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => new PlayFieldBlock())
  );

  return playFieldArray;
}

function printPlayField(playFieldArray: PlayFieldBlock[][]){
  const playField = document.getElementById("playField")
  for(let x = 0; x<TETRIS_FIELD_SIZE_X; x++ ){
    const playFieldColumn = document.createElement("div")
    playFieldColumn.style.width = DEFAULT_FIELD_BLOCK_SIZE + "px"
    playFieldColumn.style.height = (DEFAULT_FIELD_BLOCK_SIZE * TETRIS_FIELD_SIZE_Y) + "px"
    playFieldColumn.style.display = "inline-block"
    playFieldColumn.setAttribute("id", `${x}`)
    for(let y = 0; y<TETRIS_FIELD_SIZE_Y; y++){
      const playFieldBlockHtml = document.createElement("div")
      playFieldBlockHtml?.setAttribute("id", `${x}-${y}`)
      const fieldParameters: PlayFieldBlock = playFieldArray[x][y]
      playFieldBlockHtml.style.backgroundColor = fieldParameters.getFieldColor();
      playFieldBlockHtml.style.width = DEFAULT_FIELD_BLOCK_SIZE + "px"
      playFieldBlockHtml.style.height = DEFAULT_FIELD_BLOCK_SIZE + "px"
      playFieldBlockHtml.style.display = "block"
      playFieldColumn ?.appendChild(playFieldBlockHtml);
    }
    playField?.appendChild(playFieldColumn);
  }
}

function removeChildrenElements(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function setFieldColor(x: number, y: number, playFieldArray: PlayFieldBlock[][]){
  const playFieldToChange: PlayFieldBlock = playFieldArray[x][y] 
  playFieldToChange.setFieldColor("blue")
  const playField = document.getElementById("playField")
  if(playField != null && playField != undefined){
    removeChildrenElements(playField)
  }
  printPlayField(playFieldArray)
  console.log("Printed: "+ `${x},${y}`)
}

function createPlayField(){
  let playFieldMainDiv = document.createElement("div")
  let windowWidth = TETRIS_FIELD_SIZE_X * 50
  let windowHeight = TETRIS_FIELD_SIZE_Y * 50
  playFieldMainDiv.setAttribute("id", "playField")
  playFieldMainDiv.style.width = windowWidth  + "px"
  playFieldMainDiv.style.height = windowHeight + "px"
  playFieldMainDiv.style.marginLeft = (window.innerWidth - windowWidth)/2 + "px"
  playFieldMainDiv.style.marginTop = (window.innerHeight - windowHeight)/2 + "px"
  playFieldMainDiv.style.backgroundColor = "black"
  const container = document.querySelector(".container")
  container?.appendChild(playFieldMainDiv);
}

function setupGame(){
  let playFieldArray = initializeEmptyPlayField(TETRIS_FIELD_SIZE_X, TETRIS_FIELD_SIZE_Y);
  console.log(playFieldArray)
  createPlayField()
  gameLoop(playFieldArray)
}

function gameLoop(playFieldArray: PlayFieldBlock[][]){
  printPlayField(playFieldArray);
  setFieldColor(0, 11, playFieldArray)
  function playerControl(key : string){
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
  
    setFieldColor(getRandomInt(TETRIS_FIELD_SIZE_X), getRandomInt(TETRIS_FIELD_SIZE_Y), playFieldArray)
  
  }
  
  window.addEventListener("keydown", e => playerControl(e.key))
}

setupGame();



const directions = {
  Left : 'left',
  Right : 'right',
  Up : 'up',
  Down : 'down',
}


