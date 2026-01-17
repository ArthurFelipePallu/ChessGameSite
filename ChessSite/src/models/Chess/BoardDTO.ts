import type { BoardColorShemeDTO } from "../BoardColorSchemeDTO"

export type BoardDTO={
    board:string[][],
    possibleMoves:boolean[][],
    boardColorScheme:BoardColorShemeDTO

}