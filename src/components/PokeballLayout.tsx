import React, { FC } from "react";
import pokeballBg from "../assets/images/pokeball-inside-bg.png";

export const PokeballLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundImage:
          "linear-gradient(90deg, rgba(193,32,38,1) 71%, rgba(0,0,0,1) 71.8%,rgba(0,0,0,1) 74%, rgba(255,255,255,1) 73%)",
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${pokeballBg})`,
          width: "100vw",
          height: "100vh",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
