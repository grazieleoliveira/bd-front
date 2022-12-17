import { TEggGroup, TPokemonType } from "../../types/pokemon";

export interface TPokemonContext {
  eggGroups: TEggGroup[] | undefined;
  types: TPokemonType[] | undefined;
}
