import "./styles.css"
import ChessPiece from "../../Chess/Piece";
import type { PieceInformationDTO } from "../../../models/Chess/PieceInfoDTO";
import type { PieceSetCardDTO } from "../../../models/ConfigurationModels/SpriteSheetConfigDTO";

type Prop={
    spriteSheetInfo: PieceSetCardDTO;
}

export default function PieceSetCard({spriteSheetInfo} : Prop){

    const pieceInfo : PieceInformationDTO = {
        pieceType : 'k',
        spriteSheetId:spriteSheetInfo.spriteSheetId
    }

   
    //    console.log( "Piece " + spriteSheetInfo.spriteSheetId);


     return (
        <div
          className={`cs-container-flex-between-center piece-set-card ${spriteSheetInfo.isSelected ? 'selected' : ''}`}
          onClick={() => spriteSheetInfo.onClick(spriteSheetInfo.spriteSheetId)} // When card is clicked, call onClick function
        >
            <div className="piece-set-card-title">
                <h3>{spriteSheetInfo.spriteSheetName}</h3>
            </div>
            <div className="piece-set-chessBoard">
                <ChessPiece piece={pieceInfo} />  
            </div>
        </div>
    
      );
};
