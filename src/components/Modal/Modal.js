import { createPortal } from "react-dom";
import usePortal from "../../js/usePortal";

import "./Modal.css";

const Modal = ({ id, children }) => {
  const target = usePortal(id);

  return createPortal(children, target);
};

export default Modal;
