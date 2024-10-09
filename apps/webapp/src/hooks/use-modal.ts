// hooks/useModal.js
import { useCallback, useMemo, useState } from "react";

type ModalType = "add" | "edit" | "delete" | null;

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const openModal = useCallback((type: ModalType, id: number | null = null) => {
    setModalType(type);
    setUserId(id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalType(null);
    setUserId(null);
  }, []);

  return useMemo(
    () => ({ isOpen, modalType, userId, openModal, closeModal }),
    [isOpen, modalType, userId, openModal, closeModal],
  );
}
