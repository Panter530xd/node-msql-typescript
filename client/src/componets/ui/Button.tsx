import React from "react";
import { clsx } from "clsx";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  classNames?: string;
}

export const CancelButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  classNames,
}) => {
  return (
    <button
      className={clsx(
        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
        "border border-gray-300 dark:border-transparent",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const EditButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  classNames,
}) => {
  return (
    <button
      className={clsx(
        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
        "border border-transparent",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const DeleteButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  classNames,
}) => {
  return (
    <button
      className={clsx(
        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-gray-100 dark:hover:bg-red-600",
        "border border-transparent",
        "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
