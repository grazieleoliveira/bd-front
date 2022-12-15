import bgImg from "../assets/images/pokedex-screen-1-fixed.png";
import { Button } from "../components/Button";
import { EPages, IPageDefaultProps } from "../types";

export function MainPage({ setPage }: IPageDefaultProps) {

// TODO: Add the code to handle the button clicks
  const handleRegister = () => {
    setPage(EPages.REGISTER_POKEMON)
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
          width: "85%",
          paddingTop: "22%",
          gap: "3vmin",
        }}
      >
        <Button onClick={handleRegister}>Registrar</Button>
        <Button onClick={handleList}>Listar</Button>
      </div>
    </div>
  );
}
