export type MenuItem = {
  label: string
  options: string[]
}

// menu.data.ts
export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Play",
    options: ["Local Game", "Online Match", "Vs Computer"],
  },
  {
    label: "Challenges",
    options: ["Daily Challenge", "Weekly Challenge", "Puzzles"],
  },
  {
    label: "Rules",
    options: ["Basic Rules", "Special Moves", "Notation"],
  },
  {
    label: "Account",
    options: ["Profile", "Stats", "Friends"],
  },
  {
    label: "Settings",
    options: ["Board Theme", "Sound", "Language"],
  },
  {
    label: "About",
    options: ["About the Project", "Credits", "Contact"],
  },
]
