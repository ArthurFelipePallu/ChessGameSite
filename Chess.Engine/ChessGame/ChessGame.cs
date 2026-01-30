using Chess_Console_Project.Board;
using Chess.Core.Exceptions;
using Chess.Core.Enums;
using Chess.Core.Models;
using Chess.Engine.Chess.Match;
using Chess.Engine.Utils;
using Chess.Engine.ChessGame.Board;
using Chess.Engine.ChessGame.Board.Fen;


namespace Chess.Engine.ChessGame;

public class ChessGame
{
    public string Fen { get; private set; }
    
    private ChessMatch _match;
    public ChessGame()
    {
        Fen = DefaultValues.Fen;
    }

    public void StartMatch(GameStarterDto startDto)
    {
        if(_match != null) 
            throw new MatchAlreadyInPlayException();
        _match = new ChessMatch(startDto.WhitePlayerId, startDto.BlackPlayerId);
        // return GetDefaultBoardState();
    }

    public GameStateDto GetCurrentState()
    {
        if (_match == null)
            throw new MatchNotStartedException("GetCurrentBoardStateFen");
        
        var matchId = 1;
        var whiteId = _match.GetWhitePlayerIdOfMatch();
        var blackId = _match.GetBlackPlayerIdOfMatch();
        var boardStateFen = _match.RetrieveBoardCurrentStateFen();
        var colorToPlay = _match.PieceColorToPlayThisTurn();
        var promotingSquare = _match.GetPromotingSquare;
        
        
        return new GameStateDto(matchId, whiteId, blackId,boardStateFen, colorToPlay, promotingSquare);
    }

    public string GetPossiblePositionOfPieceAtPosition(string position)
    {
        if (_match == null)
            throw new MatchNotStartedException("GetPossiblePositionOfPieceAtPosition");
        
        
        var piece = _match.AccessPieceAtChessBoardPosition(position);
        if (piece == null) return "";//there is no piece at position

        // if (piece.GetPieceColor() != _match.PieceColorToPlayThisTurn())
        //     throw new MovementException($"Piece selected does not belong to {_match.PieceColorToPlayThisTurn()} player");
        //
        _match.CalculatePiecePossibleMoves(piece);
        return _match.RetrievePiecePossibleMovesAsString(piece);
    }
    
    public void ExecuteMovement(ExecuteMovementDto movementDto)
    {
        
        if (_match == null)
            throw new MatchNotStartedException("ExecuteMovement");

        if (movementDto == null)
            throw new NullRequestObjectException("ExecuteMovement");
        
        var piece = _match.AccessPieceAtChessBoardPosition(movementDto.FromPos);
        
        
        _match.ExecuteMovement(piece, new ChessNotationPosition(movementDto.ToPos));
        
    }

    public void PromotePieceAtSquareToPieceOfType(PiecePromotionDto? promotionDto)
    {
        if (_match == null)
            throw new MatchNotStartedException("PromotePieceAtSquareToPieceOfType");

        if (promotionDto == null)
            throw new NullRequestObjectException("PromotePieceAtSquareToPieceOfType");
        
        if(promotionDto.PieceToPromote == PieceType.None)
            throw new PromotionException(" Piece to promote is set as NONE");
        _match.PromotePieceAtSquareTo(promotionDto);
        
        
    }
    
}