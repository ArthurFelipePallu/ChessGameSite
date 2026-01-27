namespace Chess.Core.Models;

public record PossibleMovesDto
{
    public string PossibleMoves { get; set; }

    public PossibleMovesDto(string possibleMoves)
    {
        PossibleMoves = possibleMoves;
    }
}
