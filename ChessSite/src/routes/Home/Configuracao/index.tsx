import "./styles.css"
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import HighlightedTabs from "../../../components/Configuration Components/HighlightedTabs";
import BoardColorSchemeCard from "../../../components/Configuration Components/ColorSchemeCard"; 
import {getBoardColorSchemeById} from "../../../services/boardColorScheme-service";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import type { BoardColorSchemeCardDTO, BoardColorSchemeDTO } from "../../../models/ConfigurationModels/BoardColorSchemeDTO";
export default function ChessConfigPage(){

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(''); // Track the selected color scheme by its ID
  const { contextSelectedBoardColorSchemeId,setContextSelectedBoardColorSchemeId} = useContext(ContextSelectedBoardConfiguration);

  const [currentScheme,setCurrentScheme] = 
  useState<BoardColorSchemeDTO>(getBoardColorSchemeById(contextSelectedBoardColorSchemeId));

  useEffect(() => {
    const scheme = getBoardColorSchemeById(contextSelectedBoardColorSchemeId);
    setCurrentScheme(scheme);
  }, [contextSelectedBoardColorSchemeId]);

  // Handle the selection of a color scheme
  const handleCardClick = (id: string) => {
    setSelectedSchemeId(id);
    setContextSelectedBoardColorSchemeId(id);
    console.log(id);
  };


function createSchemeBoard(scheme: BoardColorSchemeDTO | null): JSX.Element | null {
  if (!scheme) return null;

  const cardDTO: BoardColorSchemeCardDTO = {
    schemeId: scheme.id,
    schemeName: scheme.name,
    onClick: handleCardClick,
    isSelected: scheme.id === selectedSchemeId
  };

  return (
    <BoardColorSchemeCard
      colorScheme={cardDTO}
    />
  );
}

function createCurrentSchemeBoard()
{
  return (
      <>
        <h3>Current Board Theme</h3>
        <div className="cs-scheme-cards-container">
          {currentScheme && (
            <section>
              {createSchemeBoard(currentScheme)}
            </section>
          )}
        </div>
      </>
  );
}

  return (
    <div className="config-page">
      <h2>Configure Your Chess Board</h2>
      
      {createCurrentSchemeBoard()}
      
      <HighlightedTabs />
      <Outlet/>
      {/* <ChessConfigBoardColorSchemeSelection /> */}
    </div>
  );
};

