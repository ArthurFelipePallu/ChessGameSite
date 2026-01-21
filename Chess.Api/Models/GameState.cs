using Chess.Engine.Enums;

namespace Chess.Api.Models;

public class GameState
{
    public string Fen;
    public string Turn;

    public GameState(string fen , PieceColor turn)
    {
        Fen = fen;
        Turn = turn.ToString();
    }
}