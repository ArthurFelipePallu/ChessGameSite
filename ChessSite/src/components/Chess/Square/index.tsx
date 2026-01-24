import './styles.css';  // CSS file for individual square styling
import type { SquareDTO } from '../../../models/Chess/SquareDTO';
// import { getPieceIconByKey } from '../../../services/pieceIcons-service';
import ChessPiece from '../Piece';
import type { PieceInformationDTO } from '../../../models/Chess/PieceInfoDTO';

type Prop ={
  squareInfo:SquareDTO;
}

// Square component
const Square = ({squareInfo} : Prop) => {

  const pieceInfo : PieceInformationDTO ={
    pieceType: squareInfo.content,
    spriteSheetId:squareInfo.spriteSheetId
  }


  return (
    <div
      className={`square ${squareInfo.squareIsSelected ? 'selected' : ''} ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}`}
      style={{ backgroundColor: squareInfo.squareColor }}
      onClick={squareInfo.clickAction} // Attach click handler
    >
      <div className="piece">
        {/* {getPieceIconByKey(squareInfo.content)} */}
        <ChessPiece piece={pieceInfo}/>
        </div> {/* Render the piece */}
    </div>
  );
};

export default Square;
