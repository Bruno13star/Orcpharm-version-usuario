import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
// import PriceEstimateScreen from './screens/PriceEstimateScreen'; // Removed per request
// import PharmacySelectionScreen from './screens/PharmacySelectionScreen'; // Removed per request
import CheckoutScreen from './screens/CheckoutScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';
import ChatScreen from './screens/ChatScreen';
import FormulaDetailScreen from './screens/FormulaDetailScreen';
import VideoTutorialScreen from './screens/VideoTutorialScreen';
import CartScreen from './screens/CartScreen';
import ShowcaseFormulaScreen from './screens/ShowcaseFormulaScreen';
import ProductCatalogScreen, { Product } from './screens/ProductCatalogScreen';

export type ScreenName = 
  | 'menu' 
  | 'onboarding' 
  | 'login' 
  | 'signup'
  | 'video_tutorial'
  | 'home' 
  | 'calculator'
  // | 'price_estimate' 
  // | 'pharmacy' 
  | 'formula_detail'
  | 'product_catalog'
  | 'showcase_formula'
  | 'cart'
  | 'checkout' 
  | 'status' 
  | 'chat';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('onboarding');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toggle dark class on the wrapper
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onFinish={() => setCurrentScreen('login')} />;
      case 'login':
        return (
            <LoginScreen 
                onLogin={() => setCurrentScreen('home')} 
                onSignUpClick={() => setCurrentScreen('signup')}
                onVideoClick={() => setCurrentScreen('video_tutorial')}
            />
        );
      case 'signup':
        return <SignUpScreen onBack={() => setCurrentScreen('login')} onSignUp={() => setCurrentScreen('home')} />;
      case 'video_tutorial':
        return <VideoTutorialScreen onBack={() => setCurrentScreen('login')} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'calculator':
        // Direct to Formula Detail (Summary) instead of Price Estimate
        return <CalculatorScreen onBack={() => setCurrentScreen('home')} onProceed={() => setCurrentScreen('formula_detail')} />;
      
      // Removed Steps
      // case 'price_estimate':
      //   return <PriceEstimateScreen onBack={() => setCurrentScreen('calculator')} onProceed={() => setCurrentScreen('pharmacy')} />;
      // case 'pharmacy':
      //   return <PharmacySelectionScreen onBack={() => setCurrentScreen('price_estimate')} onSelect={() => setCurrentScreen('formula_detail')} />;
      
      case 'formula_detail':
         return (
            <FormulaDetailScreen 
                onBack={() => setCurrentScreen('calculator')} 
                onAddToCart={() => setCurrentScreen('cart')}
                onCheckout={() => setCurrentScreen('checkout')}
            />
         );
      case 'product_catalog':
         return (
            <ProductCatalogScreen 
                onBack={() => setCurrentScreen('home')} 
                onSelectProduct={(product) => {
                    setSelectedProduct(product);
                    setCurrentScreen('showcase_formula');
                }}
            />
         );
      case 'showcase_formula':
         if (!selectedProduct) {
             setCurrentScreen('product_catalog');
             return null;
         }
         return (
            <ShowcaseFormulaScreen 
                product={selectedProduct}
                onBack={() => setCurrentScreen('product_catalog')} 
                onAddToCart={() => setCurrentScreen('cart')}
                onCheckout={() => setCurrentScreen('checkout')}
            />
         );
      case 'cart':
         return (
            <CartScreen 
                onBack={() => setCurrentScreen('formula_detail')} 
                onAddMore={() => setCurrentScreen('calculator')}
                onCheckout={() => setCurrentScreen('checkout')} 
            />
         );
      case 'checkout':
        return <CheckoutScreen onBack={() => setCurrentScreen('cart')} onFinish={() => setCurrentScreen('status')} />;
      case 'status':
        return <OrderStatusScreen onBack={() => setCurrentScreen('home')} onChatClick={() => setCurrentScreen('chat')} />;
      case 'chat':
        return <ChatScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <OnboardingScreen onFinish={() => setCurrentScreen('login')} />;
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-start transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md bg-white dark:bg-slate-950 min-h-screen shadow-2xl overflow-hidden relative transition-colors duration-300">
        {renderScreen()}
        
        {/* Dark Mode Toggle */}
        <button 
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 z-[9990] w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:scale-105 transition-all group"
            title="Alternar Modo Escuro"
        >
            <span className={`material-symbols-outlined text-lg transition-transform duration-500 ${darkMode ? 'rotate-180 text-yellow-400' : 'text-slate-600'}`}>
                {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </div>
    </div>
  );
}