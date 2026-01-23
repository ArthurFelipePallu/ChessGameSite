using Chess.Core.Enums;
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

    public void StartGame()
    {
        _match = new ChessMatch();
    }

    public string GetPossiblePositionOfPieceAtPosition(string position)
    {
        var piece = _match.AccessPieceAtChessBoardPosition(position);
        _match.CalculatePiecePossibleMoves(piece);
        return _match.RetrievePiecePossibleMovesAsString(piece);
    }
    
    public GameState GetDefaultGameState()
    {
        Fen = DefaultValues.Fen;
        return BuildCurrentGameState();
    }

    public GameState GetRandomBoardState()
    {
        Fen = RandomFenGenerator.GenerateRandomFen();
        return BuildCurrentGameState();
    }

    private GameState BuildCurrentGameState()
    {
        return new GameState(Fen,Turn );
    }

}