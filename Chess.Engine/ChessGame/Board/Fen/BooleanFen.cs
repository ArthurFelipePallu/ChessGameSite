using System.Text;

namespace Chess.Engine.ChessGame.Board.Fen;

public static class BooleanFen
{
    public static string BooleanArrayToFen(bool[,] board, char trueChar = 'x')
    {
        if (char.IsDigit(trueChar))
            throw new ArgumentException("trueChar cannot be a digit.", nameof(trueChar));

        int rows = board.GetLength(0);
        int cols = board.GetLength(1);

        var sb = new StringBuilder();

        for (int r = 0; r < rows; r++)
        {
            int falseCount = 0;

            for (int c = 0; c < cols; c++)
            {
                if (!board[r, c])
                {
                    falseCount++;
                }
                else
                {
                    if (falseCount > 0)
                    {
                        sb.Append(falseCount);
                        falseCount = 0;
                    }

                    sb.Append(trueChar);
                }
            }

            if (falseCount > 0)
                sb.Append(falseCount);

            if (r < rows - 1)
                sb.Append('/');
        }

        return sb.ToString();
    }

}