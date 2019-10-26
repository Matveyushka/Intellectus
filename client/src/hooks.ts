import { useState } from 'react';

export const useModal = (): { isShowing: boolean, toggleModal: () => void } => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleModal = (): void => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggleModal,
  };
};
