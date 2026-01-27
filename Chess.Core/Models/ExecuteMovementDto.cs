namespace Chess.Core.Models;

/// <summary>
/// Data Transfer Object for executing a chess move
/// </summary>
public class ExecuteMovementDto
{
    /// <summary>
    /// The source position in chess notation (e.g., "e2")
    /// </summary>
    public string FromPos { get; set; } = string.Empty;
    
    /// <summary>
    /// The destination position in chess notation (e.g., "e4")
    /// </summary>
    public string ToPos { get; set; } = string.Empty;
}