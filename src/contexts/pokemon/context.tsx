import React, {createContext, useContext} from 'react';
import { useQuery } from 'react-query';
import PokemonService from '../../services';
import { TEggGroup, TPokemonType } from '../../types/pokemon';
import { TPokemonContext } from './types';

export const PokemonContext = createContext<TPokemonContext>({eggGroups: [], types: []});

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }: React.PropsWithChildren) => {
    const { data: eggGroups } = useQuery<TEggGroup[]>(["egg-groups"], () =>
    PokemonService.getEggGroups()
  );
  const { data: types } = useQuery<TPokemonType[]>(["type"], () =>
    PokemonService.getTypes()
  );

  return (
    <PokemonContext.Provider value={{ eggGroups, types }}>
      {children}
    </PokemonContext.Provider>
  );
};