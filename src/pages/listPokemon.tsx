import { CloseButton } from "../components/CloseButton";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";
import { useState } from "react";
import { EEggGroup, TPokemon } from "../types/pokemon";
import { useQuery } from "react-query";
import PokemonService from "../services";
import Select, { ActionMeta } from "react-select";
import { normalizeTypes, normalizeEggGroups } from "../helpers/parser";
import { usePokemon } from "../contexts/pokemon/context";
import { Button } from "../components/Button";
import { handleUrlQueryParamsByType } from "../helpers/handlers";

interface ISearchInfo {
  eggGroupId: number | undefined;
  typesIds: number | undefined;
}

export enum ESearchType {
  ALL = "ALL",
  TYPE = "TYPE",
  EGG_GROUP = "EGG_GROUP",
}

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const [id, setId] = useState<number>();

  const [searchType, setSearchType] = useState<ESearchType>(ESearchType.ALL);
  const { data: pokemons, refetch: refetchPokemon } = useQuery<TPokemon[]>(
    ["pokemon", id, searchType],
    () => PokemonService.getPokemons(handleUrlQueryParamsByType(searchType, id))
  );

  const { eggGroups, types } = usePokemon();

  const handleGoBack = () => {
    setPage(EPages.MAIN);
  };

  const handleSearchPokemonByType = (type: ESearchType) => {
    if (type === ESearchType.ALL) {
      refetchPokemon();
      setSearchType(ESearchType.ALL);
    }
    if (type === ESearchType.EGG_GROUP) {
      setSearchType(ESearchType.EGG_GROUP);
    }
    if (type === ESearchType.TYPE) {
      setSearchType(ESearchType.TYPE);
    }
  };

  const handleSelect = (newValue: any, actionMeta: ActionMeta<never>) => {
    switch (actionMeta.name) {
      case "type":
        setId(Number(newValue.value));
        break;
      case "eggGroup":
        setId(Number(newValue.value));
        break;
    }
  };
  return (
    <PokeballLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "15vmin",
          paddingTop: "15vmin",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <CloseButton onClick={handleGoBack} />
        <div
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            display: "flex",
            paddingBottom: "4vmin",
            flexDirection: "column",
            width: "32vw",
          }}
        >
          <div>
            <h1 style={{ color: "#fff" }}>Desejo buscar...</h1>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => handleSearchPokemonByType(ESearchType.ALL)}
              >
                Todos os pokemons cadastrados
              </Button>
              {searchType === ESearchType.ALL && <h4>SELECIONADO</h4>}
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={() => handleSearchPokemonByType(ESearchType.EGG_GROUP)}
              >
                Pokemon por eggGroup
              </Button>
              {searchType === ESearchType.EGG_GROUP && <h4>SELECIONADO</h4>}
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={() => handleSearchPokemonByType(ESearchType.TYPE)}
              >
                Pokemon por tipo
              </Button>
              {searchType === ESearchType.TYPE && <h4>SELECIONADO</h4>}
            </div>
          </div>

          {searchType === ESearchType.TYPE && (
            <Select
              placeholder="Tipo"
              name="type"
              options={normalizeTypes(types) as any}
              onChange={handleSelect}
            />
          )}
          {searchType === ESearchType.EGG_GROUP && (
            <Select
              placeholder="EggGroup"
              name="eggGroup"
              options={normalizeEggGroups(eggGroups) as any}
              onChange={handleSelect}
            />
          )}
        </div>
        <div style={{ overflowY: "auto", maxHeight: 500, width: 250, paddingRight: '3.5rem', scrollbarWidth: 'thin'}}>
          {pokemons?.map((pokemon) => (
            <div key={pokemon.id}>
              <div style={{ boxShadow: '0px 10px 5px -3px rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem', backgroundColor: 'white' }}>
                <p style={{fontWeight: 'bold'}}>Nome: {pokemon.name}</p>
                <p style={{fontWeight: 'bold'}}>Peso: {pokemon.weight}kg</p>
                <p style={{fontWeight: 'bold'}}>EggGroup: {EEggGroup[pokemon.egg_group_id - 1]}</p>
                <div style={{ height: 20 }} />
              </div>
              <div style={{ height: "2.5vh" }} />
            </div>
          ))}
        </div>
      </div>
    </PokeballLayout>
  );
}
