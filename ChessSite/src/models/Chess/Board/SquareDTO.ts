export type SquareDTO = {
    content:string,
    squareColor:string,
    clickAction: () => void,
    squareIsSelected : boolean,
    squareIsPossibleMove : boolean,
    spriteSheetId:string,
    isPromotingSquare:boolean,
}
