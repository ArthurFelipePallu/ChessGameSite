import { useContext } from "react";
import { PieceType } from "../../../api/chessApi";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import "./styles.css"


type Prop ={
    handlePromotionChoice: ( piece : PieceType) => Promise<void>;
}

export default function PromotionPopup({handlePromotionChoice} : Prop)
{
    //const {contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);

    return(
        <div className="promotion-popup">
            <button onClick={() => handlePromotionChoice(PieceType.Bishop)}>B</button>
            <button onClick={() => handlePromotionChoice(PieceType.Knight)}>N</button>
            <button onClick={() => handlePromotionChoice(PieceType.Rook)}  >R</button>
            <button onClick={() => handlePromotionChoice(PieceType.Queen)} >Q</button>
        </div> 
    );
}