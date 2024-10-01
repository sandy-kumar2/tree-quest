// components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, title, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          {children}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
