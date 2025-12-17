// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext'; // ✅ Import provider
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

function App() {
  return (
    // ✅ Wrap entire app with DarkModeProvider
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <BrowserRouter>
          <Header />
          <main className="grow">
            <Routes>
              {/* Customer-facing routes */}
              <Route path="/" element={<Home />} />
              <Route path="/packages/:networkId" element={<Packages />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />

              {/* Staff routes */}
              <Route path="/staff/login" element={<StaffLogin />} />
              <Route
                path="/staff/dashboard"
                element={
                  <ProtectedRoute>
                    <StaffDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Legal Pages */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </DarkModeProvider>
  );
}

export default App;