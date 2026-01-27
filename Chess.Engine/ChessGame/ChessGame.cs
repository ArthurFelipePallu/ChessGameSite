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
    public PieceColor Turn = PieceColor.White;

    private ChessMatch _match;
    public ChessGame()
    {
        Fen = DefaultValues.Fen;
    }

    public string StartMatch()
    {
        if(_match != null) 
            throw new MatchAlreadyInPlayException();
        _match = new ChessMatch();
        return GetDefaultBoardState();
    }

    public string GetPossiblePositionOfPieceAtPosition(string position)
    {
        if (_match == null)
            throw new MatchNotStartedException("GetPossiblePositionOfPieceAtPosition");
        
        var piece = _match.AccessPieceAtChessBoardPosition(position);
        if (piece == null) return "";//there is no piece at position
        _match.CalculatePiecePossibleMoves(piece);
        return _match.RetrievePiecePossibleMovesAsString(piece);
    }
    
    public string GetDefaultBoardState()
    {
        if (_match == null)
            throw new MatchNotStartedException("GetPossiblePositionOfPieceAtPosition");
        
        Fen = DefaultValues.Fen;
        return Fen;
    }

    public string GetRandomBoardState()
    {
        if (_match == null)
            throw new MatchNotStartedException("GetPossiblePositionOfPieceAtPosition");
        Fen = RandomFenGenerator.GenerateRandomFen();
        return Fen;
    }
    public string GetCurrentBoardStateFen()
    {
        if (_match == null)
            throw new MatchNotStartedException("GetCurrentBoardStateFen");
        
        Fen = _match.RetrieveBoardCurrentStateFen();
        //var boardStateFen = Fen.Split(' ')[0];
        return Fen;
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
    public PieceColor GetTurn()
    {
        return Turn;
    }

}