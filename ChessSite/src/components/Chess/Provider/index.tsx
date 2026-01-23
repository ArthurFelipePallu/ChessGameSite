import { useState } from "react";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";

type Props = {
  children: React.ReactNode;
};

export function ContextSelectedBoardConfigurationProvider({ children }: Props) {
  const [contextSelectedBoardColorSchemeId, setContextSelectedBoardColorSchemeId] = useState<string>("classic-wood");

  const [contextSelectedPiecesSpriteSheetId, setContextSelectedPiecesSpriteSheetId] = useState<string>("classic");

  return (
    <ContextSelectedBoardConfiguration.Provider
      value={{
        contextSelectedBoardColorSchemeId,
        setContextSelectedBoardColorSchemeId,
        contextSelectedPiecesSpriteSheetId,
        setContextSelectedPiecesSpriteSheetId,
      }}
    >
      {children}
    </ContextSelectedBoardConfiguration.Provider>
  );
}
