using Chess_Console_Project.Board;
using Chess_Console_Project.Board.Exceptions;
using Chess.Core.Enums;
using Chess.Engine.Board.Pieces;

namespace Chess.Engine.Board;

public static class BoardExtensions
{



    /// <summary>
    /// CREATE BOARD
    /// </summary>
    public static void CreateChessBoardInitialPosition(this ChessBoard board)
    {
        try
        {
            board.CreateBlackPiecesInitialPosition();
            board.CreateWhitePiecesInitialPosition();
        }
        catch (BoardException e)
        {
            Console.WriteLine(e.Message);
        }
    }

    private static void CreateBlackPiecesInitialPosition(this ChessBoard board)
    {
        board.AddPlayingPiece(PieceColor.Black, PieceType.Rook, 'a', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Knight, 'b', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Bishop, 'c', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Queen, 'd', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.King, 'e', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Bishop, 'f', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Knight, 'g', 8);
        board.AddPlayingPiece(PieceColor.Black, PieceType.Rook, 'h', 8);

        for (var i = 0; i < board.MaxChessBoardSize; i++)
        {
            board.AddPlayingPiece(PieceColor.Black, PieceType.Pawn, (char)(i + 65), 7);
        }
    }

    private static void CreateWhitePiecesInitialPosition(this ChessBoard board)
    {
        board.AddPlayingPiece(PieceColor.White, PieceType.Rook, 'a', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Knight, 'b', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Bishop, 'c', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Queen, 'd', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.King, 'e', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Bishop, 'f', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Knight, 'g', 1);
        board.AddPlayingPiece(PieceColor.White, PieceType.Rook, 'h', 1);

        for (var i = 0; i < board.MaxChessBoardSize; i++)
        {
            board.AddPlayingPiece(PieceColor.White, PieceType.Pawn, (char)(i + 65), 2);
        }
    }


    /// <summary>
    /// FEN EXTENSIONS
    /// </summary>


    /// <summary>
    /// Converts the board to FEN notation
    /// </summary>
    public static string ToFen(
        this ChessBoard board,
        PieceColor activeColor,
        int halfmoveClock = 0,
        int fullmoveNumber = 1)
    {
        return FenHelper.ToFen(board, activeColor, halfmoveClock, fullmoveNumber);
    }

    /// <summary>
    /// Creates a board from FEN notation
    /// </summary>
    public static ChessBoard FromFen(string fen)
    {
        return FenHelper.FromFen(fen);
    }

    /// <summary>
    /// Loads board position from FEN notation (clears existing pieces first)
    /// </summary>
    public static void LoadFromFen(this ChessBoard board, string fen)
    {
        // Clear existing board
        var piecesToRemove = new List<Piece>();
        for (var i = 0; i < board.MaxChessBoardSize; i++)
        {
            for (var j = 0; j < board.MaxChessBoardSize; j++)
            {
                var piece = board.AccessPieceAtCoordinates(i, j);
                if (piece != null)
                {
                    piecesToRemove.Add(piece);
                }
            }
        }

        foreach (var piece in piecesToRemove)
        {
            board.RemovePieceFromPlay(piece);
        }

        // Load new position
        var newBoard = FenHelper.FromFen(fen);

        // Copy pieces from new board to current board
        for (var i = 0; i < board.MaxChessBoardSize; i++)
        {
            for (var j = 0; j < board.MaxChessBoardSize; j++)
            {
                var piece = newBoard.AccessPieceAtCoordinates(i, j);
                if (piece != null)
                {
                    var pos = ChessNotationPosition.FromArrayIndices(i, j);
                    board.AddPlayingPiece(
                        piece.GetPieceColor(),
                        piece.GetPieceType(),
                        pos.Col,
                        pos.Row);

                    // Restore piece movement count if needed
                    var addedPiece = board.AccessPieceAtChessNotationPosition(pos);
                    if (addedPiece != null && piece.TimesMoved > 0)
                    {
                        for (var k = 0; k < piece.TimesMoved; k++)
                        {
                            addedPiece.IncreaseTimesMoved();
                        }
                    }
                }
            }
        }
    }
}