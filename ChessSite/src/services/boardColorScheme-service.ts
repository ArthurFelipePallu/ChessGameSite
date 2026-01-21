import {
  type BoardColorSchemeDTO,
  type BoardColorSchemeGroupDTO
} from "../models/ConfigurationModels/BoardColorSchemeDTO";

import boardColorSchemeData from "../data/JSON/boardColorScheme.json";


const defaultBoardColorScheme:BoardColorSchemeDTO ={
  id: "midnight-blue",
  name: "Midnight Blue",
  white: "#FFFFFF",
  black: "#000000",
  highlightedWhite: "#FFEB3B",
  highlightedBlack: "#FFC107",
  possibleMoveHighlight: "#00E676"
}
/* ======================================================
   Internal Maps (built once)
====================================================== */

const boardColorSchemeGroupMap: Record<string, BoardColorSchemeGroupDTO> = {};
const boardColorSchemeMap: Record<string, BoardColorSchemeDTO> = {};

(boardColorSchemeData as BoardColorSchemeGroupDTO[]).forEach(group => {
  boardColorSchemeGroupMap[group.id] = group;

  group.colorSchemes.forEach(scheme => {
    boardColorSchemeMap[scheme.id] = scheme;
  });
});

/* ======================================================
   Public API
====================================================== */

/** Get all color scheme groups (for UI lists, selectors, etc.) */
export function getAllBoardColorSchemeGroups(): BoardColorSchemeGroupDTO[] {
  return boardColorSchemeData as BoardColorSchemeGroupDTO[];
}

/** Get all scheme IDs (flat list) */
export function getAllBoardColorSchemeIds(): string[] {
  return Object.keys(boardColorSchemeMap);
}

/** Get a scheme by its ID */
export function getBoardColorSchemeById(id: string): BoardColorSchemeDTO {
  return boardColorSchemeMap[id] || defaultBoardColorScheme;
}

/** Get a group by its ID */
export function getBoardColorSchemeGroupById(id: string): BoardColorSchemeGroupDTO | undefined {
  return boardColorSchemeGroupMap[id];
}

