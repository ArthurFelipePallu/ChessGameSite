import { createContext } from "react";

export type ContextSelectedBoardConfigurationType={
    contextSelectedBoardColorSchemeId:string;
    setContextSelectedBoardColorSchemeId: (contextSelectedBoardColorSchemeId : string) => void;
    
    
    contextSelectedPiecesSpriteSheetId:string;
    setContextSelectedPiecesSpriteSheetId: (contextSelectedPiecesSpriteSheetId : string) => void;
}

export const ContextSelectedBoardConfiguration = createContext<ContextSelectedBoardConfigurationType>({
    contextSelectedBoardColorSchemeId:"classic",
    setContextSelectedBoardColorSchemeId: () => {},

    contextSelectedPiecesSpriteSheetId:"classic-red",
    setContextSelectedPiecesSpriteSheetId: () => {}
});