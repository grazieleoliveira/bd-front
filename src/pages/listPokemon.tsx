import { EPages, IPageDefaultProps } from "../types";

export function ListPokemon({ setPage }: IPageDefaultProps) {
  const handlePress = () => {
    setPage(EPages.MAIN);
  };

  return (
    <>
      <button onClick={handlePress}>GO BACK</button>
      <h1>LIST</h1>
    </>
  );
}
