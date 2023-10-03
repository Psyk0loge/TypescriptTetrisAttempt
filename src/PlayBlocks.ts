import { getRandomInt } from "./GetRandomNumber";

export class PlayBlock {
  //finally found the bug.. since this is static it only exists once meaning that only 4 things can be created in total
  //and ...
  public blockTypes = [
    //Longboy
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
    ],
    //square
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

  // public blockTypes = [
  //   [
  //     [4, 0],
  //     [4, 1],
  //     [5, 0],
  //     [5, 1],
  //   ],
  //   [
  //     [4, 0],
  //     [4, 1],
  //     [5, 0],
  //     [5, 1],
  //   ],
  //   [
  //     [4, 0],
  //     [4, 1],
  //     [5, 0],
  //     [5, 1],
  //   ],
  //   [
  //     [4, 0],
  //     [4, 1],
  //     [5, 0],
  //     [5, 1],
  //   ],
  //   [
  //     [4, 0],
  //     [4, 1],
  //     [5, 0],
  //     [5, 1],
  //   ],
  // ];

  public blockPositions: number[][];
  private unChecked = true;
  private blockType: number;
  private rotationIndex: number;

  constructor() {
    this.blockType = getRandomInt(4)
    this.blockPositions = this.deepCopyArray(this.blockType);
    this.rotationIndex = 0;
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
    const highestValuesMap: Record<number, number> = {};

    for (const [index0, index1] of this.blockPositions) {
      if (
        highestValuesMap[index0] === undefined ||
        index1 > highestValuesMap[index0]
      ) {
        highestValuesMap[index0] = index1;
      }
    }

    const resultArray: number[][] = [];
    for (const index0 in highestValuesMap) {
      const index1 = highestValuesMap[index0];
      //hier versuchen mit + 1 den nächsten Block statt den wo man selbst ist..
      resultArray.push([Number(index0), index1 + 1]);
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
//introduce parameter, that contains max or min...
  getBlocksToCheck(getRelevantIndex: (a: number[]) => number): number[][] {
    const index0Values = this.blockPositions.map(([index0]) => index0);
    const lowestIndex0Value = getRelevantIndex(index0Values)
    const resultArray: number[][] = [];
    //here the deconstructing leads to: 
    for (const [index0, index1] of this.blockPositions) {
        if (index0 === lowestIndex0Value) {
            resultArray.push([index0, index1]);
        }
    }

    return resultArray;
  }

  setBlockPosition(newBlockPositions: number[][]){
    this.blockPositions = newBlockPositions;
  }

  rotatePlayblock(){
    //this.blockPositions
    //this.blockType
    const turnFunciton = [
      [
        (X0: number): number => X0 = X0 -1,
        (Y0: number): number => Y0 = Y0 + 1
      ],
      [
        (X1: number): number => X1 = X1,
        (Y1: number): number => Y1 = Y1
      ],
      [
        (X2: number): number => X2 = X2 + 1,
        (Y2: number): number => Y2 = Y2 - 1
      ],
      [
        (X3: number): number => X3 = X3,
        (Y3: number): number => Y3 = Y3 - 2
      ],
    ]

    if(this.blockType === 2 && this.rotationIndex === 0){
      for(let i = 0;i < 4; i++){
        for(let j = 0; j < 2; j++){
          var func = turnFunciton[i][j]
          this.blockPositions[i][j] = func(this.blockPositions[i][j])
        }
      }
    }
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