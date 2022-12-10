import bgImg from "../assets/images/pokedex-screen-1-fixed.png";

export function MainPage() {

// TODO: Add the code to handle the button clicks
  const handleRegister = () => {
    console.log("Register");
  };

  const handleList = () => {
    console.log("List");
  };

  const handleModify = () => {
    console.log("Modify");
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
        backgroundColor: "red",
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
        <button>Registrar</button>
        <button>Listar</button>
        <button>Modificar</button>
      </div>
    </div>
  );
}
