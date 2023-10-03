import {PlayField} from "./PlayField"
import { getRandomInt } from "./GetRandomNumber";
import { PlayBlock } from "./PlayBlocks";

class GameLogic{
    private readonly _playField: PlayField;

    private _currentPlayBlock?: PlayBlock

    constructor(){
        this._playField = new PlayField();
        window.addEventListener("keydown", e => this.playerBlockControl(e))
    }

    //Todo: change to only getting input and logic is in other statements...
    playerBlockControl(e : KeyboardEvent){
        e.preventDefault()
        let key = e.key
        console.log(`recieved input from key: ${key}`)
        if(this._currentPlayBlock != null &&this._currentPlayBlock != undefined){
            switch(key) {
            case "ArrowDown":  
                if(!this.checkCollisionDirection(
                    this._currentPlayBlock.getLowestBlockPosition())
                    ){
                    //der prüft das Feld auf dem er sich befindet statt das wo er hin soll
                    this.move(1, x => this.erhoeheZweitesElement(x));
                }
                break
            case "ArrowLeft":  
                if(!this.checkCollisionDirection(
                    this._currentPlayBlock.getLeftBlocksToCheck())
                    ){
                    this.move(0, (x) => [x[0] - 1, x[1]])
                }
                break
            case "ArrowRight":  
            if(!this.checkCollisionDirection(
                this._currentPlayBlock.getRightBlocksToCheck())
                ){
                this.move(0, x => [x[0] + 1, x[1]])
            }
            break
            case "w":
                // this.turnLeft()
                break;
            }
        }
    }

    //count 2nd element up
    erhoeheZweitesElement(array: number[]): number[] {
        array[1] = array[1] + 1
        return array
    };
    
    //Todo: this should not be in here
    createAndSetNewPlayBlock(){
        this._currentPlayBlock = new PlayBlock()
    }

    playBlockExists(){
        if(this._currentPlayBlock == undefined){
            return false;
        }
        return true;
    }

    //Should this Logic for checking if there is a collision really be in playField?
    checkCollisionDown(): boolean{
        if(this._currentPlayBlock != null){
            console.log("checking for colision right controller")  
            return this._playField.checkCollisionDirection(
                this._currentPlayBlock,
                this._currentPlayBlock.getLowestBlockPosition()
            );
        }
        //if no playblock exists this should lateron create a new one...
        console.log("collison = true")
        return true; 
    }

    checkCollisionDirection(blocksToCheck: number[][]): boolean{
        if(this._currentPlayBlock != null){
            console.log("checking for colision left controller")
            return this._playField.checkCollisionDirection(this._currentPlayBlock, blocksToCheck)
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

    move(index: number, fn: (blockPositions: number[]) => number[]) {
        if(this._currentPlayBlock != null && this._currentPlayBlock != undefined){
            this.freeField(this._currentPlayBlock.blockPositions)
            for(let blockPosition in this._currentPlayBlock.blockPositions){
                //blockPosition[0] = fn(blockPosition[0])
                this._currentPlayBlock.blockPositions[blockPosition] =
                 fn(this._currentPlayBlock.blockPositions[blockPosition])
            }
            this.blockField(this._currentPlayBlock.blockPositions)
        }
        this._playField.redrawPlayField();
    }

    checkFullLines(){
        this._playField.checkAndReactToFullLines()
    }

    //unclean cause sideeffects
    // turnLeft(){
    //     this._currentPlayBlock?.turnLeft()
    // }

}
//Todo: change the naming down here !!!
export { GameLogic as Controlls };