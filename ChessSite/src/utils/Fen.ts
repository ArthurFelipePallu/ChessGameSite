
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


export function booleanFenToBooleanArray(
                                        fen: string,
                                        rows: number,
                                        cols: number,
                                        trueChar: string = 'x'
                                        ): boolean[][] 
{
  if (trueChar.length !== 1 || /\d/.test(trueChar)) {
    throw new Error('trueChar must be a single non-digit character');
  }

  const result: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const ranks = fen.split('/');

  if (ranks.length !== rows) {
    throw new Error(`Invalid number of rows. Expected ${rows}`);
  }

  for (let r = 0; r < rows; r++) {
    let c = 0;

    for (const ch of ranks[r]) {
      if (/\d/.test(ch)) {
        c += Number(ch);
      } else if (ch === trueChar) {
        if (c >= cols) {
          throw new Error(`Column overflow at row ${r}`);
        }
        result[r][c] = true;
        c++;
      } else {
        throw new Error(`Invalid character '${ch}' in fen string`);
      }
    }

    if (c !== cols) {
      throw new Error(`Row ${r} does not sum to ${cols} columns`);
    }
  }

  return result;
}
