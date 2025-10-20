let openModalsCount = 0;

export const incrementModal = () => {
  openModalsCount++;
  if (openModalsCount === 1) {
    document.body.classList.add('lock-body-scroll');
  }
};

export const decrementModal = () => {
  if (openModalsCount > 0) {
    openModalsCount--;
  }
  if (openModalsCount === 0) {
    document.body.classList.remove('lock-body-scroll');
  }
};

export const resetModalCount = () => {
  openModalsCount = 0;
  document.body.classList.remove('lock-body-scroll');
};
