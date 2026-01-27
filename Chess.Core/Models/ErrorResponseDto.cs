namespace Chess.Core.Models;

public record ErrorResponseDto
{
    public string Message { get; set; }
    public string? ErrorCode { get; set; }
    public int StatusCode { get; set; }

    public ErrorResponseDto(string message, string? errorCode = null, int statusCode = 400)
    {
        Message = message;
        ErrorCode = errorCode;
        StatusCode = statusCode;
    }
}
