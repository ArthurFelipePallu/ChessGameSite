import { useEffect, useState } from "react";
import spriteSheetData from "../data/JSON/pieceSpritesSheets.json";
import { pieceMap, 
         defaultChessSpriteSheet, 
         type SpriteSheetDTO, 
         type SpriteSheetGroupDTO } from "../models/ConfigurationModels/SpriteSheetConfigDTO";



/* ======================================================
   Internal Maps (built once)
====================================================== */



const spriteSheetGroupMap: Record<string, SpriteSheetGroupDTO> = {};
const spriteSheetMap: Record<string, SpriteSheetDTO> = {};

(spriteSheetData as SpriteSheetGroupDTO[]).forEach(group => {
  spriteSheetGroupMap[group.id] = group;

  group.spriteSheets.forEach(sheet => {
    spriteSheetMap[sheet.id] = sheet;
  });
});




/* ======================================================
   Public API 
====================================================== */



/* ======================================================
   ACCESSIBILITY
====================================================== */

export function getAllSpriteSheetGroups() : SpriteSheetGroupDTO[]
{
  return (spriteSheetData as SpriteSheetGroupDTO[]);
}

export function getSpriteSheetById(id : string)
{
  return spriteSheetMap[id];
}

export function getSpriteByPieceId(pieceId : string)
{
  return pieceMap.map(p => p.id === pieceId);
}

export function getSpriteFromSpriteSheetByPieceId(spriteSheet:SpriteSheetDTO,pieceId : string)
{
  return pieceMap.map(p => p.id === pieceId);
}


/* ======================================================
   FUNCTIONALITIES
====================================================== */




export function getChessPieceStyleFromSpritesheet(pieceId:string,spriteSheetId:string){

  const spriteSheet = getSpriteSheetById(spriteSheetId);
  const spriteInfo = UseSpriteSheet(spriteSheet);
  const sprite = pieceMap.find(p => p.id === pieceId);

  let fallbackPieceSetStyle = {};
  if(sprite){
    fallbackPieceSetStyle = {
            width: "100%",
            height: "100%",
            backgroundImage: `url(${defaultChessSpriteSheet.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${defaultChessSpriteSheet.cols * 100}% ${defaultChessSpriteSheet.rows * 100}%`,
            backgroundPosition: `${sprite.col * (100 / (spriteSheet.cols - 1))}% 
                                ${sprite.row * (100 / (spriteSheet.rows - 1))}%`
            }
  }
  if (!spriteInfo || !sprite || pieceId === ' ') return fallbackPieceSetStyle;


  const pieceStyle ={
            width: "100%",
            height: "100%",
            backgroundImage: `url(${spriteSheet.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,
            backgroundPosition: `${sprite.col * (100 / (spriteSheet.cols - 1))}% 
                                ${sprite.row * (100 / (spriteSheet.rows - 1))}%`
            }

    return pieceStyle;
}






export function UseSpriteSheet(config: SpriteSheetDTO) {
  const [data, setData] = useState<{
    spriteWidth: number;
    spriteHeight: number;
  } | null>(null);

  useEffect(() => {
    loadSpriteSheet(config).then(setData);
  }, [config]);

  return data;
}



export function loadSpriteSheet(config: SpriteSheetDTO): Promise<{
                                                                        imageWidth: number;
                                                                        imageHeight: number;
                                                                        spriteWidth: number;
                                                                        spriteHeight: number;
                                                                        }> 
{
  return new Promise((resolve) => {
    const img = new Image();
    img.src = config.src;

    img.onload = () => {
      const spriteWidth = img.width / config.cols;
      const spriteHeight = img.height / config.rows;

      resolve({
        imageWidth: img.width,
        imageHeight: img.height,
        spriteWidth,
        spriteHeight
      });
    };
  });
}
