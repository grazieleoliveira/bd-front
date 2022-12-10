import { CloseButton } from "../components/CloseButton";
import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const handleGoBack = () => {
    setPage(EPages.MAIN);
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
        <CloseButton onClick={handleGoBack}/>
        <h1>LIST</h1>
      </div>
    </PokeballLayout>
  );
}
