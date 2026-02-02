import "./styles.css"
import ChessBoard from "../../../Chess/Board";
import type { BoardDTO } from "../../../../models/Chess/Board/BoardDTO";
import { x2_Board , x2_defaultPossiblePositions } from '../../../../utils/Boards';
import { type BoardColorSchemeCardDTO } from "../../../../models/ConfigurationModels/BoardColorSchemeDTO";
import { BooleanFenToBooleanArray } from "../../../../utils/Fen";

type Prop={
    colorScheme: BoardColorSchemeCardDTO;
}

export default function BoardColorSchemeCard({colorScheme} : Prop){

    const cardBoard : BoardDTO = {
        board: x2_Board,
        possibleMoves: BooleanFenToBooleanArray(x2_defaultPossiblePositions,2,2,'x'),
        boardColorSchemeId: colorScheme.schemeId,
        boardUsingPieceSpriteSheetId: "",
        promotingSquare: "",
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
