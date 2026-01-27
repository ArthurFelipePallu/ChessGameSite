
using Chess.Core.Enums;

namespace Chess.Core.Models;

public record GameStateDto
{
    public string Fen { get; set; }
    //public PieceColor Turn { get; set; }

    public GameStateDto(string fen )
    {
        Fen = fen;
        //Turn = turn;
    }
}