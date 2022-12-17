import { useState } from "react";
import { PokemonProvider } from "./contexts/pokemon/context";
import { ListPokemon } from "./pages/listPokemon";
import { MainPage } from "./pages/main";
import { ManagePokemon } from "./pages/managePokemon";
import { EPages } from "./types";

function App() {
  const [page, setPage] = useState<EPages>(EPages.MAIN);
  return (
    <PokemonProvider>
      {page === EPages.MAIN && <MainPage setPage={setPage} />}
      {page === EPages.LIST_POKEMON && <ListPokemon setPage={setPage} />}
      {(page === EPages.MODIFY_POKEMON || page === EPages.REGISTER_POKEMON) && (
        <ManagePokemon setPage={setPage} type={page} />
      )}
    </PokemonProvider>
  );
}

export default App;
