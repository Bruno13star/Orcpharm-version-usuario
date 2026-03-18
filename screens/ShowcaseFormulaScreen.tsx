import React, { useState } from 'react';
import { Product } from './ProductCatalogScreen';

interface Props {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
  onCheckout: () => void;
}

export default function ShowcaseFormulaScreen({ product, onBack, onAddToCart, onCheckout }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    setInCart(true);
    // Optional: Call onAddToCart() if you want to navigate to cart immediately
  };

  const handleRemoveFromCart = () => {
    setInCart(false);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Fórmula de Vitrine</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Photo */}
        <div className="w-full h-64 bg-gray-200 dark:bg-slate-800 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-primary font-black text-sm">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Name & Value */}
          <div>
            <h2 className="text-2xl font-black text-corporate dark:text-white uppercase leading-tight">{product.name}</h2>
            <p className="text-sm font-bold text-primary mt-1 uppercase">{product.subtitle}</p>
          </div>

          {/* Characteristics */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              Características
            </h3>
            <p className="text-sm font-medium text-text-main dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Components */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">science</span>
              Componentes
            </h3>
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-4 space-y-2 transition-colors">
              {product.components.map((comp, idx) => (
                <div key={idx} className="flex justify-between text-sm font-medium text-text-main dark:text-gray-300">
                  <span>{comp.name}</span>
                  <span className="font-bold">{comp.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Observation Field */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Observação (Opcional)
            </h3>
            <textarea 
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: Prefiro embalagem pump, sem essência..."
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-sm font-medium text-text-main dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none h-24 transition-colors"
            ></textarea>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">Quantidade</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="text-xl font-black text-corporate dark:text-white w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 flex gap-3 z-30 transition-colors">
        {inCart ? (
          <button 
            onClick={handleRemoveFromCart}
            className="flex-1 h-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">remove_shopping_cart</span>
            Remover do Carrinho
          </button>
        ) : (
          <button 
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-white dark:bg-slate-800 border-2 border-primary text-primary font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            Incluir no Carrinho
          </button>
        )}
        
        <button 
          onClick={onCheckout}
          className="flex-1 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
