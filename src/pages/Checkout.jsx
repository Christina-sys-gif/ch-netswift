// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
  const networkId = localStorage.getItem('networkId');

  if (!selectedPackage || !networkId) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10,15}$/.test(phone)) {
      setError('Please enter a valid phone number (10–15 digits)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/transactions', {
        customer_phone: phone,
        network_id: parseInt(networkId),
        package_id: selectedPackage.id
      });

      // Save transaction ID
      localStorage.setItem('transactionId', res.data.id);
      navigate('/success');
    } catch (err) {
      console.error('Checkout failed:', err);
      setError('Failed to create transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Checkout</h2>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="font-semibold dark:text-white">{selectedPackage.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            GHS {selectedPackage.price_ghs}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Mobile Number (e.g., 233241234567)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
              placeholder="233241234567"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full py-2 text-gray-600 dark:text-gray-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}