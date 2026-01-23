using Chess_Console_Project.Board;
using Chess_Console_Project.Chess.Enums;
using Chess.Core.Enums;
using Chess.Engine.Board;
using Chess.Engine.Board.Pieces;

namespace Chess_Console_Project.Chess.ChessPieces;

public class Knight : Piece
{

    public Knight(ChessBoard board, PieceColor pieceColor) : base(board, pieceColor)
    {
        _value = 3;
        _name = "Knight";
        ChessNotation = 'N';
        PieceType = PieceType.Knight;
    }

    public override void AfterMoveVerification()
    {
        throw new NotImplementedException();
    }

    public override void CalculatePossibleMoves()
    {
        ClearPossibleMoves();

        HorizontalLMovements();
        VerticalLMovements();
    }

    public override void CalculatePossibleAttackMoves()
    {
        CalculatePossibleMoves();
    }


    private void HorizontalLMovements()
    {
        // L para Esquerda e para cima
        PossibleMovementAtPositionIsMoveOrTake(-2 , -1);

        // L para Esquerda e para baixo
        PossibleMovementAtPositionIsMoveOrTake(-2, 1);

        // L para Direita e para cima
        PossibleMovementAtPositionIsMoveOrTake(2 , -1);

        // L para Direita e para baixo
        PossibleMovementAtPositionIsMoveOrTake(2 , 1);
    }
    private void VerticalLMovements()
    {
        // L para Cima e para Esquerda
    PossibleMovementAtPositionIsMoveOrTake(-1, -2);

    // L para Baixo e para Esquerda
    PossibleMovementAtPositionIsMoveOrTake(-1 , 2);

    // L para Cima e para Direita
    PossibleMovementAtPositionIsMoveOrTake(1 , -2);

    // L para Baixo e para Direita
    PossibleMovementAtPositionIsMoveOrTake(1 , 2);
     }

}