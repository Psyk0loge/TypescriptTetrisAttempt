import { PlayBlock } from "./PlayBlocks";
import {PlayFieldBlock} from "./PlayFieldBlock"

class PlayField{
    //Why do I have to specify the value type here?
    readonly TETRIS_FIELD_SIZE_X:number  = 10;
    readonly TETRIS_FIELD_SIZE_Y:number = 20;
    readonly DEFAULT_FIELD_BLOCK_SIZE:number = 50;
    private _playFieldArray: PlayFieldBlock[][]

    constructor(fieldSize_X: number, fieldSize_Y: number, defaultBlock_Size: number){
        this.TETRIS_FIELD_SIZE_X = fieldSize_X;
        this.TETRIS_FIELD_SIZE_Y = fieldSize_Y;
        this.DEFAULT_FIELD_BLOCK_SIZE = defaultBlock_Size;
        this._playFieldArray =  this._getEmptyPlayField();
    }

    private _getEmptyPlayField(): PlayFieldBlock[][]{
        const playFieldArray: PlayFieldBlock[][] = Array.from({ length: this.TETRIS_FIELD_SIZE_X }, () =>
          Array.from({ length: this.TETRIS_FIELD_SIZE_Y }, () => new PlayFieldBlock())
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
            if(!playFieldBlock.isFieldTaken()){
                lineIsFull = false;
                break;
            }
        }
        return lineIsFull
    }

    moveLineGivenLinesDown(yIndexOfLineToMove: number, linesToMove: number){
        for(let i = 0; i < this.TETRIS_FIELD_SIZE_X; i++ ){
            if(this._playFieldArray[i][yIndexOfLineToMove].isFieldTaken()){
                this._playFieldArray[i][yIndexOfLineToMove + linesToMove].setFieldToTaken()
                this._playFieldArray[i][yIndexOfLineToMove].setFree()
            }
        }
    }

    clearFullLine(yIndex: number){
        for(let i = 0; i < this.TETRIS_FIELD_SIZE_X; i++ ){
            this._playFieldArray[i][yIndex].setFree()
        }
    }

    checkAndReactToFullLines(){
        for(let i = this.TETRIS_FIELD_SIZE_Y-1; i > 0; i--){
            var fallCounter = 0
            if(this.checkIfLineIsFull(i)){
                fallCounter++
                this.clearFullLine(i)
                this.moveLineGivenLinesDown(i, fallCounter)
            }
        }
        this.printPlayField()
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
                playFieldBlockHtml.style.backgroundColor = fieldParameters.getFieldColor();
                playFieldBlockHtml.style.width = this.DEFAULT_FIELD_BLOCK_SIZE + "px"
                playFieldBlockHtml.style.height = this.DEFAULT_FIELD_BLOCK_SIZE + "px"
                playFieldBlockHtml.style.display = "block"
                playFieldColumn ?.appendChild(playFieldBlockHtml);
            }
        playField?.appendChild(playFieldColumn);
        }
    }

    private checkCollision(x: number, y: number): boolean{
        if(this._playFieldArray[x][y] == undefined){
            console.log(`checking on field: ${x}-${y}`)
            return true;
        }else{
            console.log(`checking on field: ${x}-${y} the field is ${this._playFieldArray[x][y].isFieldTaken()}`)
            //create a method that check if a field exists and than gives back the 
            return this._playFieldArray[x][y].isFieldTaken()
        }
    }

    checkCollisionDown(blocks: PlayBlock, getBlocksToCheck: (self: PlayBlock)=>number[][]): boolean{
        // let collision = false
        // for(let block of blocks.getLowestBlockPosition()){
        //     block[1] = block[1] + 1 
        //     if(this.checkCollision(block[0], block[1])){
        //         console.log("down collision detected")
        //         collision = true;
        //     }else{
        //         console.log("no down collision detected")
        //     }

        // }
        // return collision
        return this.checkCollisionDirection(blocks, getBlocksToCheck)
    }

    //Todo: vllt so überabeiten, dass man x und y über gibt und beides überprüft wird...
    //weil der wirft noch einen Fehler in manchen Fällen...
    checkIfFieldExists(numberToCheck: number): boolean{
        return ((numberToCheck >= 0) && (numberToCheck <= this.TETRIS_FIELD_SIZE_X-1))
    }

    // checks if field exists and is taken
    checkCollisionDirection(blocks: PlayBlock, getBlocksToCheck: (self: PlayBlock)=>number[][]): boolean{
        let collision = false
        PlayBlock.prototype.getPlayBlocksCheck = getBlocksToCheck
        //Todo: change here that the method for the blocks to check is provided as well
        for(let checkBlock of blocks.getPlayBlocksCheck(blocks)){
            checkBlock[0] = checkBlock[0] - 1
            if(this.checkIfFieldExists(checkBlock[0])){
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
        this._playFieldArray[x][y].setTaken()
        this.renewPlayField()
    }

    setFieldToFree(x: number, y: number){
        this._playFieldArray[x][y].setFree()
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