import "./styles.css"
import { useContext, useEffect, useState } from 'react';
import { getIconById } from "../../../services/icon-service";
import BoardColorSchemeCard from "../../../components/ColorSchemeCard"; 
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import {getAllBoardColorSchemeGroups,getBoardColorSchemeById} from "../../../services/boardColorScheme-service";
import type { BoardColorSchemeCardDTO, BoardColorSchemeDTO, BoardColorSchemeGroupDTO } from "../../../models/BoardColorSchemeDTO";

export default function ChessConfigPage(){

  const colorSchemeGroups = getAllBoardColorSchemeGroups();
  const [openGroupId, setOpenGroupId] = useState<string | null>("classic");
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

  const toggleGroup = (groupId: string) => {
  setOpenGroupId(prev =>
    prev === groupId ? null : groupId
  );
}

function createSchemeGroup(group: BoardColorSchemeGroupDTO ): JSX.Element | null {
  const isOpen = openGroupId === group.id;

  return (
    <section key={group.id} className="cs-scheme-group">
      
      {/* Group header (clickable) */}
      {createSchemeGroupHeader(group,isOpen)}

      {/* Group content */}
      {createSchemeGroupContent(group,isOpen)}
    </section>
  );
}

function createSchemeGroupHeader(group: BoardColorSchemeGroupDTO, isOpen :boolean ): JSX.Element | null {

  return (
      <button
        className="cs-scheme-group-header"
        onClick={() => toggleGroup(group.id)}
        aria-expanded={isOpen}
      >
        <span className={`cs-group-arrow ${isOpen ? 'open' : ''}`}>
          ▾
        </span>
        
        <h2 className="cs-scheme-group-title">
          { getIconById(group.iconId).icon}
          {group.name}
        </h2>
      </button>
    
  );
}


function createSchemeGroupContent(group: BoardColorSchemeGroupDTO, isOpen :boolean ): JSX.Element | null {
  if(!isOpen) return (<></>);
  return (
      <div className="cs-scheme-cards-container">
          {group.colorSchemes.map((scheme) => {
            return createSchemeBoard(scheme);
          })}
        </div>
  
  );
}

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

  return (
    <div className="config-page">
      <h2>Choose Your Chessboard Color Scheme</h2>
      
            <h3>Current Board Theme</h3>
      <div className="cs-scheme-cards-container">
        {currentScheme && (
          <section>
            {createSchemeBoard(currentScheme)}

          </section>
        )}
      </div>
      
      <div className="color-scheme-cards">
        {colorSchemeGroups.map((schemeGroup) => {
                  return createSchemeGroup(schemeGroup);
                })}
              </div>
    </div>
  );
};

