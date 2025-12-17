// src/pages/Success.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Success() {
  const navigate = useNavigate();
  const transactionId = localStorage.getItem('transactionId');

  useEffect(() => {
    // Clear after 30 seconds or on navigation
    const timer = setTimeout(() => {
      localStorage.removeItem('selectedPackage');
      localStorage.removeItem('networkId');
      localStorage.removeItem('transactionId');
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          ✅
        </div>
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Payment Initiated!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Your transaction ID: <code className="bg-gray-200 dark:bg-gray-800 p-1 rounded">{transactionId}</code>
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please complete payment via the prompt from your network.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Buy Another Package
        </button>
      </div>
    </div>
  );
}