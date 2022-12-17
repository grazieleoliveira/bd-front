import { TEggGroup, TPokemonType } from "../types/pokemon";

type OptionType = {
  value: number;
  label: string;
};

export const normalizeEggGroups = (eggGroup?: TEggGroup[]) => {
  return (
    eggGroup?.map((item: TEggGroup) => ({
      value: item.id,
      label: item.egg_group,
    })) 
  );
};

export const normalizeTypes = (type?: TPokemonType[]) => {
  return type?.map((item: TPokemonType) => ({
    value: item.id,
    label: item.type,
  }));
};
