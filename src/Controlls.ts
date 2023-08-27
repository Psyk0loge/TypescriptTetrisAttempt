import {PlayField} from "./PlayField"
import { getRandomInt } from "./GetRandomNumber";
import { PlayBlocks } from "./PlayBlocks";

class Controlls{
    private readonly _playField: PlayField;

    public static directions = {
        Left : 'left',
        Right : 'right',
        Up : 'up',
        Down : 'down',
    }
    
    private _currentPlayBlock?: PlayBlocks

    playerBlockControl(key : string){
        console.log(`recieved input from key: ${key}`)
        // if(playerBlock != null && playerBlock != undefined){
        //   switch(key) {
        //     case "ArrowUp":
        //       marginTop -= 10
        //       playerBlock.style.marginTop = marginTop + "px";
        //       break
        //     case "ArrowDown":  
        //       marginTop += 10
        //       playerBlock.style.marginTop = marginTop + "px";
        //       break
        //     case "ArrowLeft":  
        //       marginLeft -= 10
        //       playerBlock.style.marginLeft = marginLeft + "px";
        //       break
        //     case "ArrowRight":  
        //       marginLeft += 10
        //       playerBlock.style.marginLeft = marginLeft + "px";
        //       break
    }

    getFieldSize_X():number {
        return this._playField.TETRIS_FIELD_SIZE_X
    }

    getFieldSize_Y():number {
        return this._playField.TETRIS_FIELD_SIZE_Y
    }

    getFieldDefaultBlock_Size():number {
        return this._playField.DEFAULT_FIELD_BLOCK_SIZE
    }
    
    constructor(playField: PlayField){
        this._playField = playField;
        //window.addEventListener("keydown", e => this.playerControl(e.key))
    }

    createNewPlayBlock(){
        this._currentPlayBlock = new PlayBlocks()
        // this._currentPlayBlock.pop()
        // this._currentPlayBlock.push(new PlayBlocks()) 
        // //this.blockField(this._currentPlayBlock.blockPositions)
    }

    playBlockExists(){
        if(this._currentPlayBlock == undefined){
            return false;
        }
        return true;
    }

    //not working correctly things can go into each other...
    checkColision(): boolean{
        if(this._currentPlayBlock != null){
            let checkPosition = this._currentPlayBlock.getLowestBlockPosition()
            console.log(this._playField.checkCollisionDown(checkPosition[0],checkPosition[1]))
            return this._playField.checkCollisionDown(checkPosition[0],checkPosition[1])
        }
        //if no playblock exists this should lateron create a new one...
        console.log("collison = true")
        return true;
    }

    blockField(blockPositions: number[][]){
        for(let blockPosition of blockPositions){
            //this._playField.setFieldColor(blockPosition[0],blockPosition[1],"blue")
            console.log(`blocking fields: ${blockPosition}`)
            this._playField.setFieldToTaken(blockPosition[0],blockPosition[1])
        }
    }
    
    freeField(blockPositions: number[][]){
        for(let blockPosition of blockPositions){
            //here replace this... with 
            this._playField.setFieldToFree(blockPosition[0],blockPosition[1])
        }
    }

    fall(){
        if(this._currentPlayBlock != null && this._currentPlayBlock != undefined){
            this.freeField(this._currentPlayBlock.blockPositions)
            for(let blockPosition of this._currentPlayBlock.blockPositions){
                blockPosition[1] = blockPosition[1] + 1
            }
            this.blockField(this._currentPlayBlock.blockPositions)
        }
    }

    moveLeft() {

    }
  
    moveRight() {}
  
    moveDown() {}

    // turn(){

    // }

    // playerControl(key : string){
    //     this._playField.setFieldColor(getRandomInt(this._playField.TETRIS_FIELD_SIZE_X), getRandomInt(this._playField.TETRIS_FIELD_SIZE_Y))
    // }

}
export { Controlls };