

export const x1_Board = [
  [' '],
];
export const x2_Board = [
  [' ', ' '],
  [' ', ' '],
];
export const x3_Board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

// Example board with a standard 8x8 layout
export const x8_Board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];






export const x1_defaultPossiblePositions = createdefaultPossiblePositionsArrayWithSize(1);
export const x2_defaultPossiblePositions = createdefaultPossiblePositionsArrayWithSize(2);
export const x3_defaultPossiblePositions = createdefaultPossiblePositionsArrayWithSize(3);
export const x8_defaultPossiblePositions = createdefaultPossiblePositionsArrayWithSize(8);



function createdefaultPossiblePositionsArrayWithSize( size : number)
{
  return  Array.from({ length: size }, () => Array(size).fill(false));
}