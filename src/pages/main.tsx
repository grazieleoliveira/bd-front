import bgImg from "../assets/images/pokedex-screen-1-fixed.png";
import { EPages, IPageDefaultProps } from "../types";

export function MainPage({ setPage }: IPageDefaultProps) {

// TODO: Add the code to handle the button clicks
  const handleRegister = () => {
    setPage(EPages.MODIFY_POKEMON)
  };

  const handleList = () => {
    setPage(EPages.LIST_POKEMON)
  };

  const handleModify = () => {
    setPage(EPages.MODIFY_POKEMON)
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${bgImg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ef4a46",
        backgroundPosition: "center",
        
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          paddingTop: "22%",
          gap: "6%",
        }}
      >
        <button onClick={handleRegister}>Registrar</button>
        <button onClick={handleList}>Listar</button>
        <button onClick={handleModify}>Modificar</button>
      </div>
    </div>
  );
}
