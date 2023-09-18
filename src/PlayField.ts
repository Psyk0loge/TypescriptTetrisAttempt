import { PlayBlock } from "./PlayBlocks";
import {PlayFieldBlock} from "./PlayFieldBlock"

class PlayField{
    //Why do I have to specify the value type here?
    readonly TETRIS_FIELD_SIZE_X:number  = 10;
    readonly TETRIS_FIELD_SIZE_Y:number = 20;
    readonly DEFAULT_FIELD_BLOCK_SIZE:number = 50;
    private _playFieldArray: boolean[][]

    constructor(fieldSize_X: number, fieldSize_Y: number, defaultBlock_Size: number){
        this.TETRIS_FIELD_SIZE_X = fieldSize_X;
        this.TETRIS_FIELD_SIZE_Y = fieldSize_Y;
        this.DEFAULT_FIELD_BLOCK_SIZE = defaultBlock_Size;
        this._playFieldArray =  this._getEmptyPlayField();
    }

    private _getEmptyPlayField(): boolean[][]{
        const playFieldArray: boolean[][] = Array.from({ length: this.TETRIS_FIELD_SIZE_X },
             () => Array.from({ length: this.TETRIS_FIELD_SIZE_Y },
            () => false)
        );
        return playFieldArray;
    }

    public getArraySize():number[]{
        return [this.TETRIS_FIELD_SIZE_X, this.TETRIS_FIELD_SIZE_Y]
    }

    createPlayField(){
        let playFieldMainDiv = document.createElement("div")
        let windowWidth = this.TETRIS_FIELD_SIZE_X * this.DEFAULT_FIELD_BLOCK_SIZE
        let windowHeight = this.TETRIS_FIELD_SIZE_Y * this.DEFAULT_FIELD_BLOCK_SIZE
        playFieldMainDiv.setAttribute("id", "playField")
        playFieldMainDiv.style.width = windowWidth  + "px"
        playFieldMainDiv.style.height = windowHeight + "px"
        playFieldMainDiv.style.marginLeft = (window.innerWidth - windowWidth)/2 + "px"
        playFieldMainDiv.style.marginTop = (window.innerHeight - windowHeight)/2 + "px"
        playFieldMainDiv.style.backgroundColor = "black"
        const container = document.querySelector(".container")
        container?.appendChild(playFieldMainDiv);
    }

    checkIfLineIsFull(yIndex: number): boolean{
        var lineIsFull = true;
        for(let i = 0; i < this.TETRIS_FIELD_SIZE_X; i++ ){
            var playFieldBlock = this._playFieldArray[i][yIndex]
            if(!this._playFieldArray[i][yIndex]){
                lineIsFull = false;
                break;
            }
        }
        return lineIsFull
    }

    moveLineGivenLinesDown(yIndexOfLineToMove: number, linesToMove: number){
        for(let i = 0; i < this.TETRIS_FIELD_SIZE_X; i++ ){
            if(this._playFieldArray[i][yIndexOfLineToMove]){
                this._playFieldArray[i][yIndexOfLineToMove + linesToMove] = true
                this._playFieldArray[i][yIndexOfLineToMove] = false
            }
        }
    }

    clearFullLine(yIndex: number){
        for(let i = 0; i < this.TETRIS_FIELD_SIZE_X; i++ ){
            this._playFieldArray[i][yIndex] = false
        }
    }

    checkAndReactToFullLines(){
        var fallCounter = 0
        for(let i = this.TETRIS_FIELD_SIZE_Y-1; i > 0; i--){
            if(this.checkIfLineIsFull(i)){
                fallCounter = fallCounter + 1
                this.clearFullLine(i)
            }else{
                if(fallCounter >0){
                    this.moveLineGivenLinesDown(i, fallCounter)

                }
            }
        }
        // this.printPlayField()d
    }

    //Todo: irgendwann mal ändern das der nicht irgendwie die ersten 3 nicht printed...
    printPlayField(){
        const playField = document.getElementById("playField")
        for(let x = 0; x<this.TETRIS_FIELD_SIZE_X; x++ ){
            const playFieldColumn = document.createElement("div")
            playFieldColumn.style.width = this.DEFAULT_FIELD_BLOCK_SIZE + "px"
            playFieldColumn.style.height = (this.DEFAULT_FIELD_BLOCK_SIZE * this.TETRIS_FIELD_SIZE_Y) + "px"
            playFieldColumn.style.display = "inline-block"
            playFieldColumn.setAttribute("id", `${x}`)
            for(let y = 0; y<this.TETRIS_FIELD_SIZE_Y; y++){
                const playFieldBlockHtml = document.createElement("div")
                playFieldBlockHtml?.setAttribute("id", `${x}-${y}`)
                const fieldParameters = this._playFieldArray[x][y]
                //Todo: pack into its own function
                if(this._playFieldArray[x][y]){
                    //field is taken
                    playFieldBlockHtml.style.backgroundColor = "blue";
                }else{
                    playFieldBlockHtml.style.backgroundColor = "black"
                }
                playFieldBlockHtml.style.width = this.DEFAULT_FIELD_BLOCK_SIZE + "px"
                playFieldBlockHtml.style.height = this.DEFAULT_FIELD_BLOCK_SIZE + "px"
                playFieldBlockHtml.style.display = "block"
                playFieldColumn ?.appendChild(playFieldBlockHtml);
            }
        playField?.appendChild(playFieldColumn);
        }
    }

    //Todo: check who uses this method and maybe change it to checkCollisionDirection
    private checkCollision(x: number, y: number): boolean{
        //Todo: check if this realy prevents the programm from throwing an exception...
        if(this._playFieldArray[x][y] == undefined){
            console.log(`checking on field: ${x}-${y}`)
            return true;
        }else{
            console.log(`checking on field: ${x}-${y} the field is 
            ${this._playFieldArray[x][y]}`)
            //create a method that check if a field exists and than gives back the 
            return this._playFieldArray[x][y]
        }
    }

    checkCollisionDown(blocks: PlayBlock, getBlocksToCheck: number[][]): boolean{
        return this.checkCollisionDirection(blocks, getBlocksToCheck)
    }

    checkIfFieldExists(xToCheck: number, yToCheck: number): boolean{
        return ((xToCheck >= 0) && (xToCheck <= this.TETRIS_FIELD_SIZE_X-1)) && 
                ((xToCheck >= 0) && (yToCheck <= this.TETRIS_FIELD_SIZE_Y - 1))
    }

    // checks if field exists and is taken
    checkCollisionDirection(blocks: PlayBlock, blocksToCheck: number[][]): boolean{
        let collision = false
        //Todo: change here that the method for the blocks to check is provided as well
        for(let checkBlock of blocksToCheck){
            // checkBlock[0] = checkBlock[0] - 1
            if(this.checkIfFieldExists(checkBlock[0], checkBlock[1])){
                //hier muss noch irgendwie rein, dass der +
                if(this.checkCollision(checkBlock[0],checkBlock[1])){
                    console.log("left collision detected")
                    collision = true;
                }else{
                    console.log("no left collision detected")
                }
            }else{
                return true
            }
        }
        return collision
    }

    removeChildrenElements(element: HTMLElement) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
    }

    setFieldToTaken(x: number, y: number){
        this._playFieldArray[x][y] = true
        this.renewPlayField()
    }

    setFieldToFree(x: number, y: number){
        this._playFieldArray[x][y] = false
        this.renewPlayField()
    }

    renewPlayField(){
        const playField = document.getElementById("playField")
        if(playField != null && playField != undefined){
            this.removeChildrenElements(playField)
        }
        this.printPlayField()
        //console.log("Printed: "+ `${x},${y}`)
    }


}

export { PlayField };