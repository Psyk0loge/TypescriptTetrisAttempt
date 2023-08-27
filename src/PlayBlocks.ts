import { getRandomInt } from "./GetRandomNumber";

class PlayBlocks {
    //finally found the bug.. since this is static it only exists once meaning that only 4 things can be created in total
    //and ...
  public static blockTypes = [
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
    ],
    [
      [4, 0],
      [4, 1],
      [5, 0],
      [5, 1],
    ],
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [5, 0],
    ],
    [
      [4, 0],
      [4, 1],
      [5, 1],
      [5, 2],
    ],
    [
      [4, 0],
      [3, 1],
      [4, 1],
      [5, 1],
    ],
  ];

  public blockPositions: number[][];
  private unChecked = true;

  constructor() {
    this.blockPositions = PlayBlocks.blockTypes[getRandomInt(4)];
  }

  getLowestBlockPosition(): number[] {
    let currentLowerstBlockPosition = [0, 0];
    for (let blockPosition of this.blockPositions) {
      if (blockPosition[1] > currentLowerstBlockPosition[1]) {
        currentLowerstBlockPosition = blockPosition;
      }
    }
    if (this.unChecked) {
      console.log(
        `x: ${currentLowerstBlockPosition[0]} y: ${currentLowerstBlockPosition[1]}`,
      );
      this.unChecked = false;
    }
    return currentLowerstBlockPosition;
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