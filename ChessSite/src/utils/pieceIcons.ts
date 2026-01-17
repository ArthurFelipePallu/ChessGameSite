 const pieceIcons = {
    'p': '♟',
    'b': '♝', 
    'n': '♞', 
    'r': '♜',
    'q': '♛', 
    'k': '♚', 
    ' ': '',  // Empty square
    'P': '♙',
    'B': '♗', 
    'N': '♘', 
    'R': '♖',
    'Q': '♕', 
    'K': '♔', 
  };

export const getChessPieceIcon = (piece : string)  =>{

    return pieceIcons[piece];

}