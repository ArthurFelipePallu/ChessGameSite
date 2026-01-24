import "./styles.css"
import { useContext, useState } from 'react';
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
    <section key={group.id} className="cs-piece-set-group">
      
      {/* Group header (clickable) */}
      {createSpriteSheetGroupHeader(group,isOpen)}

      {/* Group content */}
      {createSpriteSheetGroupContent(group,isOpen)}
    </section>
  );
}

function createSpriteSheetGroupHeader(group: SpriteSheetGroupDTO, isOpen :boolean ): JSX.Element | null {

  return (
      <button
        className="cs-piece-set-group-header"
        onClick={() => toggleGroup(group.id)}
        aria-expanded={isOpen}
      >
        <span className={`cs-group-arrow ${isOpen ? 'open' : ''}`}>
          ▾
        </span>
        
        <h2 className="cs-piece-set-group-title">
          {/* { getIconById(group.iconId).icon} */}
          {group.name}
        </h2>
      </button>
    
  );
}


function createSpriteSheetGroupContent(group: SpriteSheetGroupDTO, isOpen :boolean ): JSX.Element | null {
  if(!isOpen) return (<></>);

  return (
      <div className="cs-piece-set-cards-container">
          {group.spriteSheets.map((sheet) => {
            return createPieceSetCard(sheet);
          })}
        </div>
  
  );
}

function createPieceSetCard(sheet: SpriteSheetDTO | null): JSX.Element | null {

  if (!sheet) return null;

  const cardDTO: PieceSetCardDTO = {
    spriteSheetId: sheet.id,
    spriteSheetName: sheet.name,
    onClick: handleCardClick,
    isSelected: sheet.id === selectedSpriteSheetId
  };

  return (
    <PieceSetCard 
      key={sheet.id}
      spriteSheetInfo={cardDTO}
    />
  );
}
        

  return (
    <div className="config-page">
      <h2>Choose Your Piece Set</h2>
      <div className="piece-set-cards">
        
        {spriteSheetGroups.map((spriteSheetGroup) => {
          
                  return createSpriteSheetGroup(spriteSheetGroup);
                })}
              </div>
    </div>
  );
};

