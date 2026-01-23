using Chess_Console_Project.Board;
using Chess_Console_Project.Chess.Enums;
using Chess.Core.Enums;
using Chess.Engine.Board;
using Chess.Engine.Board.Pieces;

namespace Chess_Console_Project.Chess.ChessPieces;

public class Rook : Piece
{

    public Rook(ChessBoard board, PieceColor pieceColor) : base(board, pieceColor)
    {
        _value = 5;
        _name = "Rook";
        ChessNotation = 'R';
        PieceType = PieceType.Rook;
    }

    public override void AfterMoveVerification()
    {
        throw new NotImplementedException();
    }

    public override void CalculatePossibleMoves()
    {

        ClearPossibleMoves();

        //Direção para Cima
        CheckPossibleMovesInDirection(VerticalDirections.Up,HorizontalDirections.None);

        //Direção para Direita
        CheckPossibleMovesInDirection(VerticalDirections.None,HorizontalDirections.Right);

        //Direção para Baixo
        CheckPossibleMovesInDirection(VerticalDirections.Down,HorizontalDirections.None);

        //Direção para Esquerda
        CheckPossibleMovesInDirection(VerticalDirections.None,HorizontalDirections.Left);
    }

    public override void CalculatePossibleAttackMoves()
    {
        CalculatePossibleMoves();
    }
}