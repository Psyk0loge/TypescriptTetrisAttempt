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

    checkCollisionDown(blocks: PlayBlocks): boolean{
        let collision = false
        for(let block of blocks.getLowestBlockPosition()){
            block[1] = block[1] + 1 
            if(this.checkCollision(block[0], block[1])){
                console.log("left collision detected")
                collision = true;
            }else{
                console.log("no left collision detected")
            }

        }
        return collision
    }

    //Todo: vllt so überabeiten, dass man x und y über gibt und beides überprüft wird...
    //weil der wirft noch einen Fehler in manchen Fällen...
    checkIfFieldExists(numberToCheck: number): boolean{
        return ((numberToCheck >= 0) && (numberToCheck <= this.TETRIS_FIELD_SIZE_X-1))
    }

    //Todo: allgemeine Methode check collision die die anderen methoden "ablöst"
    checkCollisionDirection(blocks: PlayBlocks, getBlocksToCheck: ()=>number[][]): boolean{
        let collision = false
        for(let checkBlock of blocks.getLeftBlocksToCheck()){
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