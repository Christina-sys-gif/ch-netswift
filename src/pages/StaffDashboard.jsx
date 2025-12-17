// src/pages/StaffDashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api'; // Ensure this uses your centralized API instance
import { useNavigate } from 'react-router-dom';
// Note: Using api from '../api' instead of axios directly for consistency
// If you need axios specifically, uncomment the line below:
// import axios from 'axios';

export default function StaffDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Network and Package Mappings
  // Note: These should ideally be fetched from your backend API to avoid hardcoding
  const NETWORKS = {
    1: 'MTN Ghana',
    2: 'AirtelTigo',
    3: 'Telecel Ghana',
  };

  const PACKAGES = {
    1: '1GB Data',
    2: '500MB Data',
    3: '2GB Data',
    4: '5GB Data',
    // Add more packages as needed, ideally fetched from backend
  };

  // Approve Transaction Handler
  const handleApprove = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Session expired. Please log in again.');
        navigate('/staff/login');
        return;
      }

      // Use the centralized api instance
      const response = await api.post(`/transactions/${transactionId}/approve`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the local state to reflect the change
      setTransactions(prev => prev.map(tx =>
        tx.id === transactionId ? { ...tx, status: 'disbursed' } : tx
      ));

      alert('✅Transaction approved successfully!');
    } catch (err) {
      console.error("Error approving transaction:", err);
      alert('❌Failed to approve transaction. Please try again.');
    }
  };

  // Reject Transaction Handler
  const handleReject = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Session expired. Please log in again.');
        navigate('/staff/login');
        return;
      }

      // Use the centralized api instance
      const response = await api.post(`/transactions/${transactionId}/reject`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the local state to reflect the change
      setTransactions(prev => prev.map(tx =>
        tx.id === transactionId ? { ...tx, status: 'rejected' } : tx
      ));

      alert('✅Transaction rejected successfully!');
    } catch (err) {
      console.error("Error rejecting transaction:", err);
      alert('❌Failed to reject transaction. Please try again.');
    }
  };

  // Fetch transactions on load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/staff/login');
          return;
        }

        // Use the centralized api instance
        const res = await api.get('/transactions', { // Changed from axios.get to api.get
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load transactions');
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/staff/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  // Disburse data (Legacy function, might be replaced by approve/reject)
  const handleDisburse = async (id) => {
    try {
      const token = localStorage.getItem('token');
      // Use the centralized api instance
      await api.post(
        `/transactions/disburse/${id}`, // Updated path to match backend route
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistically update UI
      setTransactions(transactions.map(t =>
        t.id === id ? { ...t, status: 'disbursed', disbursed_at: new Date().toISOString() } : t
      ));
    } catch (err) {
      alert('Disbursement failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/staff/login');
  };

  if (loading) return <div className="p-8 text-center">Loading transactions...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">CH Interprise — Staff Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Transactions</h2>
        {/* Merged table rendering logic */}
        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            // Show message if no transactions
            <p className="text-center p-4 text-gray-500 dark:text-gray-400">No transactions found.</p>
          ) : (
            // Show table if transactions exist
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Network</th>
                  <th className="py-2 px-4 text-left">Package</th>
                  <th className="py-2 px-4 text-left">Amount (GHS)</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
  {transactions.map((tx) => (
    <tr key={tx.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
      <td className="py-2 px-4">{tx.customer_phone}</td>
      <td className="py-2 px-4">{NETWORKS[tx.network_id] || tx.network_id}</td>
      <td className="py-2 px-4">{PACKAGES[tx.package_id] || tx.package_id}</td>
      <td className="py-2 px-4">{tx.amount_paid}</td>
      <td className="py-2 px-4">
        <span className={`px-2 py-1 rounded text-xs ${
          tx.status === 'pending' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          tx.status === 'disbursed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          tx.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {tx.status}
        </span>
      </td>
      <td className="py-2 px-4">
        {tx.status === 'pending' && (
          <>
            <button
              onClick={() => handleApprove(tx.id)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(tx.id)}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Reject
            </button>
          </>
        )}
        {tx.status === 'paid' && (
          <span className="text-gray-500 text-sm capitalize">{tx.status}</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}