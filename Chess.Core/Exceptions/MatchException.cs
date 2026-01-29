using Chess.Core.Enums;

namespace Chess.Core.Exceptions;

/// <summary>
/// Error codes for match-related exceptions
/// </summary>
public enum MatchErrorCode
{
    Unknown = 0,
    MatchAlreadyStarted = 1,
    MatchNotStarted = 2,
    MatchAlreadyFinished = 3,
    InvalidMatchState = 4,
    MatchNotInitialized = 5,
    InvalidStateTransition = 6,
    OperationNotAllowedInCurrentState = 7,
    RequestObjectIsNull = 8,
}

/// <summary>
/// Exception class for handling chess match-related errors
/// </summary>
public class MatchException : Exception
{
    public MatchErrorCode ErrorCode { get; }
    public MatchEnums? CurrentEnums { get; }
    public MatchEnums? AttemptedEnums { get; }

    public MatchException(
        string message,
        MatchErrorCode errorCode = MatchErrorCode.Unknown,
        MatchEnums? currentEnums = null,
        MatchEnums? attemptedEnums = null,
        Exception? innerException = null)
        : base(message, innerException)
    {
        ErrorCode = errorCode;
        CurrentEnums = currentEnums;
        AttemptedEnums = attemptedEnums;
    }

    public override string ToString()
    {
        var baseText = base.ToString();
        var context = $"Code: {ErrorCode}";

        if (CurrentEnums.HasValue)
            context += $", Current Status: {CurrentEnums.Value}";
        if (AttemptedEnums.HasValue)
            context += $", Attempted Status: {AttemptedEnums.Value}";

        return $"{baseText} ({context})";
    }
}

/// <summary>
/// Exception thrown when trying to start a match that is already in play
/// </summary>
public class MatchAlreadyInPlayException : MatchException
{
    public MatchAlreadyInPlayException(
        MatchEnums? currentStatus = null,
        Exception? innerException = null)
        : base(
            message: currentStatus.HasValue 
                ? $"Cannot start a new match. A match is already in progress with status: {currentStatus.Value}"
                : "Cannot start a new match. A match is already in progress.",
            errorCode: MatchErrorCode.MatchAlreadyStarted,
            currentEnums: currentStatus,
            innerException: innerException)
    {
    }
}

/// <summary>
/// Exception thrown when trying to perform operations on a match that hasn't been started
/// </summary>
public class MatchNotStartedException : MatchException
{
    public MatchNotStartedException(
        string operation,
        Exception? innerException = null)
        : base(
            message: $"Cannot perform '{operation}'. The match has not been started yet.",
            errorCode: MatchErrorCode.MatchNotStarted,
            innerException: innerException)
    {
    }
}

/// <summary>
/// Exception thrown when trying to perform operations on a match that has already finished
/// </summary>
public class MatchFinishedException : MatchException
{
    public MatchFinishedException(
        string operation,
        Exception? innerException = null)
        : base(
            message: $"Cannot perform '{operation}'. The match has already finished.",
            errorCode: MatchErrorCode.MatchAlreadyFinished,
            currentEnums: MatchEnums.Finished,
            innerException: innerException)
    {
    }
}

/// <summary>
/// Exception thrown when trying to perform an invalid state transition
/// </summary>
public class InvalidMatchStateTransitionException : MatchException
{
    public InvalidMatchStateTransitionException(
        MatchEnums currentEnums,
        MatchEnums attemptedEnums,
        Exception? innerException = null)
        : base(
            message: $"Cannot transition from '{currentEnums}' to '{attemptedEnums}'. This state transition is not allowed.",
            errorCode: MatchErrorCode.InvalidStateTransition,
            currentEnums: currentEnums,
            attemptedEnums: attemptedEnums,
            innerException: innerException)
    {
    }
}

/// <summary>
/// Exception thrown when trying to perform an operation that is not allowed in the current match state
/// </summary>
public class OperationNotAllowedException : MatchException
{
    public OperationNotAllowedException(
        string operation,
        MatchEnums currentEnums,
        Exception? innerException = null)
        : base(
            message: $"Operation '{operation}' is not allowed when the match is in '{currentEnums}' status.",
            errorCode: MatchErrorCode.OperationNotAllowedInCurrentState,
            currentEnums: currentEnums,
            innerException: innerException)
    {
    }
}

/// <summary>
/// Exception thrown when trying to perform an operation that is not allowed in the current match state
/// </summary>
public class NullRequestObjectException : MatchException
{
    public NullRequestObjectException(
        string operation,
        MatchEnums? currentStatus = null,
        Exception? innerException = null)
        : base(
            message: $"Request '{operation}' came with a null object.",
            errorCode: MatchErrorCode.RequestObjectIsNull,
            currentEnums: currentStatus,
            innerException: innerException)
    {
    }
}
