import { PlayBlocks } from "./PlayBlocks";
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

    checkCollisionDown(x: number, y: number): boolean{
        y = y + 1
        return this.checkCollision(x,y)
    }

    checkCollisionLeft(blocks : PlayBlocks): boolean{
        //get relevant blocks
        //add + 1 von x value
        let collision = false
        for(let checkBlockLeft of blocks.getLeftBlocksToCheck()){
            checkBlockLeft[0] = checkBlockLeft[0] - 1
            if(this.checkCollision(checkBlockLeft[0],checkBlockLeft[1])){
                collision = true
                console.log("left collision detected")
            }else{
                console.log("no left collision detected")
            }
        }
        return collision
    }

    checkCollisionRight(x: number, y: number): boolean{
        x = x + 1
        return this.checkCollision(x,y)
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

    // setFieldColor(x: number, y: number, color: string){
    //     this._playFieldArray[x][y].setFieldColor(color)
    //     
    // }
}

export { PlayField };