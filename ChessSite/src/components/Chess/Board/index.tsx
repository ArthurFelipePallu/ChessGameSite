import "./styles.css" 
import Square from "../Square";
import React , {useState} from "react";






export default function ChessBoard({ board, possibleMoves, BoardColorScheme })

 {
  const [selectedSquare, setSelectedSquare] = useState(null);

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
  } = BoardColorScheme || defaultColorScheme;

  // Helper function to get the color of the square
  const getSquareColor = (rowIndex, colIndex, isSelected, isPossibleMove) =>{
    if (isSelected) {
      return (rowIndex + colIndex) % 2 === 0 ? highlightedWhite : highlightedBlack;
    }
    if (isPossibleMove) {
      return possibleMoveHighlight;
    }
    return (rowIndex + colIndex) % 2 === 0 ? white : black;
  };

  // Handle square click, setting the selected square's position
  const handleSquareClick = (rowIndex, colIndex) => {
    setSelectedSquare({ row: rowIndex, col: colIndex });
    console.log(`Square clicked at position: (${rowIndex}, ${colIndex})`);
  };

  return (
    <div className="chess-board-container">
      <div
        className="chess-board"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) => (
          row.map((square, colIndex) => {
            const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
            const isPossibleMove = possibleMoves[rowIndex][colIndex];
            const color = getSquareColor(rowIndex, colIndex, isSelected, isPossibleMove);

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={square}
                color={color}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                isSelected={isSelected}
                isPossibleMove={isPossibleMove}
                possibleMoveHighlight={possibleMoveHighlight}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};


