namespace Chess.Core.Enums;

public enum MatchEnums
{
    InLobby,
    Playing,
    Finished,
    Incomplete
}

public enum MatchResult
{
    NotDefined,
    Draw,
    WhiteWon,
    BlackWon,
    WhiteResigned,
    BlackResigned,
    WhiteTimedOut,
    BlackTimedOut
}

public enum MatchStyleType
{
    HyperBullet,    //       30  sec
    Bullet,         // 1  -  3   min
    Blitz,          // 3  -  10  min
    Rapid,          // 10 -  60  min
    Classical,      //       60+ min
}       