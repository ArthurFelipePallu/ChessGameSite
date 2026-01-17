

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

export const x8_defaultPossiblePositions = Array.from({ length: 8 }, () => Array(8).fill(false));


export const x2_Board = [
  ['P', ' '],
  [' ', ' '],
];
export const x2_defaultPossiblePositions = Array.from({ length: 2 }, () => Array(2).fill(false));
