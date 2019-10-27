import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalState } from './initialState';
import { State } from '../../store';
import { hideModal } from './actions';

export interface ModalProps {
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps): React.ReactElement | null => {
  const dispatch = useDispatch();
  const { children } = props;
  const {
    isModalOpen,
  } = useSelector<State, ModalState>(state => state.modal);

  return isModalOpen
    ? ReactDOM.createPortal(
      <>
        <div className="modal">
          <div className="modal-bg" onClick={() => dispatch(hideModal())} />
          <div className="modal-body">{children}</div>
        </div>
      </>,
      document.body,
    )
    : null;
};
