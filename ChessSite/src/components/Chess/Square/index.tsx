import './styles.css';  // CSS file for individual square styling
import { getPieceIconByKey } from '../../../utils/pieceIcons';
import type { SquareDTO } from '../../../models/Chess/SquareDTO';


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
      <div className="piece">{getPieceIconByKey(squareInfo.content)}</div> {/* Render the piece */}
    </div>
  );
};

export default Square;
