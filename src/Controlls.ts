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
        switch(key) {
        case "ArrowDown":  
            if(!this.checkCollisionDown()){
                this.fall()
            }
            break
        case "ArrowLeft":  

            break
        case "ArrowRight":  
            break
        }
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
        window.addEventListener("keydown", e => this.playerBlockControl(e.key))
    }

    createNewPlayBlock(){
        this._currentPlayBlock = new PlayBlocks()
    }

    playBlockExists(){
        if(this._currentPlayBlock == undefined){
            return false;
        }
        return true;
    }

    
    checkCollisionDown(): boolean{
        if(this._currentPlayBlock != null){
            let checkPosition = this._currentPlayBlock.getLowestBlockPosition()
            for(let block of checkPosition){
                if(this._playField.checkCollisionDown(block[0], block[1])){
                    return true
                }
            }
            return false
            //console.log(this._playField.checkCollisionDown(checkPosition[0],checkPosition[1]))
        }
        //if no playblock exists this should lateron create a new one...
        console.log("collison = true")
        return true;
    }

    checkCollisionLeft(): boolean{
        if(this._currentPlayBlock != null){
            let checkPosition = this._currentPlayBlock.getLowestBlockPosition()
            for(let block of checkPosition){
                if(this._playField.checkCollisionDown(block[0], block[1])){
                    return true
                }
            }
            return false
            //console.log(this._playField.checkCollisionDown(checkPosition[0],checkPosition[1]))
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

}
export { Controlls };