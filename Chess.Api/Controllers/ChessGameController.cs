using Chess.Api.Models;
using Chess.Engine;
using Chess.Engine.ChessGame;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace Chess.Api.Controllers;

[Route("api/[controller]")]
public class ChessController : ControllerBase
{
    public static ChessGame _game = new ChessGame();
    
    
    [HttpGet("state")]
    public IActionResult GetState()
    {
        var state = _game.GetGameState();

        var gameState = new GameState(state.Fen, state.Turn);
        
        return Ok(gameState);
    }
    
}