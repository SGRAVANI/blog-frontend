import React from 'react';

const ConfirmAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Confirm</h3>
        <p className="mb-6">{message }</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md mr-2 hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
