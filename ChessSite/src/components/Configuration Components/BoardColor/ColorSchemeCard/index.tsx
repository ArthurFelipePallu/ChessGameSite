import "./styles.css"
import ChessBoard from "../../../Chess/Board";
import type { BoardDTO } from "../../../../models/Chess/BoardDTO";
import { x2_Board , x2_defaultPossiblePositions } from '../../../../utils/Boards';
import { type BoardColorSchemeCardDTO } from "../../../../models/ConfigurationModels/BoardColorSchemeDTO";

type Prop={
    colorScheme: BoardColorSchemeCardDTO;
}

export default function BoardColorSchemeCard({colorScheme} : Prop){

    const cardBoard : BoardDTO = {
        board: x2_Board,
        possibleMoves: x2_defaultPossiblePositions,
        boardColorSchemeId: colorScheme.schemeId,
        boardUsingPieceSpriteSheetId: ""
    }


  return (
    <div
      className={`cs-container-flex-between-center color-scheme-card ${colorScheme.isSelected ? 'selected' : ''}`}
      onClick={() => colorScheme.onClick(colorScheme.schemeId)} // When card is clicked, call onClick function
    >
        <div className="color-scheme-card-title">
            <h3>{colorScheme.schemeName}</h3>
        </div>
        <div className="color-scheme-chessBoard">
            <ChessBoard
                boardInfo={cardBoard}
            /> 
        </div>
    </div>

  );
};
