import { CloseButton } from "../components/CloseButton";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { EEggGroup, TPokemon } from "../types/pokemon";

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const [pokemons, setPokemons] = useState<TPokemon[]>();

  const handleGoBack = () => {
    setPage(EPages.MAIN);
  };

  useEffect(() => {
    axios
      .get<TPokemon[]>(`${BASE_URL}/pokemon/`)
      .then((response) => {
        setPokemons(response.data);
        console.log("response", response.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <PokeballLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "15vmin",
          paddingTop: "15vmin",
        }}
      >
        <CloseButton onClick={handleGoBack} />
        <div style={{ overflowY: "auto", maxHeight: 650, width: 250 }}>
        {pokemons?.map((pokemon) => (
            <>
              <p>Nome: {pokemon.name}</p>
              <p>Peso: {pokemon.weight}kg</p>
              <p>EggGroup: {EEggGroup[pokemon.egg_group_id - 1]}</p>
              <div style={{height: 20}}/>
            </>
          ))}
        </div>
      </div>
    </PokeballLayout>
  );
}
