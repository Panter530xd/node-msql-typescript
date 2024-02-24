import React from "react";
import { Transition } from "@headlessui/react";
import Edit from "../../images/svg/Edit.svg";
import Trash from "../../images/svg/Trash.svg";
import {
  CancelButton,
  EditButton,
  DeleteButton,
} from "../../componets/ui/Button";

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  setIsOpen,
  onDelete,
  onEdit,
}) => {
  const handleConfirm = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <Transition.Root show={isOpen} as="div">
      <div className="fixed inset-0 z-20 bg-black/50"></div>
      <Transition.Child
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
      >
        <div className="fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white dark:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Are you absolutely sure?
          </h2>
          <p className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            This action cannot be undone. This will permanently delete team
            amember and remove the data from our database.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>
            <EditButton onClick={onEdit}>
              <img src={Edit} alt="trash" width={25} height={25} />
            </EditButton>
            <DeleteButton onClick={handleConfirm}>
              <img src={Trash} alt="trash" width={25} height={25} />
            </DeleteButton>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};

export default AlertDialog;
