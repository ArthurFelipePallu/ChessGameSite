import "./styles.css" 
import Square from "../Square";
import toChessNotation from "../../../utils/Boards";
import {useEffect, useState, useCallback} from "react";
import type { SquareDTO } from "../../../models/Chess/SquareDTO";
import type { BoardDTO } from "../../../models/Chess/BoardDTO";
import { getBoardColorSchemeById } from "../../../services/boardColorScheme-service";
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";
import { x8_noPossiblePositionsFenString } from "../../../utils/Boards";

type Prop ={
  boardInfo:BoardDTO;
}



export default function ChessBoard({ boardInfo } : Prop)

 {
  const [selectedFromSquare, setSelectedFromSquare] = useState<{ row: number; col: number } | null>(null);
  const [selectedToSquare, setSelectedToSquare] = useState<{ row: number; col: number } | null>(null);

  // Fallback to default colors if no custom color scheme is passed
  const scheme = getBoardColorSchemeById(boardInfo.boardColorSchemeId) ;

  // Extract the callback function to satisfy React Compiler
  const { executeMove } = boardInfo;
  const { changePossibleMovesAction } = boardInfo;
  const { verifyPositionIsInPossibleMoves } = boardInfo;

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
    if(selectedFromSquare === null)
      changePossibleMovesAction(x8_noPossiblePositionsFenString);

    if (selectedFromSquare !== null) {
      loadPossibleMoves(selectedFromSquare.row, selectedFromSquare.col);
    }
  }, [selectedFromSquare, loadPossibleMoves, changePossibleMovesAction]);


  const tryAndExecuteMovement = () =>{

    if(selectedFromSquare !==null && selectedToSquare !== null)
    {
      const fromSquare = toChessNotation(selectedFromSquare.row,selectedFromSquare.col);
      const toSquare = toChessNotation(selectedToSquare.row,selectedToSquare.col);
      executeMove(fromSquare,toSquare);
      setSelectedFromSquare(null);
      setSelectedToSquare(null);

      return;
    }
  }

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
  const handleSquareClick = async (rowIndex: number, colIndex: number) => {

    if(selectedFromSquare === null)
    {
      setSelectedFromSquare({ row: rowIndex, col: colIndex });
      return;
    }
    else if(selectedFromSquare?.row == rowIndex && selectedFromSquare?.col == colIndex)
    {
      setSelectedFromSquare(null);
      return;
    }
    else
    {
      if(verifyPositionIsInPossibleMoves(rowIndex,colIndex)) // é um quadrado nos movimentos possiveis
      {
        setSelectedToSquare({ row: rowIndex, col: colIndex });
        tryAndExecuteMovement();
        return;
      }
      else
      {
        setSelectedFromSquare(null);
      }
    }

    //console.log(`Square clicked at position: (${rowIndex}, ${colIndex})`);
  };


function createSquare(square:string,rowIndex:number,colIndex:number): JSX.Element{
  const isSelected = selectedFromSquare?.row === rowIndex && selectedFromSquare?.col === colIndex;
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


