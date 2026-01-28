
import type {PieceInformationDTO} from "../../../models/Chess/Piece/PieceInfoDTO";
import { getSpriteSheetById } from "../../../services/pieceSpriteSheet-service";
import { UseSpriteSheet } from "../../../services/pieceSpriteSheet-service";
import { getChessPieceStyle } from "../../../services/pieceSpriteSheet-service";

type Prop ={
    piece:PieceInformationDTO;
}


export default function ChessPiece({ piece }: Prop) {
  const spriteSheet = getSpriteSheetById(piece.spriteSheetId);
  const spriteInfo = UseSpriteSheet(spriteSheet);

  if (!spriteSheet || !spriteInfo) return null;

  const style = getChessPieceStyle(piece.pieceType, spriteSheet);

  return (
    <div
      className="chess-piece"
      style={style}
    />
  );
}
