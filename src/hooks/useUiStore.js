import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch((onOpenDateModal()));
  };

  const closeDateModal = () => dispatch((onCloseDateModal()))

  const toggleModal = () =>{
   (isDateModalOpen)
   ? openDateModal()
   :closeDateModal()
  }

  return {
    // Propiedades
    isDateModalOpen,
    // Metodos
    openDateModal,
    closeDateModal
  };
};
