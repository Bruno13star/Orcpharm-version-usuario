import React, { useState } from 'react';
import { ScreenName } from '../App';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

const SEARCH_SUGGESTIONS = [
  "#PO250 - CÁPSULAS DE MAGNÉSIO",
  "#PO251 - FLORAL DE BACH",
  "#PO4829 - FÓRMULA PERSONALIZADA",
  "#ORC1928 - SÉRUM VITAMINA C",
  "#ORC1929 - MINOXIDIL 5%",
  "#PO5001 - MELATONINA 3MG"
];

export default function HomeScreen({ onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = SEARCH_SUGGESTIONS.filter(item => 
        item.includes(query)
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
    // Optional: trigger navigation or search action here
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950 pb-24 relative transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-30 px-4 pt-4 pb-2 shadow-sm dark:shadow-slate-900/50 transition-colors duration-300">
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Entregar em</p>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <p className="text-sm font-bold text-text-main dark:text-gray-100 uppercase">Casa • Rua das Flores, 123</p>
                        <span className="material-symbols-outlined text-primary text-sm">keyboard_arrow_down</span>
                    </div>
                </div>
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined dark:text-gray-200">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-white dark:border-slate-900"></span>
            </button>
        </div>
        
        {/* Search Bar with Autocomplete */}
        <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Nº DO PEDIDO OU ORÇAMENTO..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-primary focus:border-primary text-corporate dark:text-blue-300 transition-colors"
            />
            {searchQuery.length > 0 && (
                <button 
                    onClick={() => { setSearchQuery(''); setFilteredSuggestions([]); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            )}

            {/* Suggestions Dropdown */}
            {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 animate-fade-in">
                    {filteredSuggestions.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleSelectSuggestion(item)}
                            className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-gray-50 dark:border-slate-700 last:border-none flex items-center gap-3 transition-colors"
                        >
                            <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-sm">history</span>
                            <span className="text-sm font-bold text-text-main dark:text-gray-200 uppercase">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-6">
        
        {/* Main Central Action Buttons */}
        <div className="grid grid-cols-2 gap-4 px-4 mb-8">
            <button 
                onClick={() => onNavigate('calculator')}
                className="bg-primary hover:bg-primary-dark text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg shadow-primary/20 aspect-square transition-transform active:scale-95 relative overflow-hidden group"
            >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">add_a_photo</span>
                 </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                </div>
                <div className="text-center relative z-10">
                    <span className="text-sm font-black uppercase leading-tight block">Enviar<br/>Receita</span>
                    <span className="text-[9px] font-bold opacity-80 uppercase mt-1 block">Cotar Manipulado</span>
                </div>
            </button>

            <button 
                onClick={() => onNavigate('product_catalog')}
                className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg shadow-blue-700/20 aspect-square transition-transform active:scale-95 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-white">shopping_bag</span>
                 </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-3xl text-white">medication</span>
                </div>
                <div className="text-center relative z-10">
                    <span className="text-sm font-black text-white uppercase leading-tight block">Produto<br/>Pronto</span>
                    <span className="text-[9px] font-bold opacity-80 text-white uppercase mt-1 block">Loja Online</span>
                </div>
            </button>
        </div>

        {/* Recent Orders */}
        <div className="px-4 mb-8">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-lg font-bold text-corporate dark:text-blue-300 uppercase">Últimos Pedidos</h3>
                <button onClick={() => onNavigate('status')} className="text-primary text-xs font-bold uppercase">Ver Todos</button>
            </div>
            <div className="flex flex-col gap-3">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                    <div className="w-12 h-12 bg-background-light dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-corporate dark:text-gray-200 uppercase">Receita #PO250</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase">Cápsulas de Magnésio • 60 un</p>
                    </div>
                    <button onClick={() => onNavigate('calculator')} className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold rounded-lg uppercase hover:bg-primary hover:text-white transition-colors">Repetir</button>
                </div>
                 <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                    <div className="w-12 h-12 bg-background-light dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">medication_liquid</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-corporate dark:text-gray-200 uppercase">Floral de Bach</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase">Gotas • 30ml</p>
                    </div>
                    <button onClick={() => onNavigate('calculator')} className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold rounded-lg uppercase hover:bg-primary hover:text-white transition-colors">Repetir</button>
                </div>
            </div>
        </div>

        {/* Banner Carousel (Moved to bottom) */}
        <div className="px-4 mb-6">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase mb-3 ml-1">Ofertas do Dia</h3>
            <div className="flex overflow-x-auto gap-3 no-scrollbar snap-x">
                <div className="min-w-[85%] snap-center rounded-2xl overflow-hidden relative h-40 bg-background-dark">
                    <img src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2071&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end items-start bg-gradient-to-r from-corporate to-transparent">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 uppercase">Oferta do dia</span>
                        <h3 className="text-white font-bold text-xl leading-tight uppercase">Vitaminas<br/>Personalizadas</h3>
                        <p className="text-gray-200 text-xs mt-1 uppercase">Até 30% OFF na primeira compra</p>
                    </div>
                </div>
                <div className="min-w-[85%] snap-center rounded-2xl overflow-hidden relative h-40 bg-background-dark">
                    <img src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                     <div className="absolute inset-0 p-5 flex flex-col justify-end items-start bg-gradient-to-r from-corporate to-transparent">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 uppercase">Lançamento</span>
                        <h3 className="text-white font-bold text-xl leading-tight uppercase">Linha Skincare<br/>Dermatológica</h3>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 h-20 px-6 flex justify-between items-start pt-3 z-30 transition-colors">
        <div className="flex flex-col items-center text-primary">
            <span className="material-symbols-outlined filled">home</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Início</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-text-main dark:hover:text-gray-300 cursor-pointer" onClick={() => onNavigate('calculator')}>
            <span className="material-symbols-outlined">search</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Busca</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-text-main dark:hover:text-gray-300 cursor-pointer" onClick={() => onNavigate('status')}>
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Pedidos</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-text-main dark:hover:text-gray-300 cursor-pointer" onClick={() => onNavigate('chat')}>
            <span className="material-symbols-outlined">support_agent</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Ajuda</span>
        </div>
      </nav>
    </div>
  );
}