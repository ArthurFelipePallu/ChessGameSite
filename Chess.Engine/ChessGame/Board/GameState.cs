using Chess.Core.Enums;

namespace Chess.Engine.ChessGame.Board;

public class GameState(string fen, PieceColor turn)
{
    public string Fen { get; set; } = fen;
    public PieceColor Turn { get; set; } = turn;
}