import React from "react";

export const CloseButton = ({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        outline: "none",
        cursor: "pointer",
        background: "transparent",
        border: "none",
        fontWeight: "bold",
        fontSize: "5vmin",
      }}
      {...props}
    >
      X
    </button>
  );
};
