import { useSpriteSheet } from "../../../utils/spriteSheet";
import { pieceMap } from "../../../models/UtilsDtos/SpriteSheetConfigDTO";
import { getSpriteSheetById } from "../../../services/pieceSpriteSheet-service";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import { useContext } from "react";


export default function ChessPiece({ piece }: { piece: string }) {
  
  const {contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);
      


  const spriteSheet = getSpriteSheetById(contextSelectedPiecesSpriteSheetId);
  const spriteInfo = useSpriteSheet(spriteSheet);
  const sprite = pieceMap.find(p => p.id === piece);

  if (!spriteInfo || !sprite || piece === ' ') return null;

//   const { spriteWidth, spriteHeight } = spriteInfo;

  return (
        <div
            className="chess-piece"
            style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${spriteSheet.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${spriteSheet.cols * 100}% ${spriteSheet.rows * 100}%`,
            backgroundPosition: `${sprite.col * (100 / (spriteSheet.cols - 1))}% 
                                ${sprite.row * (100 / (spriteSheet.rows - 1))}%`
            }}
        />
        );
}

// export default function ChessPiece({ piece }: { piece: string }) {
//   const spriteInfo = useSpriteSheet(defaultChessSpriteSheet);
//   const sprite = pieceMap.find(p => p.id === piece);

//   console.log({
//     piece,
//     spriteInfo,
//     spriteFound: !!sprite
//   });

//   if (!spriteInfo || !sprite || piece === ' ') return null;

//   return (
//     <div className="chess-piece" />
//   );
// }
