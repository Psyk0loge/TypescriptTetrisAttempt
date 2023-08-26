/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//const playerBlock? = <HTMLDivElement>document.getElementById("ballID");

const TETRIS_FIELD_SIZE_X = 10;
const TETRIS_FIELD_SIZE_Y = 20;
const DEFAULT_FIELD_BLOCK_SIZE = 50;

class playFieldBlock {
  private _isFieldTaken = false;
  //Todo: check if this is the best datatype
  //Todo: check if this thing with optional parameter is actually working like this
  private _color: string = "black";

  public constructor(isBlockPlaced?: boolean, color?: string){
    if(typeof isBlockPlaced !== 'undefined'){
      this._isFieldTaken = isBlockPlaced;
    }
    if(typeof color !== 'undefined'){
      this._color = color;
    }
  }

  public setFieldToTaken() {
    this._isFieldTaken = true;
  }

  public setFieldToUntaken() {
    this._isFieldTaken = false;
  }

  public getFieldIsTakenStatus(){
    return this._isFieldTaken;
  }

  public getFieldColor(){
    return this._color;
  }

  public setFieldColor(color: string){
    this._color=color;
  }

}

//the array will always be created with 4 more unvisible blocks in the height
function initializeEmptyPlayField(width: number, height: number): playFieldBlock[][]{
  const playFieldArray: playFieldBlock[][] = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => new playFieldBlock())
  );

  return playFieldArray;
}

function printPlayField(playFieldArray: playFieldBlock[][]){
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
      const fieldParameters: playFieldBlock = playFieldArray[x][y]
      playFieldBlockHtml.style.backgroundColor = fieldParameters.getFieldColor();
      playFieldBlockHtml.style.width = DEFAULT_FIELD_BLOCK_SIZE + "px"
      playFieldBlockHtml.style.height = DEFAULT_FIELD_BLOCK_SIZE + "px"
      playFieldBlockHtml.style.display = "block"
      playFieldColumn ?.appendChild(playFieldBlockHtml);
    }
    playField?.appendChild(playFieldColumn);
  }
}

function setFieldColor(x: number, y: number, playFieldArray: playFieldBlock[][]){
  const playFieldToChange: playFieldBlock = playFieldArray[x][y] 
  playFieldToChange.setFieldColor("blue")
  let changeBlock = document.getElementById(`${x}-${y}`)
  if (changeBlock) {
    changeBlock.style.backgroundColor = "blue";
    console.log("Background color changed to blue");
  } else {
    console.log(`Element ${x}-${y} not found`);
  }
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

function gameLoop(playFieldArray: playFieldBlock[][]){
  printPlayField(playFieldArray);
  setFieldColor(0, 11, playFieldArray)
}

setupGame();

const directions = {
  Left : 'left',
  Right : 'right',
  Up : 'up',
  Down : 'down',
}


