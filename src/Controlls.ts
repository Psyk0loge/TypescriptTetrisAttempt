import {PlayField} from "./PlayField"

class Controlls{
    private readonly _playField: PlayField;
    public static directions = {
        Left : 'left',
        Right : 'right',
        Up : 'up',
        Down : 'down',
      }
    
    constructor(playField: PlayField){
        this._playField = playField;
        window.addEventListener("keydown", e => this.playerControl(e.key))
    }

    playerControl(key : string){
        function getRandomInt(max: number) {
          return Math.floor(Math.random() * max);
        }
      
        this._playField.setFieldColor(getRandomInt(this._playField.TETRIS_FIELD_SIZE_X), getRandomInt(this._playField.TETRIS_FIELD_SIZE_Y))
      
      }
}
export { Controlls };