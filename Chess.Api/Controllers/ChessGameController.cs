using Chess.Core.Enums;
using Chess.Core.Models;
using Chess.Engine;
using Chess.Engine.ChessGame;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace Chess.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChessGameController : ControllerBase
{
    public static ChessGame _game = new ChessGame();
    
    
    
    
    [HttpGet("default-state")]
    public GameStateDto GetDefaultGameState()
    {
        var state = _game.GetDefaultGameState();
    
        var gameState = new GameStateDto(state.Fen);
        
        return gameState;
    }
    
    [HttpGet("random-state")]
    public GameStateDto GetRandomGameState()
    {
         var state = _game.GetRandomBoardState();

        var gameState = new GameStateDto(state.Fen);
        
        return gameState;
    }
 
    [HttpGet("piece-colors")]
    public PieceColor GetPieceColorWhite()
    {
        return PieceColor.White;
    }
}