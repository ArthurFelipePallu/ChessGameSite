

export const x2_Board = [
  [' ', ' '],
  [' ', ' '],
];

export const x8_defaultFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";



export const x2_defaultPossiblePositions = "2/2";
export const x8_defaultPossiblePositionsFenString = "8/8/8/8/8/8/8/8";




export default function toChessNotation(row:number, column:number) {
  if (row < 0 || row > 7 || column < 0 || column > 7) {
    throw new Error("Row and column must be between 0 and 7");
  }

  const file = String.fromCharCode("a".charCodeAt(0) + column);
  const rank = 8 - row;

  return `${file}${rank}`;
}