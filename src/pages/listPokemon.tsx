import { CloseButton } from "../components/CloseButton";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";
import { ChangeEvent, useState } from "react";
import { EEggGroup, TPokemon } from "../types/pokemon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PokemonService from "../services";
import Select, { ActionMeta } from "react-select";
import { normalizeTypes, normalizeEggGroups } from "../helpers/parser";
import { usePokemon } from "../contexts/pokemon/context";
import { Button } from "../components/Button";
import { handleUrlQueryParamsByType } from "../helpers/handlers";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { IInfo, INITIAL_INFO_VALUES } from "./managePokemon";

interface ISearchInfo {
  eggGroupId: number | undefined;
  typesIds: number | undefined;
}

export enum ESearchType {
  ALL = "ALL",
  TYPE = "TYPE",
  EGG_GROUP = "EGG_GROUP",
}

type TEditInfo = IInfo & {
  id: number | undefined;
};

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const [id, setId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInfo, setEditInfo] = useState<TEditInfo>({
    ...INITIAL_INFO_VALUES,
    id: undefined,
  });

  const [currentEditingPokemon, setCurrentEditingPokemon] =
    useState<Required<TPokemon>>();

  const [searchType, setSearchType] = useState<ESearchType>(ESearchType.ALL);
  const { data: pokemons, refetch: refetchPokemon } = useQuery<TPokemon[]>(
    ["pokemon", id, searchType],
    () => PokemonService.getPokemons(handleUrlQueryParamsByType(searchType, id))
  );

  const { mutate } = useMutation(PokemonService.editPokemon, {
    onSuccess: () => {
      setIsModalOpen(false);
    },
  });

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

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.id) {
      case "name":
        setEditInfo({ ...editInfo, name: evt.target.value });
        break;
      case "weight":
        setEditInfo({ ...editInfo, weight: Number(evt.target.value) });
        break;
    }
  };

  const handleEditSelect = (newValue: any, actionMeta: ActionMeta<never>) => {
    switch (actionMeta.name) {
      case "type":
        setEditInfo({
          ...editInfo,
          typesIds: newValue.map(
            (item: { value: number; label: string }) => item.value
          ),
        });
        break;
      case "eggGroup":
        setEditInfo({ ...editInfo, eggGroupId: Number(newValue.value) });
        break;
    }
  };
  return (
    <>
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
                  onClick={() =>
                    handleSearchPokemonByType(ESearchType.EGG_GROUP)
                  }
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
          <div
            style={{
              overflowY: "auto",
              maxHeight: 500,
              width: 250,
              paddingRight: "3.5rem",
              scrollbarWidth: "thin",
            }}
          >
            {pokemons?.map((pokemon) => (
              <div key={pokemon.id}>
                <div
                  style={{
                    boxShadow: "0px 10px 5px -3px rgba(0,0,0,0.3)",
                    padding: "1rem",
                    borderRadius: "1rem",
                    backgroundColor: "white",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>Nome: {pokemon.name}</p>
                  <p style={{ fontWeight: "bold" }}>Peso: {pokemon.weight}kg</p>
                  <p style={{ fontWeight: "bold" }}>
                    EggGroup: {EEggGroup[pokemon.egg_group_id - 1]}
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                      setCurrentEditingPokemon(pokemon);
                      setEditInfo({ ...editInfo, id: pokemon.id });
                    }}
                    style={{ marginTop: "1rem" }}
                  >
                    Editar
                  </button>
                </div>
                <div style={{ height: "2.5vh" }} />
              </div>
            ))}
          </div>
        </div>
      </PokeballLayout>
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick
        style={{
          overlay: { backgroundColor: "rgba(94, 94, 94, 0.75)" },
          content: {
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            width: "30vw",
            backgroundColor: "white",
          },
        }}
      >
        <h1>Dados atuais do pokemon</h1>
        <p style={{ fontWeight: "bold" }}>
          Nome: {currentEditingPokemon?.name}
        </p>
        <p style={{ fontWeight: "bold" }}>
          Peso: {currentEditingPokemon?.weight}kg
        </p>
        <p style={{ fontWeight: "bold" }}>
          EggGroup:{" "}
          {currentEditingPokemon?.egg_group_id &&
            EEggGroup[currentEditingPokemon!.egg_group_id - 1]}
        </p>
        <div style={{ height: "6vh" }} />
        <h1>Editar Pokemon</h1>
        <div
          style={{
            gap: "3vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input id="name" placeholder="Nome" onChange={handleInput} />
          <Input id="weight" placeholder="Peso(kg)" onChange={handleInput} />
          <Select
            placeholder="Tipo"
            name="type"
            options={normalizeTypes(types) as any}
            onChange={handleEditSelect}
            isMulti
          />
          <Select
            placeholder="EggGroup"
            name="eggGroup"
            options={normalizeEggGroups(eggGroups) as any}
            onChange={handleEditSelect}
          />
          <div style={{ height: "6vh" }} />
          <Button onClick={() => mutate(editInfo)}>Concluir</Button>
        </div>
      </Modal>
    </>
  );
}
