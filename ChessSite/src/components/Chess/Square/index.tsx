import './styles.css';  // CSS file for individual square styling
import ChessPiece from '../Piece';
import type { SquareDTO } from '../../../models/Chess/Board/SquareDTO';
import type { PieceInformationDTO } from '../../../models/Chess/Piece/PieceInfoDTO';
import { useState } from 'react';
import { PieceColor, PieceType } from '../../../api/chessApi';

type Prop ={
  squareInfo:SquareDTO;
}

// Square component
const Square = ({squareInfo} : Prop) => {

  const [showPromotionPopup,setShowPromotionPopup] = useState<boolean>(false);


  useState( () => {



  } );



  function handlePromotionChoice(piece:PieceType)
  {
    setShowPromotionPopup(false);
    squareInfo.onPromote(squareInfo.squareChessNotation,piece);
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

  function getPlayerColorFromSquareContent() : PieceColor
  {
    const content = squareInfo.content;
    return content === content.toUpperCase() ? PieceColor.White : PieceColor.Black;

  }


  function createPieceOfType(type:string)
  {
    
    const pieceInfo : PieceInformationDTO ={
      pieceType: type,
      spriteSheetId:squareInfo.spriteSheetId
    }
    return <ChessPiece piece={pieceInfo}/>
  }
  function getPieceTypeCharNotation(piece:PieceType)
  {
    const playerColor = getPlayerColorFromSquareContent();

    switch(piece)
    {
      case PieceType.Bishop:
        return playerColor == PieceColor.White ? 'B':'b';
        break;

      case PieceType.Knight:
        return playerColor == PieceColor.White ? 'N':'n';
        break;

      case PieceType.Rook:
        return playerColor == PieceColor.White ? 'R':'r';
        break;

      case PieceType.Queen:
        return playerColor == PieceColor.White ? 'Q':'q';
        break;
    }

    return ' ';
  }

  function createPopUpButtonOfPieceType(pieceType:PieceType)
  {
    const pieceChar = getPieceTypeCharNotation(pieceType);
    return <button onClick={() => handlePromotionChoice(pieceType)}>
             {createPieceOfType(pieceChar)}
           </button>

  }


  return (    
    <div
      className={` square
                 ${squareInfo.squareIsSelected ? 'selected' : ''} 
                 ${squareInfo.squareIsPossibleMove ? 'possible-move' : ''}
                 ${squareInfo.isPromotingSquare ? 'promotion-square' : ''}`}

      style={  { backgroundColor: squareInfo.squareColor , color: squareInfo.squareNotationColor }}
      
      onClick={handleSquareClick} // Attach click handler
    >
      {squareInfo.isPromotingSquare && showPromotionPopup &&(
        <div className="promotion-popup">
          {createPopUpButtonOfPieceType(PieceType.Bishop)}
          {createPopUpButtonOfPieceType(PieceType.Knight)}
          {createPopUpButtonOfPieceType(PieceType.Rook)}
          {createPopUpButtonOfPieceType(PieceType.Queen)}
        </div> 
      )}
      {
        squareInfo.isAFileSquare  && (
          <div className='square-rank-notation'> {squareInfo.squareChessNotation[1]}  </div>
        )
      }
      {
        squareInfo.is1RankSquare  && (
          <div className='square-file-notation'> {squareInfo.squareChessNotation[0]} </div>
        )
      }
      {
        squareInfo.isPromotingSquare && !showPromotionPopup && (
          <div className='promotion-trigger'> ⚠️ </div>
        )
      }
      
      <div className="piece">
          {createPieceOfType(squareInfo.content)}
      </div>
    </div>
  );
};

export default Square;
