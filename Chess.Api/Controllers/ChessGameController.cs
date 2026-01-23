using Chess.Api.Models;
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
    public IActionResult GetDefaultGameState()
    {
        var state = _game.GetDefaultGameState();
    
        var gameState = new GameStateDTO(state.Fen);
        
        return Ok(gameState);
    }
    
    [HttpGet("random-state")]
    public IActionResult GetRandomGameState()
    {
         var state = _game.GetRandomBoardState();

        var gameState = new GameStateDTO(state.Fen);
        
        return Ok(gameState);
    }
    
}