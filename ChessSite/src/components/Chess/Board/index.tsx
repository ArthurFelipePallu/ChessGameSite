import "./styles.css" 
import Square from "../Square";
import toChessNotation from "../../../utils/Boards";
import {useEffect, useState, useCallback} from "react";
import type { BoardDTO } from "../../../models/Chess/Board/BoardDTO";
import type { SquareDTO } from "../../../models/Chess/Board/SquareDTO";
import { x8_noPossiblePositionsFenString } from "../../../utils/Boards";
import { getBoardColorSchemeById } from "../../../services/boardColorScheme-service";
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";

type Prop ={
  boardInfo:BoardDTO;
}



export default function ChessBoard({ boardInfo } : Prop)

 {
  const [selectedFromSquare, setSelectedFromSquare] = useState<{ row: number; col: number } | null>(null);

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
  //   if(selectedFromSquare === null)
  //     changePossibleMovesAction(x8_noPossiblePositionsFenString);

    if (selectedFromSquare !== null) {
      loadPossibleMoves(selectedFromSquare.row, selectedFromSquare.col);
    }
  }, [selectedFromSquare, loadPossibleMoves, changePossibleMovesAction]);


  const tryAndExecuteMovement = useCallback((targetRow: number, targetCol: number) =>{

    if(selectedFromSquare !==null)
    {
      const fromSquare = toChessNotation(selectedFromSquare.row,selectedFromSquare.col);
      const toSquare = toChessNotation(targetRow, targetCol);
      executeMove(fromSquare,toSquare);
      setSelectedFromSquare(null);

      return;
    }
  }, [selectedFromSquare, executeMove]);

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

const isPromotingSquare= (promotingSquare: string,squareNotation:string): boolean => 
  {
    if(promotingSquare == squareNotation) {
      console.log(promotingSquare);
      console.log(squareNotation);
    }
    return promotingSquare == squareNotation
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
        console.log("TRIED TO EXECUTE MOVEMENT");
        tryAndExecuteMovement(rowIndex, colIndex);
        return;
      }
      else // If it's not a possible move for the currently selected piece
      {
        // Assume user wants to select a new piece (or clear if empty/opponent piece, handled by API/parent)
        setSelectedFromSquare({ row: rowIndex, col: colIndex }); 
        // Immediately clear possible moves to prevent visual flicker before API response
        changePossibleMovesAction(x8_noPossiblePositionsFenString); 
        return;
      }
    }

    //console.log(`Square clicked at position: (${rowIndex}, ${colIndex})`);
  };


function createSquare(square:string,rowIndex:number,colIndex:number): JSX.Element{
  const isSelected = selectedFromSquare?.row === rowIndex && selectedFromSquare?.col === colIndex;
  const isPossibleMove = boardInfo.possibleMoves[rowIndex][colIndex];
  const notation = toChessNotation(rowIndex,colIndex);
  const color = getSquareColor(rowIndex, colIndex, isSelected, isPossibleMove);

   const boardSquareInfo : SquareDTO = {
                content :square,
                squareChessNotation:notation,
                squareColor:color,
                clickAction: () => handleSquareClick(rowIndex,colIndex),
                squareIsSelected:isSelected,
                squareIsPossibleMove:isPossibleMove,
                spriteSheetId:boardInfo.boardUsingPieceSpriteSheetId,
                isPromotingSquare: isPromotingSquare(boardInfo.promotingSquare,notation),
                onPromote:boardInfo.promotePieceFromSquareToPiece
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


