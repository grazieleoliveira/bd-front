import { ChangeEvent, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";

interface IParams {
  title: string;
  buttonLabel: string;
  endpointUrl: string;
}

interface IInfo {
  name: string;
  weight: string;
  type: string;
  eggGroup: string;
}

const getParamsAccordingToType = (type: EPages): IParams => {
  if (type === EPages.REGISTER_POKEMON) {
    return {
      title: "Registrar Pokemon",
      buttonLabel: "Registrar",
      endpointUrl: "https:/changeurltoapiurl.com",
    };
  }
  return {
    title: "Modificar Pokemon",
    buttonLabel: "Modificar",
    endpointUrl: "https:/changeurltoapiurl.com",
  };
};

export function ManagePokemon({ setPage, type }: Required<IPageDefaultProps>) {
  const { title, buttonLabel, endpointUrl } = getParamsAccordingToType(type);
  const [info, setInfo] = useState<IInfo>({
    name: "",
    weight: "",
    type: "",
    eggGroup: "",
  });

  const handleGoBack = () => {
    setPage(EPages.MAIN);
  };

  const handleSend = () => {
    // se o tipo da pagina for MODIFY_POKEMON, fazer request de PUT, se for register fazer o POST. 
    // limpar estado e voltar pra tela principal se o envio for feito feito com sucesso
    console.log(info);
  }

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.id) {
      case "name":
        setInfo({ ...info, name: evt.target.value });
        break;
      case "weight":
        setInfo({ ...info, weight: evt.target.value });
        break;
      case "type":
        setInfo({ ...info, type: evt.target.value });
        break;
      case "eggGroup":
        setInfo({ ...info, eggGroup: evt.target.value });
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
        <button
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            outline: "none",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontWeight: "bold",
            fontSize: "5vmin",
          }}
          onClick={handleGoBack}
        >
          X
        </button>
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
          <Input id="weight" placeholder="Peso" onChange={handleInput} />
          <Input id="type" placeholder="Tipo" onChange={handleInput} />
          <Input
            id="eggGroup"
            placeholder="Egg Group"
            onChange={handleInput}
          />
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
