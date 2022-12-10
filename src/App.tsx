import bgImg from "./assets/images/pokedex-screen-1-fixed.png";

import "./App.css";

function App() {

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${bgImg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "stretch",
        backgroundRepeat: "no-repeat",
        backgroundColor: "red",
        backgroundPosition: "center",
      }}
    >
    </div>
  );
}

export default App;
