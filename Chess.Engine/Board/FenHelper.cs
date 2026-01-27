using Chess.Core.Enums;
using Chess.Engine.Board.Pieces;
using Chess_Console_Project.Board;
using Chess.Core.Exceptions;

namespace Chess.Engine.Board;

public static class FenHelper
{
    private const string StartingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    /// <summary>
    /// Converts the current board state to FEN notation
    /// </summary>
    public static string ToFen(
        ChessBoard board,
        PieceColor activeColor,
        int halfmoveClock = 0,
        int fullmoveNumber = 1)
    {
        var fenParts = new List<string>();

        // 1. Piece placement (ranks 8 to 1)
        fenParts.Add(GetPiecePlacement(board));

        // 2. Active color
        fenParts.Add(activeColor == PieceColor.White ? "w" : "b");

        // 3. Castling availability
        fenParts.Add(GetCastlingAvailability(board));

        // 4. En passant target square
        fenParts.Add(GetEnPassantTarget(board));

        // 5. Halfmove clock
        fenParts.Add(halfmoveClock.ToString());

        // 6. Fullmove number
        fenParts.Add(fullmoveNumber.ToString());

        return string.Join(" ", fenParts);
    }

    /// <summary>
    /// Gets the piece placement part of FEN (ranks 8-1)
    /// </summary>
    public static string GetPiecePlacement(ChessBoard board)
    {
        var ranks = new List<string>();

        // FEN goes from rank 8 to rank 1 (top to bottom)
        for (var rank = 8; rank >= 1; rank--)
        {
            var rankString = "";
            var emptyCount = 0;

            // Files go from a to h (left to right)
            for (var file = 0; file < 8; file++)
            {
                var col = (char)('a' + file);
                var pos = new ChessNotationPosition(rank, col);
                var piece = board.AccessPieceAtChessNotationPosition(pos);

                if (piece == null)
                {
                    emptyCount++;
                }
                else
                {
                    if (emptyCount > 0)
                    {
                        rankString += emptyCount.ToString();
                        emptyCount = 0;
                    }
                    rankString += GetPieceFenChar(piece);
                }
            }

            // Add remaining empty squares
            if (emptyCount > 0)
            {
                rankString += emptyCount.ToString();
            }

            ranks.Add(rankString);
        }

        return string.Join("/", ranks);
    }

    /// <summary>
    /// Converts a piece to its FEN character representation
    /// </summary>
    private static char GetPieceFenChar(Piece piece)
    {
        var pieceType = piece.GetPieceType();
        var isWhite = piece.GetPieceColor() == PieceColor.White;

        return pieceType switch
        {
            PieceType.Pawn => isWhite ? 'P' : 'p',
            PieceType.Rook => isWhite ? 'R' : 'r',
            PieceType.Knight => isWhite ? 'N' : 'n',
            PieceType.Bishop => isWhite ? 'B' : 'b',
            PieceType.Queen => isWhite ? 'Q' : 'q',
            PieceType.King => isWhite ? 'K' : 'k',
            _ => throw new ChessException($"Unknown piece type: {pieceType}", ChessErrorCode.IllegalState)
        };
    }

    /// <summary>
    /// Gets castling availability (KQkq format)
    /// </summary>
    private static string GetCastlingAvailability(ChessBoard board)
    {
        var castling = "";

        // White castling rights
        var whiteKing = GetKingIfNotMoved(board, PieceColor.White);
        if (whiteKing != null)
        {
            // Check kingside rook (h1)
            var kingsideRook = board.AccessPieceAtChessNotationPosition(new ChessNotationPosition(1, 'h'));
            if (kingsideRook != null &&
                kingsideRook.GetPieceType() == PieceType.Rook &&
                kingsideRook.GetPieceColor() == PieceColor.White &&
                kingsideRook.TimesMoved == 0)
            {
                castling += "K";
            }

            // Check queenside rook (a1)
            var queensideRook = board.AccessPieceAtChessNotationPosition(new ChessNotationPosition(1, 'a'));
            if (queensideRook != null &&
                queensideRook.GetPieceType() == PieceType.Rook &&
                queensideRook.GetPieceColor() == PieceColor.White &&
                queensideRook.TimesMoved == 0)
            {
                castling += "Q";
            }
        }

        // Black castling rights
        var blackKing = GetKingIfNotMoved(board, PieceColor.Black);
        if (blackKing != null)
        {
            // Check kingside rook (h8)
            var kingsideRook = board.AccessPieceAtChessNotationPosition(new ChessNotationPosition(8, 'h'));
            if (kingsideRook != null &&
                kingsideRook.GetPieceType() == PieceType.Rook &&
                kingsideRook.GetPieceColor() == PieceColor.Black &&
                kingsideRook.TimesMoved == 0)
            {
                castling += "k";
            }

            // Check queenside rook (a8)
            var queensideRook = board.AccessPieceAtChessNotationPosition(new ChessNotationPosition(8, 'a'));
            if (queensideRook != null &&
                queensideRook.GetPieceType() == PieceType.Rook &&
                queensideRook.GetPieceColor() == PieceColor.Black &&
                queensideRook.TimesMoved == 0)
            {
                castling += "q";
            }
        }

        return castling.Length > 0 ? castling : "-";
    }

    /// <summary>
    /// Gets the king if it hasn't moved, null otherwise
    /// </summary>
    private static Piece? GetKingIfNotMoved(ChessBoard board, PieceColor color)
    {
        try
        {
            var king = board.GetKing(color);
            return king.TimesMoved == 0 ? king : null;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// Gets en passant target square
    /// </summary>
    private static string GetEnPassantTarget(ChessBoard board)
    {
        var lastMovedPiece = board.LastMovedPiece;

        if (lastMovedPiece == null || lastMovedPiece.GetPieceType() != PieceType.Pawn)
            return "-";

        // Check if pawn moved 2 squares (en passant is possible)
        if (lastMovedPiece.TimesMoved != 1)
            return "-";

        var pawnPos = lastMovedPiece.GetPiecePosition();
        var pawnColor = lastMovedPiece.GetPieceColor();

        // Check if pawn is on the 4th rank (white) or 5th rank (black)
        // White pawns start at rank 2, so after moving 2 squares they're at rank 4
        // Black pawns start at rank 7, so after moving 2 squares they're at rank 5
        var isOnEnPassantRank = (pawnColor == PieceColor.White && pawnPos.Row == 4) ||
                                 (pawnColor == PieceColor.Black && pawnPos.Row == 5);

        if (!isOnEnPassantRank)
            return "-";

        // En passant target is the square behind the pawn
        var enPassantRow = pawnColor == PieceColor.White ? 3 : 6;
        var enPassantPos = new ChessNotationPosition(enPassantRow, pawnPos.Col);

        return enPassantPos.ToString();
    }

    /// <summary>
    /// Parses a FEN string and creates a ChessBoard with the position
    /// </summary>
    public static ChessBoard FromFen(string fen)
    {
        if (string.IsNullOrWhiteSpace(fen))
            fen = StartingPosition;

        var parts = fen.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length < 4)
            throw new ChessException("Invalid FEN string: not enough parts", ChessErrorCode.ParseError);

        var board = new ChessBoard();

        // 1. Parse piece placement
        ParsePiecePlacement(board, parts[0]);

        // Note: We don't set active color, castling, en passant, etc. here
        // as those are match-level concerns, not board-level

        return board;
    }

    /// <summary>
    /// Parses the piece placement part of FEN
    /// </summary>
    private static void ParsePiecePlacement(ChessBoard board, string placement)
    {
        var ranks = placement.Split('/');

        if (ranks.Length != 8)
            throw new ChessException($"Invalid FEN: expected 8 ranks, got {ranks.Length}", ChessErrorCode.ParseError);

        // FEN ranks go from 8 to 1 (top to bottom)
        for (var rankIndex = 0; rankIndex < 8; rankIndex++)
        {
            var rank = 8 - rankIndex; // Convert to 1-8 notation
            var rankString = ranks[rankIndex];
            var fileIndex = 0;

            foreach (var ch in rankString)
            {
                if (char.IsDigit(ch))
                {
                    // Empty squares
                    var emptyCount = int.Parse(ch.ToString());
                    fileIndex += emptyCount;
                }
                else
                {
                    // Piece
                    var file = (char)('a' + fileIndex);
                    var pieceType = GetPieceTypeFromFenChar(ch);
                    var pieceColor = char.IsUpper(ch) ? PieceColor.White : PieceColor.Black;

                    board.AddPlayingPiece(pieceColor, pieceType, file, rank);
                    fileIndex++;
                }
            }

            if (fileIndex != 8)
                throw new ChessException($"Invalid FEN rank {rank}: expected 8 files, got {fileIndex}", ChessErrorCode.ParseError);
        }
    }

    /// <summary>
    /// Converts FEN character to PieceType
    /// </summary>
    private static PieceType GetPieceTypeFromFenChar(char ch)
    {
        var upperCh = char.ToUpper(ch);
        return upperCh switch
        {
            'P' => PieceType.Pawn,
            'R' => PieceType.Rook,
            'N' => PieceType.Knight,
            'B' => PieceType.Bishop,
            'Q' => PieceType.Queen,
            'K' => PieceType.King,
            _ => throw new ChessException($"Invalid FEN piece character: {ch}", ChessErrorCode.ParseError)
        };
    }

    /// <summary>
    /// Parses FEN and returns all components
    /// </summary>
    public static FenData ParseFen(string fen)
    {
        if (string.IsNullOrWhiteSpace(fen))
            fen = StartingPosition;

        var parts = fen.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length < 4)
            throw new ChessException("Invalid FEN string: not enough parts", ChessErrorCode.ParseError);

        return new FenData
        {
            PiecePlacement = parts[0],
            ActiveColor = parts[1] == "w" ? PieceColor.White : PieceColor.Black,
            CastlingAvailability = parts[2],
            EnPassantTarget = parts.Length > 3 ? parts[3] : "-",
            HalfmoveClock = parts.Length > 4 ? int.Parse(parts[4]) : 0,
            FullmoveNumber = parts.Length > 5 ? int.Parse(parts[5]) : 1
        };
    }
}

/// <summary>
/// Data structure for FEN components
/// </summary>
public class FenData
{
    public string PiecePlacement { get; set; } = "";
    public PieceColor ActiveColor { get; set; } = PieceColor.White;
    public string CastlingAvailability { get; set; } = "-";
    public string EnPassantTarget { get; set; } = "-";
    public int HalfmoveClock { get; set; } = 0;
    public int FullmoveNumber { get; set; } = 1;
}