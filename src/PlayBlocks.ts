import { getRandomInt } from "./GetRandomNumber";

export class PlayBlock {
  //finally found the bug.. since this is static it only exists once meaning that only 4 things can be created in total
  //and ...
  public blockTypes = [
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
    this.blockPositions = this.deepCopyArray(getRandomInt(4));
  }
  
  public getPlayBlocksCheck(blocks: PlayBlock): number[][] {
    return [[]]
  }

  deepCopyArray(index: number): number[][] {
    return this.blockTypes[index].map((x) => x);
  }

  uniqByFilter<T>(array: T[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  //die muss ich noch nachvollziehen...
  getLowestBlockPosition(): number[][] {
    const lowestIndex1Value = Math.min(...this.blockPositions.map(([index1]) => index1));

    const resultArray: number[][] = [];
    //here the deconstructing leads to: 
    for (const [index0, index1] of this.blockPositions) {
        if (index1 === lowestIndex1Value) {
            resultArray.push([index0, index1 + 1]);
        }
    }

    return resultArray;
  }

  getLeftBlocksToCheck(): number[][] {
    const lowestIndex0Value = Math.min(...this.blockPositions.map(([index0]) => index0));

    const resultArray: number[][] = [];
    //here the deconstructing leads to: 
    for (const [index0, index1] of this.blockPositions) {
        if (index0 === lowestIndex0Value) {
            resultArray.push([index0 - 1, index1]);
        }
    }

    return resultArray;
  }
  getRightBlocksToCheck(): number[][] {
  const lowestIndex0Value = Math.max(...this.blockPositions.map(([index0]) => index0));

  const resultArray: number[][] = [];
  //here the deconstructing leads to: 
  for (const [index0, index1] of this.blockPositions) {
      if (index0 === lowestIndex0Value) {
          resultArray.push([index0 + 1, index1]);
      }
  }

  return resultArray;
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




// export {PlayBlock as PlayBlocks}