import "./styles.css" 
import Square from "../Square";
import {useState} from "react";
import type { SquareDTO } from "../../../models/Chess/SquareDTO";
import type { BoardDTO } from "../../../models/Chess/BoardDTO";
import { getBoardColorSchemeById } from "../../../services/boardColorScheme-service";



type Prop ={
  boardInfo:BoardDTO;
}



export default function ChessBoard({ boardInfo } : Prop)

 {
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Fallback to default colors if no custom color scheme is passed
  const scheme = getBoardColorSchemeById(boardInfo.boardColorSchemeId) ;

  // Helper function to get the color of the square
  const getSquareColor = (rowIndex : number, colIndex : number, isSelected:boolean, isPossibleMove:boolean) =>{
    if (isSelected) {
      return (rowIndex + colIndex) % 2 === 0 ? scheme.highlightedWhite : scheme.highlightedBlack;
    }
    if (isPossibleMove) {
      return scheme.possibleMoveHighlight;
    }
    return (rowIndex + colIndex) % 2 === 0 ? scheme.white : scheme.black;
  };

  // Handle square click, setting the selected square's position
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    setSelectedSquare({ row: rowIndex, col: colIndex });
    console.log(`Square clicked at position: (${rowIndex}, ${colIndex})`);
  };


function createSquare(square:string,rowIndex:number,colIndex:number): JSX.Element{
  const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
  const isPossibleMove = boardInfo.possibleMoves[rowIndex][colIndex];
  const color = getSquareColor(rowIndex, colIndex, isSelected, isPossibleMove);

   const boardSquareInfo : SquareDTO = {
                content :square,
                squareColor:color,
                clickAction: () => handleSquareClick(rowIndex,colIndex),
                squareIsSelected:isSelected,
                squareIsPossibleMove:isPossibleMove,
                spriteSheetId:boardInfo.boardUsingPieceSpriteSheetId
              }
  return (
    <Square
      key={`${rowIndex}-${colIndex}`}
      squareInfo = { boardSquareInfo }
    />
  );  
}


  return (
    <div className="chess-board-container">
      <div
        className="chess-board"
        style={{
          gridTemplateColumns: `repeat(${boardInfo.board[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${boardInfo.board.length}, 1fr)`,
        }}
      >
        {boardInfo.board.map((row, rowIndex) => (
          row.map((square, colIndex) => {
            return createSquare(square,rowIndex,colIndex);
          })
        ))}
      </div>
    </div>
  );
};


