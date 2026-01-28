
export type BoardDTO={
    board:string[][],
    possibleMoves:boolean[][],
    boardColorSchemeId:string,
    boardUsingPieceSpriteSheetId:string
    executeMove:(fromSquare:string,toSquare:string) => void;
    changePossibleMovesAction:(possibleMoves:string) => void;
    verifyPositionIsInPossibleMoves: (row:number,col:number) => boolean;
}