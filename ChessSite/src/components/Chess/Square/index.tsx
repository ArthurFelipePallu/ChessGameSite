import './styles.css';  // CSS file for individual square styling
import type { SquareDTO } from '../../../models/Chess/SquareDTO';
// import { getPieceIconByKey } from '../../../services/pieceIcons-service';
import ChessPiece from '../Piece';

type Prop ={
  squareInfo:SquareDTO;
}

// Square component
const Square = ({squareInfo} : Prop) => {

  return (
    <div
      className={`square ${squareInfo.squareIsSelected ? 'selected' : ''} ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}`}
      style={{ backgroundColor: squareInfo.squareColor }}
      onClick={squareInfo.clickAction} // Attach click handler
    >
      <div className="piece">
        {/* {getPieceIconByKey(squareInfo.content)} */}
        <ChessPiece piece={squareInfo.content}/>
        </div> {/* Render the piece */}
    </div>
  );
};

export default Square;
