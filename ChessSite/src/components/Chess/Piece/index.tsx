import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import { useContext } from "react";
import { getChessPieceStyleFromSpritesheet } from "../../../services/pieceSpriteSheet-service";

export default function ChessPiece({ piece }: { piece: string }) {
  
  const {contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);
      
  return (
        <div
            className="chess-piece"
            style={getChessPieceStyleFromSpritesheet(piece,contextSelectedPiecesSpriteSheetId)}
        />
        );
}
