import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

type Provider = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

type ProviderSelectionPageProps = {
  onBankSelect: (bank: Provider) => void;
  onBack?: () => void;
};

const predefinedProviders: Provider[] = [
  {
    id: 'p-f',
    name: 'La Banque Postale',
    url: 'https://www.labanquepostale.fr',
    logo: ''
  },
  {
    id: 'p-a',
    name: 'Crédit Agricole',
    url: 'https://www.credit-agricole.fr',
    logo: ''
  },
  {
    id: 'p-d',
    name: 'Caisse d\'Épargne',
    url: 'https://www.caisse-epargne.fr',
    logo: ''
  },
  {
    id: 'p-c',
    name: 'BNP Paribas',
    url: 'https://www.bnpparibas.fr',
    logo: ''
  },
  {
    id: 'p-g',
    name: 'Crédit Mutuel',
    url: 'https://www.creditmutuel.fr',
    logo: ''
  },
  {
    id: 'p-h',
    name: 'Boursorama',
    url: 'https://www.boursorama-banque.com',
    logo: ''
  },
  {
    id: 'p-e',
    name: 'Ma French Bank',
    url: 'https://www.frenchbank.fr',
    logo: ''
  },
  {
    id: 'p-i',
    name: 'CIC',
    url: 'https://www.cic.fr',
    logo: ''
  },
  {
    id: 'p-b',
    name: 'Société Générale',
    url: 'https://www.societegenerale.fr',
    logo: ''
  },
  {
    id: 'inst-j',
    name: 'LCL',
    url: 'https://www.lcl.fr',
    logo: ''
  },
  {
    id: 'inst-k',
    name: 'Nickel',
    url: 'https://www.compte-nickel.fr',
    logo: ''
  },
  {
    id: 'inst-l',
    name: 'Banque Populaire',
    url: 'https://www.banquepopulaire.fr',
    logo: ''
  },
  {
    id: 'inst-m',
    name: 'Revolut',
    url: 'https://www.revolut.com',
    logo: ''
  },
  {
    id: 'inst-n',
    name: 'HSBC',
    url: 'https://www.hsbc.fr',
    logo: ''
  },
  {
    id: 'inst-o',
    name: 'Carrefour Banque',
    url: 'https://www.carrefour-banque.fr',
    logo: ''
  },
  {
    id: 'inst-p',
    name: 'Fortuneo',
    url: 'https://www.fortuneo.fr',
    logo: ''
  },
  {
    id: 'inst-q',
    name: 'Monabanq',
    url: 'https://www.monabanq.com',
    logo: ''
  },
  {
    id: 'inst-r',
    name: 'Hello Bank',
    url: 'https://www.hellobank.fr',
    logo: ''
  },
  {
    id: 'inst-s',
    name: 'AXA Banque',
    url: 'https://www.axa.fr',
    logo: ''
  },
  {
    id: 'inst-t',
    name: 'BforBank',
    url: 'https://www.bforbank.com',
    logo: ''
  },
  {
    id: 'inst-u',
    name: 'BPCE',
    url: 'https://www.bpce.fr',
    logo: ''
  }
];

const ProviderSelectionPage = ({ onBankSelect, onBack }: ProviderSelectionPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customBankName, setCustomBankName] = useState('');
  const [customBankUrl, setCustomBankUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [showCustomBank, setShowCustomBank] = useState(false);
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    const fetchLogos = async () => {
      const updated = await Promise.all(
        predefinedProviders.map(async (provider) => {
          try {
            const cached = localStorage.getItem(`provider_logo_${provider.id}`);
            if (cached) {
              return { ...provider, logo: cached };
            }

            const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(provider.url)}`);
            const data = await response.json();
            const logo = data.data?.logo?.url || 'https://via.placeholder.com/32x32?text=B';

            localStorage.setItem(`provider_logo_${provider.id}`, logo);
            return { ...provider, logo };
          } catch {
            return { ...provider, logo: 'https://via.placeholder.com/32x32?text=B' };
          }
        })
      );

      setProviders(updated);
      setFilteredProviders(updated);
      setIsLoading(false);
    };

    fetchLogos();
  }, []);

  useEffect(() => {
    const filtered = providers.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(filtered);
    setShowCustomBank(searchTerm.length > 0 && filtered.length === 0);
    setCustomBankName(searchTerm);
  }, [searchTerm, providers]);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCustomSelect = async () => {
    if (!customBankUrl) {
      setUrlError('L\'URL est requise');
      return;
    }

    if (!validateUrl(customBankUrl)) {
      setUrlError('URL invalide. Exemple: https://www.mabanque.fr');
      return;
    }

    setUrlError('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(customBankUrl)}`);
      const data = await response.json();
      const logo = data.data?.logo?.url || 'https://via.placeholder.com/32x32?text=B';

      const customProvider: Provider = {
        id: customBankName.toLowerCase().replace(/\s+/g, '-'),
        name: customBankName,
        url: customBankUrl,
        logo
      };

      onBankSelect(customProvider);
    } catch {
      const customProvider: Provider = {
        id: customBankName.toLowerCase().replace(/\s+/g, '-'),
        name: customBankName,
        url: customBankUrl,
        logo: 'https://via.placeholder.com/32x32?text=B'
      };
      onBankSelect(customProvider);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen w-full">
      <header className="p-4 flex items-center justify-between md:justify-center relative border-b">
        <div className="md:absolute md:left-4">
          <BackButton onClick={handleBackClick} />
        </div>
        <div className="md:mx-auto">
          <Logo />
        </div>
        <div className="w-6 md:hidden"></div>
      </header>

      <main className="flex justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Choisissez votre banque
          </h1>

          <p className="text-gray-600 mb-6">
            Pour bénéficier pleinement de votre compte Leboncoin et pouvoir transférer votre argent de votre compte Leboncoin vers votre compte bancaire et vice-versa, vous devez obligatoirement confirmer votre compte bancaire à l'aide de vos identifiants bancaires de connexion en ligne par mesure de sécurité.
          </p>

          <div className="mb-6">
            <Input
              id="bankSearch"
              placeholder="Recherchez votre banque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-leboncoin rounded-full animate-spin border-t-transparent"></div>
              </div>
            ) : (
              <>
                {filteredProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => onBankSelect(provider)}
                    className={cn(
                      "w-full flex items-center p-4 rounded-lg border border-gray-200",
                      "hover:border-leboncoin hover:shadow-sm transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-leboncoin focus:ring-offset-2"
                    )}
                  >
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32x32?text=B';
                      }}
                    />
                    <span className="ml-4 text-gray-800">{provider.name}</span>
                    <span className="ml-auto text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                ))}

                {showCustomBank && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      Votre banque n'est pas dans la liste ? Veuillez fournir l'URL de votre banque pour effectuer l'authentification :
                    </p>
                    <div className="space-y-4">
                      <Input
                        id="bankUrl"
                        label="URL de la banque"
                        placeholder="https://www.mabanque.fr"
                        value={customBankUrl}
                        onChange={(e) => setCustomBankUrl(e.target.value)}
                        error={urlError}
                        required
                      />
                      <Button
                        onClick={handleCustomSelect}
                        fullWidth
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                            Chargement...
                          </span>
                        ) : (
                          `Continuer avec ${customBankName}`
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderSelectionPage;
