import React from "react";

export const Button = ({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
      <button
        style={{
          background: "red",
          cursor: "pointer",
          color: "#fff",
          fontSize: '2.5vmin',
          padding: '1vmin 2vmin',
          borderRadius: '2.5vmin',
          minWidth: '20vmin',
        }}
        {...props}
      >
        {props.children}
      </button>
  );
};
