import {type IconDTO} from "../models/UtilsDtos/iconDTO";
import pieceIconsData from "../data/JSON/pieceIcons.json";
 

const pieceIconsMap: Record<string,string> = {};
(pieceIconsData as IconDTO[]).forEach( ({id,icon}) =>{
  pieceIconsMap[id] = icon;
});

export function getPieceIconByKey(id : string)
{
  return pieceIconsMap[id];
}