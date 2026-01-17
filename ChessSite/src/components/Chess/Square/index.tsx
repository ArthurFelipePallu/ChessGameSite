import './styles.css';  // CSS file for individual square styling


// Square component
const Square = ({ piece, color, onClick, isSelected, isPossibleMove, possibleMoveHighlight }) => {
  const pieceIcons = {
    'p': '♟', 
    'b': '♝', 
    'n': '♞', 
    'r': '♜',
    'q': '♛', 
    'k': '♚', 
    ' ': ' ',  // Empty square
    'P': '♙', 
    'B': '♗', 
    'N': '♘', 
    'R': '♖',
    'Q': '♕', 
    'K': '♔', 
  };

  return (
    <div
      className={`square ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick} // Attach click handler
    >
      <div className="piece">{pieceIcons[piece]}</div> {/* Render the piece */}
    </div>
  );
};

export default Square;
