import { type BoardColorSchemeDTO , type BoardColorSchemeJSON } from "../models/BoardColorSchemeDTO";
import boardColorSchemeData from "../data/JSON/boardColorScheme.json";


const boardColorSchemeMap: Record<string, BoardColorSchemeJSON> = {};

(boardColorSchemeData as BoardColorSchemeJSON[]).forEach((scheme) => {
  boardColorSchemeMap[scheme.id] = scheme;
});



export const boardColorSchemeIds: string[] =
  (boardColorSchemeData as BoardColorSchemeJSON[]).map(scheme => scheme.id);

  

export function getBoardColorSchemeById(id: string): BoardColorSchemeDTO | undefined {
  return boardColorSchemeMap[id];
}