import "./styles.css"
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { getSpriteSheetById } from "../../../services/pieceSpriteSheet-service";
import {getBoardColorSchemeById} from "../../../services/boardColorScheme-service";
import PieceSetCard from "../../../components/Configuration Components/PieceSetCard";
import HighlightedTabs from "../../../components/Configuration Components/HighlightedTabs";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import BoardColorSchemeCard from "../../../components/Configuration Components/ColorSchemeCard"; 
import type { PieceSetCardDTO, SpriteSheetDTO } from "../../../models/ConfigurationModels/SpriteSheetConfigDTO";
import type { BoardColorSchemeCardDTO, BoardColorSchemeDTO } from "../../../models/ConfigurationModels/BoardColorSchemeDTO";


export default function ChessConfigPage(){

  // Color scheme variables
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(''); // Track the selected color scheme by its ID
  const { contextSelectedBoardColorSchemeId,setContextSelectedBoardColorSchemeId} = 
  useContext(ContextSelectedBoardConfiguration);
  const [currentScheme,setCurrentScheme] = 
  useState<BoardColorSchemeDTO>(getBoardColorSchemeById(contextSelectedBoardColorSchemeId));

  // PieceSet variables
  const [selectedPieceSetId, setSelectedPieceSetId] = useState<string>('');
  const { contextSelectedPiecesSpriteSheetId,setContextSelectedPiecesSpriteSheetId} = 
  useContext(ContextSelectedBoardConfiguration);
  const [currentPieceSheet,setCurrentPieceSheet] = 
  useState<SpriteSheetDTO>(getSpriteSheetById(contextSelectedPiecesSpriteSheetId));



  useEffect(() => {
    const scheme = getBoardColorSchemeById(contextSelectedBoardColorSchemeId);
    const sheet = getSpriteSheetById(contextSelectedPiecesSpriteSheetId);
    setCurrentScheme(scheme);
    setCurrentPieceSheet(sheet);
  }, [contextSelectedBoardColorSchemeId,contextSelectedPiecesSpriteSheetId]);

  // Handle the selection of a color scheme
  const handleBoardCardClick = (id: string) => {
    setSelectedSchemeId(id);
    setContextSelectedBoardColorSchemeId(id);
  };

  // Handle the selection of a piece set
  const handlePieceSetCardClick = (id: string) => {
    setSelectedPieceSetId(id);
    setContextSelectedPiecesSpriteSheetId(id);
  };

  function createSchemeBoard(scheme: BoardColorSchemeDTO | null): JSX.Element | null {
    if (!scheme) return null;

    const cardDTO: BoardColorSchemeCardDTO = {
      schemeId: scheme.id,
      schemeName: scheme.name,
      onClick: handleBoardCardClick,
      isSelected: scheme.id === selectedSchemeId
    };

    return (
      <BoardColorSchemeCard
        colorScheme={cardDTO}
      />
    );
  }

  function createPieceSetCard(sheet: SpriteSheetDTO | null): JSX.Element | null {
    if (!sheet) return null;

    const cardDTO: PieceSetCardDTO = {
      spriteSheetId : sheet.id,
      spriteSheetName: sheet.name,
      onClick: handlePieceSetCardClick,
      isSelected: sheet.id === selectedPieceSetId,
    };

    return (
      <PieceSetCard
        spriteSheetInfo={cardDTO}
      />
    );
  }




  function createCurrentSchemeBoard()
  {
    return (
        <div className="cs-config-card-container">
          <h3>Current Board Theme</h3>
          <div className="cs-config-current-scheme-card-container">
            {currentScheme && (
              <section>
                {createSchemeBoard(currentScheme)}
              </section>
            )}
          </div>
        </div>
    );
  }

  function createCurrentPieceSetCard()
  {
    return (
        <div className="cs-config-card-container">
          <h3>Current Piece Set</h3>
          <div className="cs-config-current-piece-set-card-container">
            {currentPieceSheet && (
              <section>
                {createPieceSetCard(currentPieceSheet)}
              </section>
            )}
          </div>
        </div>
    );
  }


  return (
    <div className="config-page">
      <h2>Configure Your Chess Board</h2>
      
      <div className="cs-container-flex-center-center">
        {createCurrentSchemeBoard()}
        {createCurrentPieceSetCard()}

      </div>
      
      
      <HighlightedTabs />
      <Outlet/>
      {/* <ChessConfigBoardColorSchemeSelection /> */}
    </div>
  );
};

