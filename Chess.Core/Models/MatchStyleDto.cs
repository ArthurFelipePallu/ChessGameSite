using Chess.Core.Enums;

namespace Chess.Core.Models;

public class MatchStyleDto
{
    public MatchStyleType MatchStyleType { get; set; }
    public float DurationInSeconds { get; set; }
    public float MoveIncrementInSeconds { get; set; }
    public float MoveDelayInSeconds { get; set; }
    public bool IsSuddenDeath { get; set; }

    public int TurnsForDurationIncrement = -1;

    public float DurationIncrementInSeconds = 0;

    public MatchStyleDto(MatchStyleType type, int duration,float moveIncrement ,float moveDelay, bool isSuddenDeath = false)
    {
        MatchStyleType = type;
        DurationInSeconds = duration;
        MoveIncrementInSeconds = moveIncrement;
        MoveDelayInSeconds = moveDelay;
        IsSuddenDeath = isSuddenDeath;
    }

    public void SetDefaultHyperBulletStyle()
    {
        MatchStyleType = MatchStyleType.HyperBullet;
        DurationInSeconds = 30;
        MoveIncrementInSeconds = 0;
        MoveDelayInSeconds = 0;
        IsSuddenDeath = false;
    }
    public void SetDefaultBulletStyle()
    {
        MatchStyleType = MatchStyleType.Bullet;
        DurationInSeconds = 180; // 3 min
        MoveIncrementInSeconds = 1;
        MoveDelayInSeconds = 0;
        IsSuddenDeath = false;
    }
    public void SetDefaultBlitzStyle()
    {
        MatchStyleType = MatchStyleType.Blitz;
        DurationInSeconds = 300; // 5min
        MoveIncrementInSeconds = 2;
        MoveDelayInSeconds = 0;
        IsSuddenDeath = false;
    }
    public void SetDefaultRapidStyle()
    {
        MatchStyleType = MatchStyleType.Rapid;
        DurationInSeconds = 900; // 15min
        MoveIncrementInSeconds = 10;
        MoveDelayInSeconds = 0;
        IsSuddenDeath = false;
    }
    public void SetDefaultClassicalStyle()
    {
        MatchStyleType = MatchStyleType.Classical;
        DurationInSeconds = 5400; // 90min 
        MoveIncrementInSeconds = 30;
        MoveDelayInSeconds = 0;
        IsSuddenDeath = false;
        TurnsForDurationIncrement = 40;
        DurationIncrementInSeconds = 1800; // 30min
    }

}