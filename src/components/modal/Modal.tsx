import { useState, useEffect, ReactNode, FC } from "react";
import ReactDOM from "react-dom";
import scss from "./Modal.module.scss";
interface Modal {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}
const Modal: FC<Modal> = ({ isOpen, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen && (
    <div className={scss.header}>
      <div className={scss.main}>
        <button onClick={onClose}>&times;</button>
      </div>
      {children}
    </div>
  );

  return isBrowser
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ReactDOM.createPortal(
        modalContent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        document.getElementById("react-root") as any
      )
    : null;
};

export default Modal;
