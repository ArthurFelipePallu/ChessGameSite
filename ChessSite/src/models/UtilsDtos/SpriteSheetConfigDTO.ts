import type { PieceSpriteDTO } from "../Chess/PieceSpriteDTO";

export type SpriteSheetConfig ={
    id:string;
    src:string;
    rows:number;
    cols:number;
}

export const defaultChessSpriteSheet: SpriteSheetConfig = {
  id:"classic",
  src: "/assets/classicPieces-spriteSheet.png",
  rows: 2,
  cols: 6
};

export const pieceMap: PieceSpriteDTO[] = [
  { id: 'P', row: 0, col: 5 },
  { id: 'N', row: 0, col: 3 },
  { id: 'B', row: 0, col: 2 },
  { id: 'R', row: 0, col: 4 },
  { id: 'Q', row: 0, col: 1 },
  { id: 'K', row: 0, col: 0 },

  { id: 'p', row: 1, col: 5 },
  { id: 'n', row: 1, col: 3 },
  { id: 'b', row: 1, col: 2 },
  { id: 'r', row: 1, col: 4 },
  { id: 'q', row: 1, col: 1 },
  { id: 'k', row: 1, col: 0 }
];