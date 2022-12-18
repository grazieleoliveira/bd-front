import ReactModal from "react-modal";

export const Modal = ({ children, ...rest }: ReactModal.Props) => {
  return <ReactModal {...rest}>{children}</ReactModal>;
};
