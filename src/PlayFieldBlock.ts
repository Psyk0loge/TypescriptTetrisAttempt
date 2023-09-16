// import { PlayBlocks } from "./PlayBlocks";

class PlayFieldBlock {
  private _isFieldTaken = false;
  //Todo: check if this is the best datatype
  //Todo: check if this thing with optional parameter is actually working like this
  private _color: string = "black";
  private _colorFree: string = "black"
  private _colorTaken: string = "blue"

  public constructor(isBlockPlaced?: boolean, color?: string){
    if(typeof isBlockPlaced !== 'undefined'){
      this._isFieldTaken = isBlockPlaced;
    }
    if(typeof color !== 'undefined'){
      this._color = color;
    }
  }

  public setFieldToTaken() {
    this._isFieldTaken = true;
  }

  public isFieldTaken():boolean{
    return this._isFieldTaken;
  }

  public getFieldColor(){
    return this._color;
  }

  public setFieldColor(color: string){
    this._color=color;
  }

  public setFree(){
    this._isFieldTaken = false;
    this._color = this._colorFree
  }

  public setTaken(){
    this._isFieldTaken = true;
    this._color = this._colorTaken;
  }

}
export { PlayFieldBlock };