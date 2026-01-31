using Chess.Core.Enums;
using Chess.Engine.Board;
using Chess.Engine.Board.Pieces;
using Chess_Console_Project.Board;
using Chess_Console_Project.Chess;
using Chess_Console_Project.Chess.Enums;
using Chess_Console_Project.Chess.Player;
using Chess.Core.Exceptions;
using Chess_Console_Project.Chess.ChessPieces;
using Chess.Core.Models;
using Chess.Engine.ChessGame.Board.Fen;


namespace Chess.Engine.Chess.Match;

public class ChessMatch
{
    
    public int MatchId { get; private set; }
    private int WhitePlayerId { get;  set; }
    private int BlackPlayerId { get;  set; }
    
    private int _movesCount = 0;
    ChessBoard _board;
    private PieceColor _toPlayColor = PieceColor.White;
    private string _promotingSquare = "";
    private Piece _lastCapturedPiece;
    private MatchResult _matchResult = MatchResult.NotDefined;
        

    public ChessMatch(int whitePlayerId, int blackPlayerId)
    {
        MatchId = 1;
        WhitePlayerId = whitePlayerId;
        BlackPlayerId = blackPlayerId;
        
        CreateChessBoard();
    }

    /// <summary>
    /// MATCH METHODS
    /// </summary>
    public int GetIdOfMatch() => MatchId;
    public MatchResult GetMatchResult() => _matchResult;
    public int GetWhitePlayerIdOfMatch() => WhitePlayerId;
    public int GetBlackPlayerIdOfMatch() => BlackPlayerId;

    /// <summary>
    /// MATCH METHODS
    /// </summary>

    public Piece AccessPieceAtChessBoardPosition(string pos)
    {
        if (_promotingSquare != "")
            throw new ChessException("There is a piece to promote before resuming game");
        var notationPosition = new ChessNotationPosition(pos);
        return _board.AccessPieceAtChessNotationPosition(notationPosition);
    }
    public bool PieceAtPositionIsOfCurrentTurnColor(string pos)
    {
        return  AccessPieceAtChessBoardPosition(pos).GetPieceColor() == PieceColor.White;
    }
    public void CalculatePiecePossibleMoves(Piece piece)
    {
        piece.CalculatePossibleMoves();
    }
    public bool PieceHasPossibleMoves(Piece piece)
    {
        return piece.HasAtLeastOnePossibleMove();
    }
    public bool IsDestinationPositionInPiecePossibleMoves(Piece piece ,string pos)
    {
        var destinationChessNotationPosition = new ChessNotationPosition(pos);
        return piece.ChessNotationPositionIsInPossibleMoves(destinationChessNotationPosition);
    }

    public string RetrievePiecePossibleMovesAsString(Piece piece)
    {
        if (_promotingSquare != "")
            throw new ChessException("There is a piece to promote before resuming game");
        
        return BooleanFen.BooleanArrayToFen(piece.GetAllPossibleMoves());
    }

    public string RetrieveBoardCurrentStateFen()
    {
        return FenHelper.GetPiecePlacement(_board);
    }
    

    /// <summary>
    /// BOARD METHODS
    /// </summary>
    private void CreateChessBoard()
    {
        _board = new ChessBoard();
        _board.CreateChessBoardInitialPosition();
    }




    /// <summary>
    ///   MOVEMENT METHODS
    /// </summary>
    private void IncreaseTurnCount()
    {
        _movesCount++;
    }
    public void ExecuteMovement(Piece piece, ChessNotationPosition destination)
    {
        if (_promotingSquare != "")
            throw new ChessException("There is a piece to promote before resuming game");
        
        var movementIsSuccessful = false;

        if (IsMovementCastles(piece, destination))
        {
            var castlesDir = GetCastleDirection(piece, destination);
            movementIsSuccessful = MovePieceTo(piece,destination);
            MoveRookInCastles(piece,castlesDir);
        }
        else if (IsMovementEnPassent(piece, destination))
        {
            var positionToTake = new ChessNotationPosition(piece.GetPiecePosition().Row, destination.Col);
            var pieceToTake = _board.AccessPieceAtChessNotationPosition(positionToTake);
            _board.RemovePieceFromPlay(pieceToTake);

            movementIsSuccessful = MovePieceTo(piece,destination);
        }
        else
            movementIsSuccessful = MovePieceTo(piece,destination);

        //_screen.PrintBoardAndPlayers(_playerWhite,_playerBlack,_chessBoard,_toPlay);
        _board.SetLastMovedPiece(piece);
        //_screen.ScreenWriteAndWaitForEnterToContinue(actionMessage);

        if (piece is Pawn pawn)
        {
            if (pawn.CanPromote())
            {
                SetPromotingSquare(pawn.GetPiecePosition().ToString());
                return;
            }
        }

        if (IsKingOfColorInCheckMate(GetThisTurnOpponentColor()))
        {
            _matchResult = _toPlayColor == PieceColor.White ? MatchResult.WhiteWon : MatchResult.BlackWon;
        }
        
        if(movementIsSuccessful)
        {
            ChangePlayerToMove();
            // _chessMovement.SaveMovement(piece , MovementType.Move,destinationChessNotationPosition);

        }
    }
    private bool MovePieceTo(Piece piece, ChessNotationPosition destination)
    {
        var originalPiecePosition = piece.GetPiecePosition();
        _board.RemovePieceFromBoardAt(originalPiecePosition);

        var destinationPiece = _board.AccessPieceAtChessNotationPosition(destination);
        if(destinationPiece != null)
        {
            _lastCapturedPiece = destinationPiece;
            _board.RemovePieceFromPlay(destinationPiece);
        }

        _board.PutPieceAtDestinationPosition(piece, destination);

        if (IsKingOfColorInCheck(piece.GetPieceColor()))
        {
            _board.RemovePieceFromBoardAt(destination);
            _board.PutPieceAtDestinationPosition(piece,originalPiecePosition);
            if(destinationPiece != null)
                _board.PutPieceAtDestinationPosition(destinationPiece,destination);

            
            throw new ChessException(
                message: $"Movement is Invalid. The movement left the {piece.GetPieceColor()} King In Check.",
                ChessErrorCode.CheckViolation,
                fromSquare: originalPiecePosition.ToString(),
                toSquare: destination.ToString(),
                piece: piece.ToString());
        }
        piece.IncreaseTimesMoved();

        return true;
    }

    /// <summary>
    /// EN PASSENT
    /// </summary>
    private bool IsMovementEnPassent(Piece piece, ChessNotationPosition destination)
    {
        if (piece.GetPieceType() != PieceType.Pawn) return false;
        if (piece.GetPiecePosition().Col == destination.Col) return false;
        return _board.AccessPieceAtChessNotationPosition(destination) == null;
    }

    /// <summary>
    /// CASTLES
    /// </summary>
    private bool IsMovementCastles(Piece piece, ChessNotationPosition destination)
    {
        if (piece.GetPieceType() != PieceType.King) return false;
        var x = destination.ColumnIndex - piece.GetPiecePosition().ColumnIndex;
        return Math.Abs(x) == 2;
    }
    private HorizontalDirections GetCastleDirection(Piece king, ChessNotationPosition destination)
    {
        var x = destination.ColumnIndex - king.GetPiecePosition().ColumnIndex;
        return x < 0 ? HorizontalDirections.Left : HorizontalDirections.Right;
    }
    private void MoveRookInCastles(Piece king , HorizontalDirections castlesDir)
    {
        var rookCol = castlesDir == HorizontalDirections.Left ? 'a' : 'h';
        var kingPos = king.GetPiecePosition();
        var rookOriginalChessNotationPosition = new ChessNotationPosition(kingPos.Row, rookCol);
        var rook = _board.AccessPieceAtChessNotationPosition(rookOriginalChessNotationPosition);
        var rookDestinationColumnIndex = kingPos.ColumnIndex - (int)castlesDir;
        var rookDestinationPosition = ChessNotationPosition.FromArrayIndices(kingPos.RowIndex, rookDestinationColumnIndex);
        MovePieceTo(rook,rookDestinationPosition);

    }

    /// <summary>
    /// PROMOTION
    /// </summary>

    private void SetPromotingSquare(string square)
    {
        _promotingSquare = square;
    }
    public string GetPromotingSquare => _promotingSquare;
    public void PromotePieceAtSquareTo(PiecePromotionDto? promotionInfo)
    {
        if (promotionInfo.PromotingSquare != _promotingSquare)
            throw new ChessException("Trying to promote piece in square different than promoting square.");
        
        
        var promotingSquarePosition = new ChessNotationPosition(promotionInfo.PromotingSquare);

        _board.RemovePieceFromBoardAt(promotingSquarePosition);
        _board.AddPlayingPiece(GetThisTurnPlayingColor(),promotionInfo.PieceToPromote,promotingSquarePosition.Col,promotingSquarePosition.Row);
        
        
        ChangePlayerToMove();
        _promotingSquare = "";

    }


    
    
    /// <summary>
    /// PLAYER METHODS
    /// </summary>
    private void ChangePlayerToMove()
    {
        _toPlayColor = _toPlayColor == PieceColor.White ? PieceColor.Black : PieceColor.White;

        //If Player to move is white again , 1 turn has passed
        if(_toPlayColor == PieceColor.White)
            IncreaseTurnCount();
    }

    public PieceColor GetThisTurnPlayingColor()
    {
        return _toPlayColor;
    }
    public PieceColor GetThisTurnOpponentColor()
    {
        return _toPlayColor == PieceColor.White ? PieceColor.Black : PieceColor.White;
    }

    public bool IsKingOfColorInCheck(PieceColor color)
    {
        return _board.IsKingInCheck(color);
    }

    private bool IsKingOfColorInCheckMate(PieceColor color)
    {
        if(!IsKingOfColorInCheck(color)) return false;

        foreach (var piece in _board.GetChessPiecesInPlay(color))
        {
            var mat = piece.GetAllPossibleMoves();
            for (var i = 0; i < mat.GetLength(0); i++)
            {
                for (var j = 0; j < mat.GetLength(1); j++)
                {
                    if (mat[i, j])
                    {
                        var destination = ChessNotationPosition.FromArrayIndices(i, j);

                        // Test if this move would get the king out of check
                        if (WouldMoveGetKingOutOfCheck(piece, destination))
                        {
                            return false; // Found a legal move that gets king out of check
                        }
                    }
                }
            }
        }

        return true; // No legal moves found that get king out of check = checkmate
    }

    private bool WouldMoveGetKingOutOfCheck(Piece piece, ChessNotationPosition destination)
    {
        var originalPosition = piece.GetPiecePosition();
        var destinationPiece = _board.AccessPieceAtChessNotationPosition(destination);

        try
        {
            // Temporarily make the move
            _board.RemovePieceFromBoardAt(originalPosition);
            if (destinationPiece != null)
            {
                _board.RemovePieceFromPlay(destinationPiece);
            }
            _board.PutPieceAtDestinationPosition(piece, destination);

            // Check if king is still in check after this move
            var kingIsSafe = !IsKingOfColorInCheck(piece.GetPieceColor());

            // Always undo the move
            _board.RemovePieceFromBoardAt(destination);
            _board.PutPieceAtDestinationPosition(piece, originalPosition);
            if (destinationPiece != null)
            {
                _board.ReturnPieceToPlay(destinationPiece);
            }

            return kingIsSafe;
        }
        catch (Exception)
        {
            // If any error occurs during the test move, undo and return false
            _board.RemovePieceFromBoardAt(destination);
            _board.PutPieceAtDestinationPosition(piece, originalPosition);
            if (destinationPiece != null)
            {
                _board.ReturnPieceToPlay(destinationPiece);
            }
            return false;
        }
    }
}