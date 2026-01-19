import { useEffect, useState } from "react";
import type { SpriteSheetConfig } from "../models/UtilsDtos/SpriteSheetConfigDTO";



export function useSpriteSheet(config: SpriteSheetConfig) {
  const [data, setData] = useState<{
    spriteWidth: number;
    spriteHeight: number;
  } | null>(null);

  useEffect(() => {
    loadSpriteSheet(config).then(setData);
  }, [config]);

  return data;
}



export function loadSpriteSheet(config: SpriteSheetConfig): Promise<{
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
