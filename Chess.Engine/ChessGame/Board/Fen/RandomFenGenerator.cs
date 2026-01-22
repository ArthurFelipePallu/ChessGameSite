namespace Chess.Engine.ChessGame.Board.Fen;

public class Fen
{
    
}

class RandomFenGenerator
{
    static Random random = new Random();

    public static string GenerateRandomFen()
    {
        // Initialize an empty 8x8 board
        var board = new string[8, 8];
        
        // Fill the board with empty squares
        for (var i = 0; i < 8; i++)
        {
            for (var j = 0; j < 8; j++)
            {
                board[i, j] = " ";
            }
        }

        // Place pawns
        PlacePawns(board);

        // Place back-rank pieces (rooks, knights, bishops, queens, kings)
        PlacePieces(board, "R", "N", "B", "Q", "K", 0); // White's back rank (row 0)
        PlacePieces(board, "r", "n", "b", "q", "k", 7); // Black's back rank (row 7)

        // Randomly place knights, bishops, rooks, etc., in the middle ranks (rows 1-6)
        RandomlyPlacePieces(board);

        // Generate the board FEN string
        var boardFEN = GenerateBoardFEN(board);

        // Random turn (w or b)
        var turn = random.NextDouble() < 0.5 ? "w" : "b";

        // Random castling rights (KQkq)
        var castlingRights = GenerateRandomCastlingRights();

        // Random en passant (empty square or valid target)
        var enPassant = random.NextDouble() < 0.1 ? GenerateRandomEnPassant() : "-";

        // Random halfmove clock (arbitrary between 0 and 50)
        var halfMoveClock = random.Next(51);

        // Random fullmove number (arbitrary, starting from 1)
        int fullMoveNumber = random.Next(1, 201);

        // Return the complete FEN string
        return $"{boardFEN} {turn} {castlingRights} {enPassant} {halfMoveClock} {fullMoveNumber}";
    }

    // Place pawns in their correct positions
    private static void PlacePawns(string[,] board)
    {
        for (var i = 0; i < 8; i++)
        {
            board[1, i] = "P";  // White pawns
            board[6, i] = "p";  // Black pawns
        }
    }

    // Randomly place pieces for a player on a given row
    private static void PlacePieces(string[,] board, string rook, string knight, string bishop, string queen, string king, int row)
    {
        // Place rooks, knights, bishops, queens, kings in random spots (first row for white, last row for black)
        var pieceOrder = new string[] { rook, knight, bishop, queen, king };

        foreach (var t in pieceOrder)
        {
            var col = random.Next(8);
            while (board[row, col] != " ")
            {
                col = random.Next(8);  // Find an empty spot
            }
            board[row, col] = t;
        }
    }

    // Randomly place remaining pieces in the middle ranks (rows 1-6)
    private static void RandomlyPlacePieces(string[,] board)
    {
        for (var row = 1; row <= 6; row++)
        {
            for (var col = 0; col < 8; col++)
            {
                if (!(random.NextDouble() < 0.1)) continue;
                var piece = GetRandomPiece();
                board[row, col] = piece;
            }
        }
    }

    // Generate the board FEN string (converts board array to FEN format)
    private static string GenerateBoardFEN(string[,] board)
    {
        var boardFen = "";

        for (var i = 0; i < 8; i++)
        {
            var emptySquares = 0;
            for (var j = 0; j < 8; j++)
            {
                if (board[i, j] == " ")
                {
                    emptySquares++;
                }
                else
                {
                    if (emptySquares > 0)
                    {
                        boardFen += emptySquares.ToString();
                        emptySquares = 0;
                    }
                    boardFen += board[i, j];
                }
            }
            if (emptySquares > 0)
            {
                boardFen += emptySquares.ToString();
            }
            if (i < 7) boardFen += "/";
        }

        return boardFen;
    }

    // Generate random castling rights
    private static string GenerateRandomCastlingRights()
    {
        var castling = "";
        if (random.NextDouble() < 0.5) castling += "K"; // White king-side
        if (random.NextDouble() < 0.5) castling += "Q"; // White queen-side
        if (random.NextDouble() < 0.5) castling += "k"; // Black king-side
        if (random.NextDouble() < 0.5) castling += "q"; // Black queen-side
        return castling.Length > 0 ? castling : "-";
    }

    // Generate a random en passant square or return '-'
    private static string GenerateRandomEnPassant()
    {
        var possibleSquares = new[] { "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3" };
        return possibleSquares[random.Next(possibleSquares.Length)];
    }

    // Get a random piece (for non-pawn pieces)
    private static string GetRandomPiece()
    {
        string[] pieces = ["r", "n", "b", "q", "k", "R", "N", "B", "Q", "K"];
        return pieces[random.Next(pieces.Length)];
    }
}
