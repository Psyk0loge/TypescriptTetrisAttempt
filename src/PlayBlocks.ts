import { getRandomInt } from "./GetRandomNumber";
import { Controlls } from "./Controlls";

class PlayBlocks{
    public static blockTypes = [
        [[4,0],[4,1],[4,2],[4,3]], 
        [[4,0],[4,1],[5,0],[5,1]],
        [[4,0],[4,1],[4,2],[5,0]],
        [[4,0],[4,1],[5,1],[5,2]],
        [[4,0],[3,1],[4,1],[5,1]],
    ]

    private _controlls: Controlls
    private _blockPositions: number[][]

    constructor(controlls: Controlls){
        this._controlls = controlls
        this._blockPositions = PlayBlocks.blockTypes[getRandomInt(4)]
        this._controlls.setFieldColor(this._blockPositions)
    }
    
}
export namespace BlockTypeValues{
    enum BlockTypeValues{
        LONG = 0,
        BLOCK = 1,
        L_BLOCK = 2,
        Z_BLOCK = 3,
        T_BLOCK = 4
    }
}



export {PlayBlocks}