import React from 'react';

interface Props {
  onBack: () => void;
  onAddMore: () => void;
  onAddProduct: () => void;
  onCheckout: () => void;
}

const CART_ITEMS = [
    {
        id: 'OR002',
        title: 'Creme Dermatológico',
        detail: '100g • Ureia 10%',
        pharmacy: 'OrcPharm Labs',
        price: 112.50,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'OR003',
        title: 'Vitamina D3 50.000UI',
        detail: '60 Cápsulas • Gelatinosa',
        pharmacy: 'OrcPharm Labs',
        price: 45.90,
        image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=2070&auto=format&fit=crop'
    }
];

export default function CartScreen({ onBack, onAddMore, onAddProduct, onCheckout }: Props) {
  
  const total = CART_ITEMS.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
       <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Carrinho de Orçamentos</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-48 space-y-6">
        
        {/* Banner Add More */}
        <div className="grid grid-cols-2 gap-3">
            <div 
                onClick={onAddMore}
                className="border-2 border-dashed border-primary/30 bg-primary/5 dark:bg-primary/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 transition-all group text-center"
            >
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">add</span>
                </div>
                <span className="text-xs font-bold text-primary uppercase leading-tight">Calcular Nova<br/>Fórmula</span>
            </div>
            <div 
                onClick={onAddProduct}
                className="border-2 border-dashed border-blue-500/30 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all group text-center"
            >
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">shopping_bag</span>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase leading-tight">Fórmulas de<br/>Vitrine</span>
            </div>
        </div>

        {/* Cart Items List */}
        <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                Itens ({CART_ITEMS.length})
            </h3>
            
            <div className="flex flex-col gap-4">
                {CART_ITEMS.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative group overflow-hidden transition-colors">
                        {/* ID Badge */}
                        <div className="absolute top-0 right-0 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-bl-xl border-l border-b border-gray-200 dark:border-slate-700">
                            <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.id}</p>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-xl bg-cover bg-center shrink-0 border border-gray-200 dark:border-slate-700" style={{ backgroundImage: `url('${item.image}')` }}></div>
                            <div className="flex-1 min-w-0 pt-2">
                                <h4 className="font-bold text-sm text-corporate dark:text-white uppercase truncate">{item.title}</h4>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mt-0.5">{item.detail}</p>
                                <p className="text-[10px] font-medium text-primary uppercase mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">store</span>
                                    {item.pharmacy}
                                </p>
                                
                                <div className="flex justify-between items-end mt-3">
                                    <p className="text-base font-black text-text-main dark:text-white">
                                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Remove Action */}
                        <div className="absolute bottom-4 right-4">
                             <button className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-1">
                                <span className="material-symbols-outlined text-lg">delete</span>
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 p-5 pb-8 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-colors">
        <div className="flex flex-col gap-1 mb-5">
             <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <span>Itens ({CART_ITEMS.length})</span>
                <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
             </div>
             <div className="flex justify-between items-center text-lg font-black text-text-main dark:text-white mt-1 pt-2 border-t border-dashed border-gray-200 dark:border-slate-800">
                <span className="text-xs uppercase">Subtotal</span>
                <span className="text-primary">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
             </div>
        </div>
        <button onClick={onCheckout} className="w-full bg-primary hover:bg-primary-dark text-white font-black text-sm py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 tracking-[0.15em] uppercase active:scale-[0.98]">
            <span>Fechar Pedido</span>
            <span className="material-symbols-outlined font-bold">check</span>
        </button>
      </div>
    </div>
  );
}