import "./styles.css" 
import Square from "../Square";
import {useEffect, useState, useCallback} from "react";
import type { SquareDTO } from "../../../models/Chess/SquareDTO";
import type { BoardDTO } from "../../../models/Chess/BoardDTO";
import { getBoardColorSchemeById } from "../../../services/boardColorScheme-service";
import type { PossibleMovesDto } from "../../../api/chessApi";
import type { ApiResult } from "../../../services/apiServices/chessGameState-api-service";
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";



type Prop ={
  boardInfo:BoardDTO;
}



export default function ChessBoard({ boardInfo } : Prop)

 {
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);

  // Fallback to default colors if no custom color scheme is passed
  const scheme = getBoardColorSchemeById(boardInfo.boardColorSchemeId) ;

  // Extract the callback function to satisfy React Compiler
  const { changePossibleMovesAction } = boardInfo;

  const loadPossibleMoves = useCallback(async (row: number, col: number) => {
    const result = await gameStateApiService.getPossibleMovesAtPosition(row, col);
    if (result.success) {
      // Call the callback to update possible moves in the parent component
      changePossibleMovesAction(result.data.possibleMoves);
    } else {
      console.error("Failed to load possible moves:", result.error.message);
      // You can also show a toast/notification to the user here
      alert(`Error: ${result.error.message}`);
    }
  }, [changePossibleMovesAction]);

  useEffect(() => {
    if (selectedSquare !== null) {
      loadPossibleMoves(selectedSquare.row, selectedSquare.col);
    }
  }, [selectedSquare, loadPossibleMoves]);



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


