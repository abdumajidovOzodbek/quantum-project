import React from 'react';

const ErrorModal = ({ message, onClose }:any) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-sm w-full">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600">Error</h2>
                    <p className="mt-2 text-gray-600">{message}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
