import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CloseButton } from "../components/CloseButton";
import { Input } from "../components/Input";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";
import axios from "axios";
import { TEggGroup, TPokemon, TPokemonType } from "../types/pokemon";
import { BASE_URL } from "../constants";
import Select, { ActionMeta } from "react-select";

interface IParams {
  title: string;
  buttonLabel: string;
  request: () => Promise<void>;
}

interface IInfo {
  name: string | undefined;
  weight: number | undefined;
  typesIds: number[] | undefined;
  eggGroupId: number | undefined;
}

const getRequestAccordingToType = (type: EPages, info: IInfo) => {
  if (type === EPages.MODIFY_POKEMON) {
    return async () =>
      await axios
        .put<TPokemon>(`${BASE_URL}/pokemon/`, { ...info })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
  }

  return async () =>
    await axios
      .post<TPokemon>(`${BASE_URL}/pokemon/`, { ...info })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
};

const getParamsAccordingToType = (type: EPages, info: IInfo): IParams => {
  if (type === EPages.REGISTER_POKEMON) {
    return {
      title: "Registrar Pokemon",
      buttonLabel: "Registrar",
      request: getRequestAccordingToType(type, info),
    };
  }
  return {
    title: "Modificar Pokemon",
    buttonLabel: "Modificar",
    request: getRequestAccordingToType(type, info),
  };
};

const INITIAL_INFO_VALUES = {
  name: "",
  weight: undefined,
  typesIds: undefined,
  eggGroupId: undefined,
};

export function ManagePokemon({ setPage, type }: Required<IPageDefaultProps>) {
  const [info, setInfo] = useState<IInfo>(INITIAL_INFO_VALUES);
  const [eggGroups, setEggGroups] = useState([]);
  const [types, setTypes] = useState([]);
  const { title, buttonLabel, request } = getParamsAccordingToType(type, info);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/egg-group/`)
      .then((response) => {
        setEggGroups(
          response.data.map((item: TEggGroup) => ({
            value: item.id,
            label: item.egg_group,
          }))
        );
      })
      .catch((err) => console.log("err", err));

    axios
      .get(`${BASE_URL}/types/`)
      .then((response) => {
        setTypes(
          response.data.map((item: TPokemonType) => ({
            value: item.id,
            label: item.type,
          }))
        );
        console.log("response", response.data);
      })
      .catch((err) => console.log("err", err));
  }, []);



  const handleGoBack = () => {
    setPage(EPages.MAIN);
  };

  const handleSend = () => {
    request();
    setInfo(INITIAL_INFO_VALUES);
    console.log(info);
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.id) {
      case "name":
        setInfo({ ...info, name: evt.target.value });
        break;
      case "weight":
        setInfo({ ...info, weight: Number(evt.target.value) });
        break;
    }
  };

  const handleSelect = (
    newValue: any,
    actionMeta: ActionMeta<never>
  ) => {
    switch (actionMeta.name) {
      case "type":
        setInfo({ ...info, typesIds: [Number(newValue.value)] });
        break;
      case "eggGroup":
        setInfo({ ...info, eggGroupId: Number(newValue.value) });
        break;
    }
  };

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
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingBottom: "4vmin",
          }}
        >
          <h1 style={{ color: "#fff" }}>{title}</h1>
        </div>
        <div style={{ display: "flex", gap: "4vmin", flexDirection: "column" }}>
          <Input id="name" placeholder="Nome" onChange={handleInput} />
          <Input id="weight" placeholder="Peso(kg)" onChange={handleInput} />
          <Select placeholder="Tipo" name="type" options={types} onChange={handleSelect} />
          <Select placeholder="EggGroup" name="eggGroup" options={eggGroups} onChange={handleSelect} />
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingTop: "4vmin",
          }}
        >
          <Button onClick={handleSend}>{buttonLabel}</Button>
        </div>
      </div>
    </PokeballLayout>
  );
}
