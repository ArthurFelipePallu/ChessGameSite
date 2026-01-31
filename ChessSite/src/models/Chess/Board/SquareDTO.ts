import type { PieceType } from "../../../api/chessApi";

export type SquareDTO = {
    content:string,
    squareChessNotation:string,
    squareColor:string,
    squareNotationColor:string,
    clickAction: () => void,
    squareIsSelected : boolean,
    squareIsPossibleMove : boolean,
    spriteSheetId:string,
    isPromotingSquare:boolean,
    isAFileSquare:boolean,
    is1RankSquare:boolean
    onPromote:(square:string , piece : PieceType) => Promise<void>,
}
