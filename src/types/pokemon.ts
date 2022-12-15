export type TPokemon = {
  id: number;
  egg_group_id: number;
  weight: number;
  name: string;
};

export enum EEggGroup {
  "Monster",
  "Human-Like",
  "Water 1",
  "Water 3",
  "Bug",
  "Mineral",
  "Flying",
  "Amorphus",
  "Field",
  "Water 2",
  "Fairy",
  "Ditto",
  "Grass",
  "Dragon",
  "No Eggs Discovered",
  "Gender unknown",
}

export type TEggGroup = {
  id: number;
  egg_group: string;
};

export type TPokemonType = {
  id: number;
  type: string;
};
