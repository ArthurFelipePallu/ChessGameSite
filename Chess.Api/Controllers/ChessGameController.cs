using Chess.Core.Enums;
using Chess.Core.Exceptions;
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


    /// <summary>
    /// Starts a new chess game match
    /// </summary>
    /// <returns>The initial game state</returns>
    /// <response code="200">Returns the game state</response>
    /// <response code="400">If the match is already started or other client error</response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpGet("start-game")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> StartGame()
    {
        try
        {
            var startingGameState = _game.StartMatch();
            var gameState = new GameStateDto(startingGameState);
            return Ok(gameState);
        }
        catch (MatchException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 400);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: "An unexpected error occurred while starting the game.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }
    
    
    /// <summary>
    /// Gets the default chess board state
    /// </summary>
    /// <returns>The default game state</returns>
    /// <response code="200">Returns the default game state</response>
    /// <response code="400">If the match is not started or other client error</response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpGet("default-state")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> GetDefaultGameState()
    {
        try
        {
            var state = _game.GetDefaultBoardState();
            var gameState = new GameStateDto(state);
            return Ok(gameState);
        }
        catch (MatchException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 400);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: "An error occurred while getting the default game state.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }

    /// <summary>
    /// Gets a random chess board state
    /// </summary>
    /// <returns>A random game state</returns>
    /// <response code="200">Returns a random game state</response>
    /// <response code="400">If the match is not started or other client error</response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpGet("random-state")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> GetRandomGameState()
    {
        try
        {
            var state = _game.GetRandomBoardState();
            var gameState = new GameStateDto(state);
            return Ok(gameState);
        }
        catch (MatchException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 400);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: "An error occurred while getting a random game state.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }

    /// <summary>
    /// Gets the possible moves for a piece at the specified position
    /// </summary>
    /// <param name="position">The chess notation position (e.g., "e2")</param>
    /// <returns>The possible moves for the piece</returns>
    /// <response code="200">Returns the possible moves</response>
    /// <response code="400">If the match is not started or other client error</response>
    /// <response code="404">If no piece is found at the position</response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpGet("possible-move/{position}")]
    [ProducesResponseType(typeof(PossibleMovesDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<PossibleMovesDto> GetPossibleMoveOfPieceAtPosition(string position)
    {
        try
        {
            var possibleMoves = _game.GetPossiblePositionOfPieceAtPosition(position);
            
            if (string.IsNullOrEmpty(possibleMoves))
            {
                var errorResponse = new ErrorResponseDto(
                    message: $"No piece found at position {position}.",
                    errorCode: "PieceNotFound",
                    statusCode: 404);
                return NotFound(errorResponse);
            }
            
            return Ok(new PossibleMovesDto(possibleMoves));
        }
        catch (MatchException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 400);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: "An error occurred while getting possible moves.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }
    
    
    /// <summary>
    /// Executes a chess move from one position to another
    /// </summary>
    /// <param name="movementDto">The Data Transfer Object containing the move (from and to positions)</param>
    /// <returns>The updated game state after the move</returns>
    /// <response code="200">Returns the updated game state</response>
    /// <response code="400">If the match is not started, move is invalid, or other client error</response>
    /// <response code="404">If no piece is found at the source position</response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpPost("execute-move")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> ExecuteMove([FromBody] ExecuteMovementDto movementDto)
    {
        try
        {
            if (movementDto == null)
            {
                var nullErrorResponse = new ErrorResponseDto(
                    message: "Movement request object is null or invalid.",
                    errorCode: "RequestObjectIsNull",
                    statusCode: 400);
                return BadRequest(nullErrorResponse);
            }

            if (string.IsNullOrWhiteSpace(movementDto.FromPos) || string.IsNullOrWhiteSpace(movementDto.ToPos))
            {
                var invalidErrorResponse = new ErrorResponseDto(
                    message: "FromPos and ToPos are required and cannot be empty.",
                    errorCode: "InvalidRequest",
                    statusCode: 400);
                return BadRequest(invalidErrorResponse);
            }

            _game.ExecuteMovement(movementDto);
            
            var gameState = _game.GetCurrentBoardStateFen();
            
            if (string.IsNullOrEmpty(gameState))
            {
                var errorResponse = new ErrorResponseDto(
                    message: $"No piece found at position {movementDto.FromPos}.",
                    errorCode: "PieceNotFound",
                    statusCode: 404);
                return NotFound(errorResponse);
            }
            
            return Ok(new GameStateDto(gameState));
        }
        catch (MatchException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 400);
            return BadRequest(errorResponse);
        }
        catch (ChessException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 500);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: $"An error occurred while tring to execute movement from {movementDto.FromPos} to {movementDto.ToPos}.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }
     
    
}