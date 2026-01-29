import './styles.css';  // CSS file for individual square styling
import ChessPiece from '../Piece';
import type { SquareDTO } from '../../../models/Chess/Board/SquareDTO';
import type { PieceInformationDTO } from '../../../models/Chess/Piece/PieceInfoDTO';


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
      className={` square
                 ${squareInfo.squareIsSelected ? 'selected' : ''} 
                 ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}`}

      style={  { backgroundColor: squareInfo.squareColor }}
      
      onClick={squareInfo.clickAction} // Attach click handler
    >
      <div className="piece ${}">
        {/* {getPieceIconByKey(squareInfo.content)} */}
        <ChessPiece piece={pieceInfo}/>
        </div> {/* Render the piece */}
    </div>
  );
};

export default Square;
