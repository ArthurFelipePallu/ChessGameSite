
using Chess.Core.Enums;

namespace Chess.Api.Models;

public record GameStateDTO
{
    public string Fen { get; set; }
    public PieceColor Turn { get; set; }

    public GameStateDTO(string fen )
    {
        Fen = fen;
    }
}