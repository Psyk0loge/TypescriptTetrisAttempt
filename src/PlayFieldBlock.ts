class PlayFieldBlock {
  private _isFieldTaken = false;
  //Todo: check if this is the best datatype
  //Todo: check if this thing with optional parameter is actually working like this
  private _color: string = "black";

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

  public setFieldToUntaken() {
    this._isFieldTaken = false;
  }

  public isFieldFree(){
    return this._isFieldTaken;
  }

  public getFieldColor(){
    return this._color;
  }

  public setFieldColor(color: string){
    this._color=color;
  }

}
export { PlayFieldBlock };