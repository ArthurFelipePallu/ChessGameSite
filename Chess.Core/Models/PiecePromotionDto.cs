using Chess_Console_Project.Board;

namespace Chess.Core.Models;

public class PiecePromotionDto
{
    public string PromotingSquare { get; set; }
    public PieceType PieceToPromote { get; set; }
    
}