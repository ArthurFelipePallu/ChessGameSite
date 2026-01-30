import type { PieceType } from "../../../api/chessApi";

export type SquareDTO = {
    content:string,
    squareChessNotation:string,
    squareColor:string,
    clickAction: () => void,
    squareIsSelected : boolean,
    squareIsPossibleMove : boolean,
    spriteSheetId:string,
    isPromotingSquare:boolean,
    onPromote:(square:string , piece : PieceType) => Promise<void>,
}
