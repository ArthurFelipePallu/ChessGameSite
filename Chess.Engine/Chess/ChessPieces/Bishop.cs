using Chess_Console_Project.Board;
using Chess_Console_Project.Chess.Enums;
using Chess.Core.Enums;
using Chess.Engine.Board;
using Chess.Engine.Board.Pieces;

namespace Chess_Console_Project.Chess.ChessPieces;

public class Bishop : Piece
{

    public Bishop(ChessBoard board, PieceColor pieceColor) : base(board, pieceColor)
    {
        _value = 3;
        _name = "Bishop";
        ChessNotation = 'B';
        PieceType = PieceType.Bishop;
    }

    public override void AfterMoveVerification()
    {
        throw new NotImplementedException();
    }

    public override void CalculatePossibleMoves()
    {
        ClearPossibleMoves();

        //Direção Diagonal Esquerda para Cima
        CheckPossibleMovesInDirection(VerticalDirections.Up,HorizontalDirections.Left);

        //Direção Diagonal Direita para Cima
        CheckPossibleMovesInDirection(VerticalDirections.Up,HorizontalDirections.Right);

        //Direção Diagonal Esquerda para Baixo
        CheckPossibleMovesInDirection(VerticalDirections.Down,HorizontalDirections.Left);

        //Direção Diagonal Direita para Baixo
        CheckPossibleMovesInDirection(VerticalDirections.Down,HorizontalDirections.Right);
    }

    public override void CalculatePossibleAttackMoves()
    {
        CalculatePossibleMoves();
    }
}