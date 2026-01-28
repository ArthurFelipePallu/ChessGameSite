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
  
  // console.log("SpriteSheet ID " + id);
  // console.log("SpriteSheet from Map" + spriteSheetMap[id]);
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


export function getUserPortraitOnCoordinates(row:number,col:number){


  const spriteSheet: SpriteSheetDTO = {
                                        "id": "user-portrait",
                                        "name": "User Portrait",
                                        "src": "/assets/User-Sprites/user-portrait-spritesheet.png",
                                        "rows":10,
                                        "cols":20
                                      }
                                

  const spriteInfo = UseSpriteSheet(spriteSheet);
  if(spriteInfo == null) return;
  

  const fallbackPortraitSetStyle = {
            width: "100%",
            height: "100%",
            backgroundImage: `url(${defaultChessSpriteSheet.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${defaultChessSpriteSheet.cols * 100}% ${defaultChessSpriteSheet.rows * 100}%`,
            backgroundPosition: `${col * (100 / (spriteSheet.cols - 1))}% 
                                ${row * (100 / (spriteSheet.rows - 1))}%`
            }
  
  if (!spriteInfo  ) return fallbackPortraitSetStyle;

  

  const userPortraitStyle ={
            width: "100%",
            height: "100%",
            backgroundImage: `url(${spriteSheet.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,
            backgroundPosition: `${col * (100 / (spriteSheet.cols - 1))}% 
                                ${row * (100 / (spriteSheet.rows - 1))}%`
            }

    console.log( userPortraitStyle);
    return userPortraitStyle;
}



export function getChessPieceStyleFromSpritesheet(pieceId:string,spriteSheetId:string){

  const spriteSheet = getSpriteSheetById(spriteSheetId);
  

  const spriteInfo = UseSpriteSheet(spriteSheet);
  if(spriteInfo == null) return;
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

  console.log( pieceStyle);
    return pieceStyle;
}






export function UseSpriteSheet(config: SpriteSheetDTO) {
  const [data, setData] = useState<{
    spriteWidth: number;
    spriteHeight: number;
  } | null>(null);

  // console.log( "Config " + {config});
  useEffect(() => {
    if (!config) return;

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
    // console.log({img});
    
    // console.log({config});

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



export function getChessPieceStyle(
  pieceId: string,
  spriteSheet: SpriteSheetDTO
) {
  const sprite = pieceMap.find(p => p.id === pieceId);
  if (!sprite || pieceId === ' ') return {};

  return {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${spriteSheet.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,
    backgroundPosition: `${sprite.col * (100 / (spriteSheet.cols - 1))}% 
                         ${sprite.row * (100 / (spriteSheet.rows - 1))}%`,
  };
}


export function getUserPortraitStyle(row: number, col: number) {
  const spriteSheet = {
    src: "/assets/user-portrait-spritesheet.png",
    rows: 10,
    cols: 20
  };

  // safety clamp
  row = Math.max(0, Math.min(row, spriteSheet.rows - 1));
  col = Math.max(0, Math.min(col, spriteSheet.cols - 1));

  console.log(row,col);

  // return {
  //   width: "100%",
  //   height: "100%",
  //   backgroundImage: `url(${spriteSheet.src})`,
  //   backgroundRepeat: "no-repeat",

  //   // Each sprite becomes exactly the size of the container
  //   backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,

  //   // Move exactly one sprite per step
  //   backgroundPosition: `-${col * 100}% -${row * 100}%`
  // };

    return {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${spriteSheet.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,
    backgroundPosition: `${col * (100 / (spriteSheet.cols - 1))}% 
                         ${row * (100 / (spriteSheet.rows - 1))}%`,
  };
}