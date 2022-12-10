import { EPages, IPageDefaultProps } from "../types";

export function ManagePokemon({ setPage }: IPageDefaultProps) {
  const handlePress = () => {
    setPage(EPages.MAIN);
  };
  return <>
      <button onClick={handlePress}>GO BACK</button>
    <h1>MANAGE</h1>
  </>;
}
