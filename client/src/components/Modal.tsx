import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface ModalProps {
  isShowing: boolean;
  toggleModal: () => void;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps): React.ReactElement | null => {
  const { isShowing, toggleModal, children } = props;

  return isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal">
          <div className="modal-bg" onClick={() => toggleModal()} />
          <div className="modal-body">{children}</div>
        </div>
      </>,
      document.body,
    )
    : null;
};
