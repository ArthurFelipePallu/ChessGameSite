import './styles.css';  // CSS file for individual square styling
import ChessPiece from '../Piece';
import type { SquareDTO } from '../../../models/Chess/Board/SquareDTO';
import type { PieceInformationDTO } from '../../../models/Chess/Piece/PieceInfoDTO';
import { useState } from 'react';
import { PieceType } from '../../../api/chessApi';

type Prop ={
  squareInfo:SquareDTO;
}

// Square component
const Square = ({squareInfo} : Prop) => {

  const [showPromotionPopup,setShowPromotionPopup] = useState<boolean>(false);

  function handlePromotionChoice(piece:PieceType)
  {
    setShowPromotionPopup(false);
    squareInfo.onPromote(squareInfo.squareChessNotation,piece);
  }

  const pieceInfo : PieceInformationDTO ={
    pieceType: squareInfo.content,
    spriteSheetId:squareInfo.spriteSheetId
  }

  function handleSquareClick()
  {

    if(squareInfo.isPromotingSquare)
    {
      setShowPromotionPopup(true);
    }
    else 
      squareInfo.clickAction();
  }

  // function getPieceInfoOfType(piece : PieceType): PieceInformationDTO
  // {
  //   return {
  //     pieceType: squareInfo.content,
  //     spriteSheetId:squareInfo.spriteSheetId
  //   }
  // }

  // return (

    
  //   <div
  //     className={` square
  //                ${squareInfo.squareIsSelected ? 'selected' : ''} 
  //                ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}`}

  //     style={  { backgroundColor: squareInfo.squareColor }}
      
  //     onClick={handleSquareClick} // Attach click handler
  //   >
  //     <div className="piece ${}">
  //       {/* {getPieceIconByKey(squareInfo.content)} */}
  //       <ChessPiece piece={pieceInfo}/>
  //       </div> {/* Render the piece */}
  //   </div>
  // );


  return (    
    <div
      className={` square
                 ${squareInfo.squareIsSelected ? 'selected' : ''} 
                 ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}
                 ${squareInfo.isPromotingSquare ? 'promotion-square' : ''}`}

      style={  { backgroundColor: squareInfo.squareColor }}
      
      onClick={handleSquareClick} // Attach click handler
    >
      {squareInfo.isPromotingSquare && showPromotionPopup &&(
        <div className="promotion-popup">
          <button onClick={() => handlePromotionChoice(PieceType.Bishop)}>B</button>
          <button onClick={() => handlePromotionChoice(PieceType.Knight)}>N</button>
          <button onClick={() => handlePromotionChoice(PieceType.Rook)}  >R</button>
          <button onClick={() => handlePromotionChoice(PieceType.Queen)} >Q</button>
        </div> 
      )}
      {
        squareInfo.isPromotingSquare && !showPromotionPopup && (
          <div className='promotion-trigger'> ⚠️ </div>
        )
      }
      <div className="piece">
          <ChessPiece piece={pieceInfo}/>
        </div>
    </div>
  );
};

export default Square;
