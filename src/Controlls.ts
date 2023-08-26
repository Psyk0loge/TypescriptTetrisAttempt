import {PlayField} from "./PlayField"
import { getRandomInt } from "./GetRandomNumber";

class Controlls{
    private readonly _playField: PlayField;
    public static directions = {
        Left : 'left',
        Right : 'right',
        Up : 'up',
        Down : 'down',
    }

    playerBlockControl(key : string){
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
        window.addEventListener("keydown", e => this.playerControl(e.key))
    }

    setFieldColor(blockPositions: number[][]){
        //a neat thing I learned from chatGPT
        // for(let blockPosition in blockPositions)
        // this._playField.setFieldColor(blockPositions[blockPosition][0],blockPositions[blockPosition][1])
        for(let blockPosition of blockPositions)
        this._playField.setFieldColor(blockPosition[0],blockPosition[1])
    }

    playerControl(key : string){
        this._playField.setFieldColor(getRandomInt(this._playField.TETRIS_FIELD_SIZE_X), getRandomInt(this._playField.TETRIS_FIELD_SIZE_Y))
    }

}
export { Controlls };