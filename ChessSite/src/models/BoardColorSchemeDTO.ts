export type BoardColorSchemeJSON = {
  id: string;
  name: string;
} & BoardColorSchemeDTO;

export type BoardColorSchemeDTO = {
  white : string,// Color of white squares
  black: string, // Color of black squares
  highlightedWhite: string, // Highlighted Color of white square
  highlightedBlack: string, // Highlighted Color of black square
  possibleMoveHighlight: string, // Color of possible moves
};
