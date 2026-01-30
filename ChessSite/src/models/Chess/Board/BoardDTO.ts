import type { PieceType } from "../../../api/chessApi";

export type BoardDTO={
    board:string[][],
    possibleMoves:boolean[][],
    promotingSquare:string,
    boardColorSchemeId:string,
    boardUsingPieceSpriteSheetId:string,
    executeMove:(fromSquare:string,toSquare:string) => Promise<void>;
    promotePieceFromSquareToPiece:(square:string , piece : PieceType) => Promise<void>;
    changePossibleMovesAction:(possibleMoves:string) => void;
    verifyPositionIsInPossibleMoves: (row:number,col:number) => boolean;
}