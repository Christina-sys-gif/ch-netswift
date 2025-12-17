// src/pages/Packages.jsx
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';

export default function Packages() {
  const { t } = useTranslation();
  const { networkId } = useParams();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [networkName, setNetworkName] = useState('');

  useEffect(() => {
    // Fetch packages
    api.get(`/packages?networkId=${networkId}`)
      .then(res => {
        setPackages(res.data);
        // Get network name from code
        const codeMap = {
          'MTN_GH': 'mtn_gh',
          'AT_GH': 'at_gh',
          'TEL_GH': 'tel_gh'
        };
        const code = res.data[0]?.network_id === 1 ? 'MTN_GH' :
                     res.data[0]?.network_id === 2 ? 'AT_GH' : 'TEL_GH';
        setNetworkName(t(codeMap[code] || 'network'));
      })
      .catch(err => {
        console.error('Failed to load packages:', err);
        navigate('/');
      });
  }, [networkId, navigate, t]);

  const handleSelect = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    localStorage.setItem('networkId', networkId);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {t('selectPackage')} for {networkName}
        </h2>
        <div className="space-y-4">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              onClick={() => handleSelect(pkg)}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{pkg.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {pkg.data_mb} MB • {pkg.validity_days} days
                  </p>
                </div>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  GHS {pkg.price_ghs}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full py-3 text-center text-gray-600 dark:text-gray-300"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
}