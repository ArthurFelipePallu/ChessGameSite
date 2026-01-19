import spriteSheetData from "../data/JSON/pieceSpritesSheets.json";
import { type SpriteSheetConfig } from "../models/UtilsDtos/SpriteSheetConfigDTO";


const spriteSheetMap: Record<string,SpriteSheetConfig> = {};
(spriteSheetData as SpriteSheetConfig[]).forEach( (sheet) =>{
  spriteSheetMap[sheet.id] = sheet;
});

export function getAllSpriteSheetsInfo() : SpriteSheetConfig[]
{
  return (spriteSheetData as SpriteSheetConfig[]);
}

export function getSpriteSheetById(id : string)
{
  return spriteSheetMap[id];
}