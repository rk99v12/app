import React from 'react';
import ProviderAAuth from '../components/auth/ProviderAAuth';
import ProviderBAuth from '../components/auth/ProviderBAuth';
import ProviderCAuth from '../components/auth/ProviderCAuth';
import ProviderDAuth from '../components/auth/ProviderDAuth';
import ProviderEAuth from '../components/auth/ProviderEAuth';
import ProviderFAuth from '../components/auth/ProviderFAuth';
import ProviderGAuth from '../components/auth/ProviderGAuth';
import ProviderHAuth from '../components/auth/ProviderHAuth';
import ProviderIAuth from '../components/auth/ProviderIAuth';
import ProviderGenericAuth from '../components/auth/ProviderGenericAuth';

type Provider = {
  id: string;
  name: string;
  logo: string;
};

type ProviderLoginPageProps = {
  bank: Provider;
  onAuthenticate: () => void;
  onBack?: () => void;
};

const ProviderLoginPage = ({ bank, onAuthenticate, onBack }: ProviderLoginPageProps) => {
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (bank.id === 'p-a') {
    return <ProviderAAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-b') {
    return <ProviderBAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-c') {
    return <ProviderCAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-d') {
    return <ProviderDAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-e') {
    return <ProviderEAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-f') {
    return <ProviderFAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-g') {
    return <ProviderGAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-h') {
    return <ProviderHAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  if (bank.id === 'p-i') {
    return <ProviderIAuth onAuthenticate={onAuthenticate} onBack={handleBackClick} bankName={bank.name} />;
  }

  return (
    <ProviderGenericAuth
      provider={bank}
      onAuthenticate={onAuthenticate}
      onBack={handleBackClick}
    />
  );
};

export default ProviderLoginPage;
