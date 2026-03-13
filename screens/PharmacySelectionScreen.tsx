import React from 'react';

interface Props {
  onBack: () => void;
  onSelect: () => void;
}

const PHARMACIES = [
  { id: 1, name: "BioManipula Economia", price: 112.50, distance: 4.2, rating: 4.5, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop", badge: "Super Oferta" },
  { id: 2, name: "Pharma Vida", price: 115.00, distance: 1.2, rating: 4.9, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop", badge: "Recomendada" },
  { id: 3, name: "Essência Vital", price: 118.90, distance: 2.5, rating: 4.7, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop", badge: null },
  { id: 4, name: "Fórmula Exata", price: 120.00, distance: 5.0, rating: 4.6, image: "https://images.unsplash.com/photo-1628107931320-b498f3cb52a4?q=80&w=2070&auto=format&fit=crop", badge: "Entrega Rápida" },
  { id: 5, name: "Magistral Premium", price: 122.50, distance: 3.1, rating: 4.8, image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop", badge: null },
  { id: 6, name: "Natura Labs", price: 125.00, distance: 6.5, rating: 4.4, image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2089&auto=format&fit=crop", badge: null },
  { id: 7, name: "QualiPharma", price: 128.00, distance: 1.8, rating: 4.9, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop", badge: null },
  { id: 8, name: "Arte & Ciência", price: 130.50, distance: 7.2, rating: 4.3, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop", badge: null },
  { id: 9, name: "Manipulação SP", price: 132.00, distance: 8.0, rating: 4.5, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop", badge: null },
  { id: 10, name: "Saúde Total", price: 135.90, distance: 2.2, rating: 4.6, image: "https://images.unsplash.com/photo-1583946099379-f230e5d47596?q=80&w=2070&auto=format&fit=crop", badge: null },
  { id: 11, name: "BioTech Pharma", price: 138.00, distance: 9.5, rating: 4.2, image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2000&auto=format&fit=crop", badge: null },
  { id: 12, name: "Nova Fórmula", price: 140.50, distance: 3.8, rating: 4.7, image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=2000&auto=format&fit=crop", badge: null },
  { id: 13, name: "Pharma Center", price: 142.00, distance: 10.1, rating: 4.1, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop", badge: null },
  { id: 14, name: "Vitality Labs", price: 145.00, distance: 4.5, rating: 4.8, image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=2000&auto=format&fit=crop", badge: null },
  { id: 15, name: "Manipula+ Express", price: 148.90, distance: 11.2, rating: 4.0, image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop", badge: null },
  { id: 16, name: "Green Pharma", price: 152.00, distance: 5.5, rating: 4.6, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop", badge: "Sustentável" },
  { id: 17, name: "Pure Science", price: 155.50, distance: 6.0, rating: 4.9, image: "https://images.unsplash.com/photo-1628107931320-b498f3cb52a4?q=80&w=2070&auto=format&fit=crop", badge: null },
  { id: 18, name: "Golden Med", price: 160.00, distance: 12.5, rating: 4.3, image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2089&auto=format&fit=crop", badge: null },
  { id: 19, name: "Farma 360", price: 165.00, distance: 2.8, rating: 4.7, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop", badge: null },
  { id: 20, name: "Premium Care", price: 170.00, distance: 1.5, rating: 5.0, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop", badge: "Premium" },
];

export default function PharmacySelectionScreen({ onBack, onSelect }: Props) {
  
  const renderAdvertisingBanner = () => (
    <div className="mx-4 my-6 rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 z-0"></div>
        <img 
            src="https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" 
            alt="Ad Background" 
        />
        <div className="relative z-10 p-5 flex flex-col items-start">
            <span className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase backdrop-blur-sm mb-2 border border-white/10">Publicidade</span>
            <h3 className="text-white font-extrabold text-lg uppercase leading-tight mb-1">Galena <span className="text-purple-300">Nutrition</span></h3>
            <p className="text-gray-200 text-xs font-medium uppercase max-w-[80%] mb-4">Matérias-primas de alta performance para sua fórmula.</p>
            <button className="bg-white text-purple-900 px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-purple-50 transition-colors">
                Conhecer Parceiro
            </button>
        </div>
        <div className="absolute top-2 right-2">
            <span className="material-symbols-outlined text-white/30 text-4xl">verified</span>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 dark:text-white">Seleção de Farmácias</h1>
      </header>

      <div className="px-4 pt-6 pb-2">
        <h2 className="text-2xl font-extrabold text-corporate dark:text-blue-300 uppercase leading-tight">Escolha sua<br/>Farmácia</h2>
        <p className="text-xs font-bold text-text-sec dark:text-gray-400 uppercase mt-1">Encontramos {PHARMACIES.length} opções para seu orçamento</p>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 h-9 px-4 bg-primary text-white rounded-full text-xs font-bold uppercase shrink-0">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filtrar
        </button>
        <button className="h-9 px-4 bg-gray-100 dark:bg-slate-800 border border-transparent rounded-full text-xs font-bold uppercase text-corporate dark:text-gray-300 shrink-0">Menor Preço</button>
        <button className="h-9 px-4 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-bold uppercase text-text-main dark:text-gray-400 shrink-0">Mais Rápida</button>
        <button className="h-9 px-4 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-bold uppercase text-text-main dark:text-gray-400 shrink-0">Melhor Avaliação</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 space-y-4 no-scrollbar">
        {PHARMACIES.map((pharmacy, index) => (
            <React.Fragment key={pharmacy.id}>
                {/* Insert Advertising Banner after the 4th item */}
                {index === 4 && renderAdvertisingBanner()}

                <div className="mx-4 border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden group hover:border-primary/30 transition-colors bg-white dark:bg-slate-900">
                    <div className="relative">
                        {pharmacy.badge && (
                            <div className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10 ${pharmacy.badge === 'Super Oferta' ? 'bg-green-500' : 'bg-primary'}`}>
                                {pharmacy.badge}
                            </div>
                        )}
                        <div className="p-4 flex gap-4">
                            <div className="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${pharmacy.image}')` }}></div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-1 text-primary mb-1">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    <span className="text-[10px] font-bold uppercase">Verificado</span>
                                </div>
                                <h3 className="font-bold text-corporate dark:text-gray-100 uppercase leading-tight line-clamp-1">{pharmacy.name}</h3>
                                <div className="flex items-center gap-2 mt-1 mb-auto">
                                    <div className="flex items-center gap-0.5 text-yellow-500">
                                        <span className="material-symbols-outlined text-sm filled">star</span>
                                        <span className="text-xs font-bold text-text-main dark:text-gray-200">{pharmacy.rating}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{pharmacy.distance} KM</span>
                                </div>
                                <div className="flex items-end justify-between mt-2">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Total do Pedido</p>
                                        <p className="text-lg font-black text-text-main dark:text-white">
                                            {pharmacy.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                    </div>
                                    <button onClick={onSelect} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide">Selecionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ))}
        
        <div className="text-center py-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Fim dos resultados</p>
        </div>
      </div>
    </div>
  );
}