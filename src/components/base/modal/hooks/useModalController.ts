'use client';
import { useFormReset } from '@/utils/useFormReset';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { decrementModal, incrementModal } from '../modalManager';

export const useModalController = (
  fadeIn?: string,
  fadeOut?: string,
  onConfirm?: (callback: () => void) => void,
  moodCheckout?: boolean,
  setStep?: (value: boolean) => void,
  requireAuth?: boolean,
  onClose?: () => void
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const reset = useFormReset();
  const pathname = usePathname();
  const router = useRouter();

  const openModal = () => {
    if (requireAuth) {
      const token = getCookie('token');

      if (!token) {
        const redirectUrl = encodeURIComponent(pathname);
        router.push(`/login?redirect=${redirectUrl}`);
        return;
      }
    }

    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    if (fadeIn || fadeOut) {
      setClosing(true);
    } else {
      setIsModalOpen(false);
    }

    if (reset && !moodCheckout) {
      reset();
    }

    onClose?.(); // ✅ اجرای onClose
    setStep?.(false);
  }, [fadeIn, fadeOut, reset, moodCheckout, setStep, onClose]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement>,
    selectedAddress?: any,
    setTempSelectedAddress?: (address: any) => void
  ) => {
    if (e.target === e.currentTarget) {
      if (selectedAddress) {
        setTempSelectedAddress?.(selectedAddress);
      }
      if (reset && !moodCheckout) {
        reset();
      }
      closeModal();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(() => {
        closeModal();
      });
    }
  };

  const handleAnimationEnd = () => {
    if (closing) {
      setIsModalOpen(false);
      setClosing(false);
    }
  };

  // مدیریت اسکرول برای مودال

  useEffect(() => {
    if (isModalOpen) {
      incrementModal();
    }

    return () => {
      if (isModalOpen) {
        decrementModal();
      }
    };
  }, [isModalOpen]);

  // مدیریت بسته‌شدن با کلید Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isModalOpen, closeModal]); // وابستگی به باز/بسته بودن مودال

  return {
    moodCheckout,
    isModalOpen,
    closing,
    openModal,
    closeModal,
    handleAnimationEnd,
    handleOverlayClick,
    handleConfirm,
    onClose,
  };
};
