




export default function TurnFenToBoard(fen: string): string[][] {
    // Initialize an empty 8x8 board
    const board: string[][] = Array(8).fill(null).map(() => Array(8).fill(''));
    let rowIndex = 0;

    // Split the FEN string by rows
    const rows = fen.split('/');

    // Iterate through each row in the FEN string
    rows.forEach((row) => {
        let colIndex = 0;

        // Iterate through each character in the row
        for (let i = 0; i < row.length; i++) {
            const char = row[i];

            if (isCharInteger(char)) {
                // It's a number, indicating empty squares
                const emptySquares = Number(char);
                for (let j = 0; j < emptySquares; j++) {
                    board[rowIndex][colIndex] = '';  // Empty square
                    colIndex++;
                }
            } else {
                // It's a piece (e.g., 'r', 'P', 'K')
                board[rowIndex][colIndex] = char;
                colIndex++;
            }
        }

        // Move to the next row
        rowIndex++;
    });

    return board;
}

// Function to check if a character is a number
function isCharInteger(c: string): boolean {
    return /^\d$/.test(c); // Matches single digits (0-9)
}
