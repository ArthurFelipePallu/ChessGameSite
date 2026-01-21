import "./styles.css"
import ChessBoard from "../../Chess/Board";
import type { BoardDTO } from "../../../models/Chess/BoardDTO";
import type { PieceSetCardDTO } from "../../../models/ConfigurationModels/SpriteSheetConfigDTO";
import { x1_Board , x1_defaultPossiblePositions } from '../../../utils/Boards';


type Prop={
    spriteSheetInfo: PieceSetCardDTO;
}

export default function PieceSetCard({spriteSheetInfo} : Prop){

    const cardBoard : BoardDTO = {
        board : x1_Board,
        possibleMoves : x1_defaultPossiblePositions,
        boardColorSchemeId : spriteSheetInfo.spriteSheetId
    }



     return (
        <div
          className={`cs-container-flex-between-center color-scheme-card ${spriteSheetInfo.isSelected ? 'selected' : ''}`}
          onClick={() => spriteSheetInfo.onClick(spriteSheetInfo.spriteSheetId)} // When card is clicked, call onClick function
        >
            <div className="color-scheme-card-title">
                <h3>{spriteSheetInfo.spriteSheetName}</h3>
            </div>
            <div className="color-scheme-chessBoard">
                <ChessBoard
                    boardInfo={cardBoard}
                /> 
            </div>
        </div>
    
      );
};
