import { PokeballLayout } from "../components/PokeballLayout";
import { EPages, IPageDefaultProps } from "../types";

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const handlePress = () => {
    setPage(EPages.MAIN);
  };

  return (
    <PokeballLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button onClick={handlePress}>GO BACK</button>
        <h1>LIST</h1>
      </div>
    </PokeballLayout>
  );
}
