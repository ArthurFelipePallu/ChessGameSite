export type BoardColorSchemeGroupDTO = {
  id:string;
  name:string;
  iconId:string;
  colorSchemes:BoardColorSchemeDTO[];
}

export type BoardColorSchemeDTO = {
  id: string;
  name: string;
  white : string,// Color of white squares
  black: string, // Color of black squares
  highlightedWhite: string, // Highlighted Color of white square
  highlightedBlack: string, // Highlighted Color of black square
  possibleMoveHighlight: string, // Color of possible moves
};


export type BoardColorSchemeCardDTO = {
  schemeId: string,
  schemeName: string,
  onClick: (id: string) => void,
  isSelected: boolean,
};

