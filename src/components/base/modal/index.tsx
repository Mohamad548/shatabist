

import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@/components/base/button';
import clsxm from '@/utils/clsxm';
import { modalTypes } from './types/modalTypes';
import { useModalController } from './hooks/useModalController';

export type ManageModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

const ManageModal = forwardRef<ManageModalRef, modalTypes>(
  (
    {
      children,
      triggerContent,
      actionLabel,
      cancelLabel,
      triggerClass,
      actionBtnClass,
      cancelBtnClass,
      actionBoxClass,
      modalBodyClass,
      cancelBoxClass,
      onConfirm,
      setTempSelectedAddress,
      selectedAddress,
      fadeIn,
      requireAuth,
      confirmLoading,
      classNameTrigger,
      fadeOut,
      onClose,
      className,
      setStep,
      classNameModale,
      moodCheckout,
      activeOverlay = true, // پیش‌فرض: فعال
    },
    ref
  ) => {
    const modalController = useModalController(
      fadeIn,
      fadeOut,
      onConfirm,
      moodCheckout,
      setStep,
      requireAuth,
      onClose
    );

    // ❗ اکسپورت open/close به بیرون
    useImperativeHandle(ref, () => ({
      openModal: modalController.openModal,
      closeModal: modalController.closeModal,
    }));

    return (
      <div className={clsxm('',classNameModale)}>
        {/* اختیاری: دکمه داخلی */}
        {triggerContent && (
          <div
            className={clsxm('', triggerClass)}
            onClick={modalController.openModal}
          >
            {triggerContent}
          </div>
        )}

        {modalController.isModalOpen && (
          <div
            className={clsxm(
              'flex items-center justify-center bg-black bg-opacity-50',
              className
            )}
            onClick={(e) => {
              if (activeOverlay) {
                modalController.handleOverlayClick(
                  e,
                  selectedAddress,
                  setTempSelectedAddress
                );
              }
            }}
          >
        <div
            className={clsxm(
              "relative bg-white rounded-lg shadow-lg p-6 grid ",
              fadeOut && modalController.closing
                ? fadeOut
                : fadeIn && !modalController.closing
                  ? fadeIn
                  : "",
              modalBodyClass,
              "transition-opacity duration-300 ease-in-out",
              modalController.closing ? "opacity-0" : "opacity-100",
              modalController.closing ? "scale-95" : "scale-100",
            )}
              onAnimationEnd={modalController.handleAnimationEnd}
            >
              {typeof children === 'function'
                ? children({ closeModal: modalController.closeModal })
                : children}

           {cancelLabel && (
  <div className={clsxm('', cancelBoxClass)}>
    <Button
      className={clsxm('', cancelBtnClass)}
      onClick={modalController.closeModal}
    >
      {cancelLabel}
    </Button>
  </div>
)}

{actionLabel && (
  <div className={clsxm('', actionBoxClass)}>
    <Button
      className={clsxm('', actionBtnClass)}
      onClick={modalController.handleConfirm}
      disabled={confirmLoading}
    >
      {confirmLoading ? 'در حال ارسال...' : actionLabel}
    </Button>
  </div>
)}

            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ManageModal;
