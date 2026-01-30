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
    private Screen _screen;
    ChessBoard _chessBoard;
    MatchEnums _matchEnums;
    private PieceColor _toPlayColor = PieceColor.White;
    private ChessPlayer _playerWhite;
    private ChessPlayer _playerBlack;
    private string _promotingSquare = "";
    private Piece _lastCapturedPiece = null;


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
    public int GetIdOfMatch()
    {
        return MatchId;
    }
    public int GetWhitePlayerIdOfMatch()
    {
        return WhitePlayerId;
    }
    public int GetBlackPlayerIdOfMatch()
    {
        return BlackPlayerId;
    }

    /// <summary>
    /// MATCH METHODS
    /// </summary>
    private void AlterMatchStatus(MatchEnums enums)
    {
        _matchEnums = enums;
    }
    public Piece AccessPieceAtChessBoardPosition(string pos)
    {
        if (_promotingSquare != "")
            throw new ChessException("There is a piece to promote before resuming game");
        var notationPosition = new ChessNotationPosition(pos);
        return _chessBoard.AccessPieceAtChessNotationPosition(notationPosition);
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
        return FenHelper.GetPiecePlacement(_chessBoard);
    }
    

    /// <summary>
    /// BOARD METHODS
    /// </summary>
    private void CreateChessBoard()
    {
        _chessBoard = new ChessBoard();
        _chessBoard.CreateChessBoardInitialPosition();
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
        
        var actionMessage = "";
        var movementIsSuccessful = false;

        if (IsMovementCastles(piece, destination))
        {
            var castlesDir = GetCastleDirection(piece, destination);
            movementIsSuccessful = MovePieceTo(piece,destination,out actionMessage);
            MoveRookInCastles(piece,castlesDir);
        }
        else if (IsMovementEnPassent(piece, destination))
        {
            var positionToTake = new ChessNotationPosition(piece.GetPiecePosition().Row, destination.Col);
            var pieceToTake = _chessBoard.AccessPieceAtChessNotationPosition(positionToTake);
            _chessBoard.RemovePieceFromPlay(pieceToTake);

            movementIsSuccessful = MovePieceTo(piece,destination,out actionMessage);
        }
        else
            movementIsSuccessful = MovePieceTo(piece,destination,out actionMessage);

        //_screen.PrintBoardAndPlayers(_playerWhite,_playerBlack,_chessBoard,_toPlay);
        _chessBoard.SetLastMovedPiece(piece);
        //_screen.ScreenWriteAndWaitForEnterToContinue(actionMessage);

        if (piece is Pawn pawn)
        {
            if (pawn.CanPromote())
            {
                SetPromotingSquare(pawn.GetPiecePosition().ToString());
                return;
            }
        }

        if(movementIsSuccessful)
        {
            ChangePlayerToMove();
            // _chessMovement.SaveMovement(piece , MovementType.Move,destinationChessNotationPosition);

        }
    }
    private bool MovePieceTo(Piece piece, ChessNotationPosition destination, out string message)
    {
        var originalPiecePosition = piece.GetPiecePosition();
        _chessBoard.RemovePieceFromBoardAt(originalPiecePosition);

        var destinationPiece = _chessBoard.AccessPieceAtChessNotationPosition(destination);
        if(destinationPiece != null)
        {
            _lastCapturedPiece = destinationPiece;
            _chessBoard.RemovePieceFromPlay(destinationPiece);
        }

        _chessBoard.PutPieceAtDestinationPosition(piece, destination);

        if (IsKingOfColorInCheck(piece.GetPieceColor()))
        {
            _chessBoard.RemovePieceFromBoardAt(destination);
            _chessBoard.PutPieceAtDestinationPosition(piece,originalPiecePosition);
            if(destinationPiece != null)
                _chessBoard.PutPieceAtDestinationPosition(destinationPiece,destination);

            throw new ChessException(
                message: $"Movement is Invalid. The movement left the {piece.GetPieceColor()} King In Check.",
                ChessErrorCode.CheckViolation,
                fromSquare: originalPiecePosition.ToString(),
                toSquare: destination.ToString(),
                piece: piece.ToString());
        }
        piece.IncreaseTimesMoved();

        message = destinationPiece == null
            ? $"[ CHESS MATCH ] Piece {piece} moved to destination {destination}"
            : $"[ CHESS MATCH ] Piece [{piece}] took [{destinationPiece}] at destination [{destination}]";


        return true;
    }

    /// <summary>
    /// EN PASSENT
    /// </summary>
    private bool IsMovementEnPassent(Piece piece, ChessNotationPosition destination)
    {
        if (piece.GetPieceType() != PieceType.Pawn) return false;
        if (piece.GetPiecePosition().Col == destination.Col) return false;
        return _chessBoard.AccessPieceAtChessNotationPosition(destination) == null;
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
        var rook = _chessBoard.AccessPieceAtChessNotationPosition(rookOriginalChessNotationPosition);
        var rookDestinationColumnIndex = kingPos.ColumnIndex - (int)castlesDir;
        var rookDestinationPosition = ChessNotationPosition.FromArrayIndices(kingPos.RowIndex, rookDestinationColumnIndex);
        MovePieceTo(rook,rookDestinationPosition,out var actionMessage);

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

        _chessBoard.RemovePieceFromBoardAt(promotingSquarePosition);
        _chessBoard.AddPlayingPiece(PieceColorToPlayThisTurn(),promotionInfo.PieceToPromote,promotingSquarePosition.Col,promotingSquarePosition.Row);
        
        
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

    public PieceColor PieceColorToPlayThisTurn()
    {
        return _toPlayColor;
    }

    public bool IsKingOfColorInCheck(PieceColor color)
    {
        return _chessBoard.IsKingInCheck(color);
    }
    public bool IsKingOfColorInCheckMate(PieceColor color)
    {
        if(!IsKingOfColorInCheck(color)) return false;

        var lastPieceCapturedHolder = _lastCapturedPiece;
        foreach (var piece in _chessBoard.GetChessPiecesInPlay(color))
        {
            var originPosition = piece.GetPiecePosition();
            var mat = piece.GetAllPossibleMoves();
            for (var i = 0; i < mat.GetLength(0); i++)
            {
                for (var j = 0; j < mat.GetLength(1); j++)
                {
                    if (mat[i, j])
                    {
                        _lastCapturedPiece = null;
                        var destination = ChessNotationPosition.FromArrayIndices(i, j);
                        var moveIsPossible = MovePieceTo(piece, destination, out var msg);

                        if (moveIsPossible)
                        {
                            _chessBoard.RemovePieceFromBoardAt(destination);
                            _chessBoard.PutPieceAtDestinationPosition(piece, originPosition);
                            if(_lastCapturedPiece != null)
                                _chessBoard.ReturnPieceToPlay(_lastCapturedPiece);

                            _lastCapturedPiece = lastPieceCapturedHolder;
                            piece.DecreaseTimesMoved();
                            return false;
                        }
                        if(_lastCapturedPiece != null)
                            _chessBoard.ReturnPieceToPlay(_lastCapturedPiece);
                    }
                }
            }

        }
        _lastCapturedPiece = lastPieceCapturedHolder;
        return true;
    }
}