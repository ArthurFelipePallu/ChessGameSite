import "./styles.css" 
import Square from "../Square";
import {useState} from "react";
import type { SquareDTO } from "../../../models/Chess/SquareDTO";
import type { BoardDTO } from "../../../models/Chess/BoardDTO";
import { getBoardColorSchemeById } from "../../../utils/BoardColorSchemes";

type Prop ={
  boardInfo:BoardDTO;
}



export default function ChessBoard({ boardInfo } : Prop)

 {
  const [selectedSquare, setSelectedSquare] = useState(null);


const defaultSquare : SquareDTO = {
                          content :"P",
                          squareColor:'#aad9d8',
                          clickAction: () => ({}),
                          squareIsSelected:false,
                          squareIsPossibleMove:false
}

  // Default colors if no color scheme is provided
  const defaultColorScheme = {
    white: '#f0d9b5',
    black: '#b58863',
    highlightedWhite: '#aad9d8',
    highlightedBlack: '#7f6f4f',
    possibleMoveHighlight: '#90ee90',
  };

  // Fallback to default colors if no custom color scheme is passed
  const {
    white,
    black,
    highlightedWhite,
    highlightedBlack,
    possibleMoveHighlight,
  } = getBoardColorSchemeById(boardInfo.boardColorSchemeId) || defaultColorScheme;

  // Helper function to get the color of the square
  const getSquareColor = (rowIndex : number, colIndex : number, isSelected:boolean, isPossibleMove:boolean) =>{
    if (isSelected) {
      return (rowIndex + colIndex) % 2 === 0 ? highlightedWhite : highlightedBlack;
    }
    if (isPossibleMove) {
      return possibleMoveHighlight;
    }
    return (rowIndex + colIndex) % 2 === 0 ? white : black;
  };

  // Handle square click, setting the selected square's position
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    setSelectedSquare({ row: rowIndex, col: colIndex });
    console.log(`Square clicked at position: (${rowIndex}, ${colIndex})`);
  };


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
            const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
            const isPossibleMove = boardInfo.possibleMoves[rowIndex][colIndex];
            const color = getSquareColor(rowIndex, colIndex, isSelected, isPossibleMove);

             const boardSquareInfo : SquareDTO = {
                          content :square,
                          squareColor:color,
                          clickAction: () => handleSquareClick(rowIndex,colIndex),
                          squareIsSelected:isSelected,
                          squareIsPossibleMove:isPossibleMove

                        }


            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                
                squareInfo = { boardSquareInfo }
              />
            );
          })
        ))}
      </div>
    </div>
  );
};


