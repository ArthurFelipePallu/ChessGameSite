import iconsData from "../data/JSON/icons.json";
import {type IconDTO,type IconCategoryDTO} from "../models/UtilsDtos/iconDTO";



/* ======================================================
   Internal Maps (built once)
====================================================== */

const iconsGroupMap: Record<string, IconCategoryDTO> = {};
const iconsMap: Record<string, IconDTO> = {};

(iconsData as IconCategoryDTO[]).forEach(cat => {
  iconsGroupMap[cat.category] = cat;

  cat.icons.forEach(icon => {
    iconsMap[icon.id] = icon;
  });
});


/* ======================================================
   Public API
====================================================== */

/** Get all color scheme groups (for UI lists, selectors, etc.) */
export function getAllIconsCategories(): IconCategoryDTO[] {
  return iconsData as IconCategoryDTO[];
}

/** Get all scheme IDs (flat list) */
export function getAllIconsCategoryIds(): string[] {
  return Object.keys(iconsGroupMap);
}

/** Get a scheme by its ID */
export function getIconById(id: string): IconDTO {
  return iconsMap[id] || 'x';
}

/** Get a group by its ID */
export function getIconsCategoryById(id: string): IconCategoryDTO | undefined {
  return iconsGroupMap[id];
}

