import React, { useState } from 'react';
import Logo from '../components/Logo';
import { CheckCircle, Phone, Mail, X } from 'lucide-react';

const ProcessingPage = () => {
  const [phase, setPhase] = useState<'processing' | 'success'>('processing');
  const [notifPhone, setNotifPhone] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  // Simulate transition to success after 3s
  React.useEffect(() => {
    const t = setTimeout(() => setPhase('success'), 3000);
    return () => clearTimeout(t);
  }, []);

  if (phase === 'processing') {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex items-center justify-center border-b">
          <Logo />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 animate-ping bg-gray-200 rounded-full opacity-60"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                <div className="w-10 h-10 border-4 border-gray-400 rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-3">Traitement en cours</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Votre demande est en cours de traitement. Veuillez patienter, cela peut prendre quelques instants.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex items-center justify-center border-b">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Success icon */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-500" strokeWidth={1.8} />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Succès</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Transaction en cours de traitement. Vous allez recevoir une notification à la fin du traitement.
            </p>
          </div>

          {/* Notification preference */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">Comment souhaitez-vous être notifié ?</p>

            <button
              type="button"
              onClick={() => setNotifPhone(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Téléphone</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${notifPhone ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${notifPhone ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setNotifEmail(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Email</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${notifEmail ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${notifEmail ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => window.close()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            <X className="w-4 h-4" />
            Fermer
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProcessingPage;
