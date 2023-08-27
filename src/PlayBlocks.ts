import { getRandomInt } from "./GetRandomNumber";

class PlayBlocks {
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

  deepCopyArray(index: number): number[][] {
    return this.blockTypes[index].map((x) => x);
  }

  uniqByFilter<T>(array: T[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  // muss überarbeitet werden
  //   getLowestBlockPosition(): number[][] {
  //     //give me all x values
  //     let xValues = this.blockPositions.filter(x => x[0])
  //     let uniqueXValues = this.uniqByFilter(xValues)
  //     for(let i of uniqueXValues){
  //         let currentLowestBlockY = 0;
  //         let yValues = this.blockPositions.filter
  //         for (let blockPosition of this.blockPositions) {
  //           if (blockPosition[1] > currentLowerstBlockPosition[1]) {
  //             currentLowerstBlockPosition = blockPosition;
  //           }
  //         }

  //     }

  //     //remove duplicates
  //     //uniqueXValues.map()
  //     if (this.unChecked) {
  //       console.log(
  //         `x: ${currentLowerstBlockPosition[0]} y: ${currentLowerstBlockPosition[1]}`,
  //       );
  //       this.unChecked = false;
  //     }
  //     return currentLowerstBlockPosition;
  //   }
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
      resultArray.push([Number(index0), index1]);
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




export {PlayBlocks}