import "./styles.css"
import ChessPiece from "../../Chess/Piece";
import type { SpriteSheetCardDTO } from "../../../models/ConfigurationModels/SpriteSheetConfigDTO";


type Prop={
    spriteSheetInfo: SpriteSheetCardDTO;
}

export default function PieceSetCard({spriteSheetInfo} : Prop){

    

    <div
      className={`cs-container-flex-between-center color-scheme-card ${spriteSheetInfo.isSelected ? 'selected' : ''}`}
      onClick={() => spriteSheetInfo.onClick(spriteSheetInfo.spriteSheetId)} // When card is clicked, call onClick function
    >
        <div className="color-scheme-card-title">
            <h3>{spriteSheetInfo.spriteSheetName}</h3>
        </div>
        <div className="color-scheme-chessBoard">
            <div className="piece">
                    <ChessPiece piece={"P"}/>
            </div> {/* Render the piece */}
        </div>
            
        
    </div>

 
};
