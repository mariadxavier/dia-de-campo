"use client"
import { useState } from 'react';

export function useContactModal() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  }

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  }

  return {
    isContactModalOpen,
    openContactModal,
    closeContactModal,
    toggleContactModal,
  };
}
