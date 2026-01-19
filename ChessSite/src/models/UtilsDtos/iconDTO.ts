export type IconDTO = {
  id: string;
  icon: string;
};

export type IconCategoryDTO = {
  category: string;
  icons: IconDTO[];
};

export type LinkIconDTO = {
  iconId:string;
  path:string;
}