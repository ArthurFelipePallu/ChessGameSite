import "./styles.css"
import { useContext, useState } from 'react';
import { getIconById } from "../../../services/icon-service";
import PieceSetCard from "../PieceSetCard";
import { ContextSelectedBoardConfiguration } from "../../../utils/Contexts/boardConfig-context";
import { getAllSpriteSheetGroups } from "../../../services/pieceSpriteSheet-service";
import type { SpriteSheetDTO, SpriteSheetGroupDTO, PieceSetCardDTO } from "../../../models/ConfigurationModels/SpriteSheetConfigDTO";

export default function ChessConfigSpriteSheetSelection(){

  const spriteSheetGroups = getAllSpriteSheetGroups();
  const [openGroupId, setOpenGroupId] = useState<string | null>("classic");
  const [selectedSpriteSheetId, setSelectedSpriteSheetId] = useState<string>(''); // Track the selected color scheme by its ID
  const { setContextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);


  // Handle the selection of a color scheme
  const handleCardClick = (id: string) => {
    setSelectedSpriteSheetId(id);
    setContextSelectedPiecesSpriteSheetId(id);
  };

  const toggleGroup = (groupId: string) => {
  setOpenGroupId(prev =>
    prev === groupId ? null : groupId
  );
}

function createSpriteSheetGroup(group: SpriteSheetGroupDTO ): JSX.Element | null {
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

function createSchemeGroupHeader(group: SpriteSheetGroupDTO, isOpen :boolean ): JSX.Element | null {

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
          {/* { getIconById(group.iconId).icon} */}
          {group.name}
        </h2>
      </button>
    
  );
}


function createSchemeGroupContent(group: SpriteSheetGroupDTO, isOpen :boolean ): JSX.Element | null {
  if(!isOpen) return (<></>);
  return (
      <div className="cs-scheme-cards-container">
          {group.spriteSheets.map((sheet) => {
            return createSchemeBoard(sheet);
          })}
        </div>
  
  );
}

function createSchemeBoard(scheme: SpriteSheetDTO | null): JSX.Element | null {
  if (!scheme) return null;

  const cardDTO: PieceSetCardDTO = {
    spriteSheetId: scheme.id,
    spriteSheetName: scheme.name,
    onClick: handleCardClick,
    isSelected: scheme.id === selectedSpriteSheetId
  };

  return (
    <PieceSetCard
      spriteSheetInfo={cardDTO}
    />
  );
}

  return (
    <div className="config-page">
      <h2>Choose Your Piece Set</h2>
      <div className="color-scheme-cards">
        {spriteSheetGroups.map((spriteSheetGroup) => {
                  return createSpriteSheetGroup(spriteSheetGroup);
                })}
              </div>
    </div>
  );
};

