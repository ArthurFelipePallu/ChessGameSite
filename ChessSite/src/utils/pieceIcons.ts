import {type PieceIconDTO} from "../models/Chess/pieceIconDTO";
import pieceIconsData from "../data/JSON/pieceIcons.json";
 

const pieceIconsMap: Record<string,string> = {};
(pieceIconsData as PieceIconDTO[]).forEach( ({key,value}) =>{
  pieceIconsMap[key] = value;
});

export function getPieceIconByKey(key : string)
{
  return pieceIconsMap[key];
}