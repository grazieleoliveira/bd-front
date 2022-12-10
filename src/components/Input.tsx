import React from "react";

export const Input = ({
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input
      style={{
        background: "#f8f8f8",
        fontSize: "2.5vmin",
        padding: "1vmin 2vmin",
        borderRadius: "1.5vmin",
        minWidth: "20vmin",
        color: '#928A8A',
        border: 'none',
        outline: 'none',
      }}
      {...props}
    >
      {props.children}
    </input>
  );
};
