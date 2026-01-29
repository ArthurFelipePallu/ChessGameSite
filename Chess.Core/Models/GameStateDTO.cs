
using Chess.Core.Enums;

namespace Chess.Core.Models;

public record GameStateDto
{
    public int MatchId { get; init; }
    
    public int WhitePlayerId { get; set; }
    public int BlackPlayerId { get; set; }
    public string Fen { get; set; }
    public PieceColor Turn { get; set; }
    
    public string SquareToPromote { get; set; }
    // public MatchStyleType MatchType { get; set; }
    // public MatchResult Result { get; set; }

    public GameStateDto(int matchId,int whiteId,int blackId,string fen , PieceColor turn,string squareToPromote)
    {
        MatchId = matchId;
        WhitePlayerId = whiteId;
        BlackPlayerId = blackId;
        Fen = fen;
        Turn = turn;
        SquareToPromote = squareToPromote;
        // MatchType = matchType;
        // Result = result;
        
    }
}