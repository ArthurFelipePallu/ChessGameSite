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
    [HttpPost("start-game")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> StartGame([FromBody] GameStarterDto starterDto)
    {
        try
        {
            _game.StartMatch(starterDto);

            var gameState = _game.GetCurrentState();
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
    /// Gets the possible moves for a piece at the specified position
    /// </summary>
    /// <param name="position">The chess notation position (e.g., "e2")</param>
    /// <returns>The possible moves for the piece</returns>
    /// <response code="200">Returns the possible moves</response>
    /// <response code="400">If the match is not started or other client error</response>
    /// <response code="404">If no piece is found at the position</response>
    /// <response code="450">If there are Chess Rule errors </response>
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
        catch (ChessException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 450);
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
    /// <response code="450">If there are Chess Rule errors </response>
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

            var gameState = _game.GetCurrentState();
                
            if (string.IsNullOrEmpty(gameState.Fen))
            {
                var errorResponse = new ErrorResponseDto(
                    message: $"No piece found at position {movementDto.FromPos}.",
                    errorCode: "PieceNotFound",
                    statusCode: 404);
                return NotFound(errorResponse);
            }
            
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
        catch (ChessException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 450);
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
     
    
    
    
        /// <summary>
    /// Executes a chess move from one position to another
    /// </summary>
    /// <param name="promotionDto">The Data Transfer Object containing the square in which the promotion is happening and to which piece it is being promoted to</param>
    /// <returns>The updated game state after the move</returns>
    /// <response code="200">Returns the updated game state</response>
    /// <response code="400">If the match is not started, move is invalid, or other client error</response>
    /// <response code="404">If no piece is found at the source position</response>
    /// <response code="450">If there are Chess Rule errors </response>
    /// <response code="500">If an internal server error occurs</response>
    [HttpPost("promote-piece")]
    [ProducesResponseType(typeof(GameStateDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorResponseDto), StatusCodes.Status500InternalServerError)]
    public ActionResult<GameStateDto> PromotePiece([FromBody] PiecePromotionDto promotionDto)
    {
        try
        {
            if (promotionDto == null)
            {
                var nullErrorResponse = new ErrorResponseDto(
                    message: "Movement request object is null or invalid.",
                    errorCode: "RequestObjectIsNull",
                    statusCode: 400);
                return BadRequest(nullErrorResponse);
            }

            if (string.IsNullOrWhiteSpace(promotionDto.PromotingSquare) )
            {
                var invalidErrorResponse = new ErrorResponseDto(
                    message: "Promoting Square and Piece to promote  are required and cannot be empty.",
                    errorCode: "InvalidRequest",
                    statusCode: 400);
                return BadRequest(invalidErrorResponse);
            }

            // _game.Promo(movementDto);

            var gameState = _game.GetCurrentState();
                
            
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
        catch (ChessException ex)
        {
            var errorResponse = new ErrorResponseDto(
                message: ex.Message,
                errorCode: ex.ErrorCode.ToString(),
                statusCode: 450);
            return BadRequest(errorResponse);
        }
        catch (Exception)
        {
            var errorResponse = new ErrorResponseDto(
                message: $"An error occurred while trying to execute promotion at {promotionDto.PromotingSquare} to {promotionDto.PieceToPromote}.",
                errorCode: "InternalError",
                statusCode: 500);
            return StatusCode(500, errorResponse);
        }
    }
    
    
}