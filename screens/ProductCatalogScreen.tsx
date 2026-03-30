import React from 'react';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
  components: { name: string; amount: string }[];
}

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sérum Vitamina C 20%',
    subtitle: 'Antioxidante e Iluminador',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop',
    description: 'Sérum facial de alta potência com Vitamina C pura a 20%. Promove ação antioxidante, uniformiza o tom da pele e estimula a produção de colágeno, reduzindo linhas finas e rugas.',
    components: [
      { name: 'Vitamina C (Ácido Ascórbico)', amount: '20%' },
      { name: 'Ácido Ferúlico', amount: '0.5%' },
      { name: 'Vitamina E', amount: '1%' },
      { name: 'Sérum Base Q.S.P.', amount: '30ml' }
    ]
  },
  {
    id: '2',
    name: 'Minoxidil 5% Loção',
    subtitle: 'Crescimento Capilar',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2080&auto=format&fit=crop',
    description: 'Loção capilar clinicamente comprovada para auxiliar no tratamento da queda de cabelo e estimular o crescimento de novos fios.',
    components: [
      { name: 'Minoxidil', amount: '5%' },
      { name: 'Propilenoglicol', amount: '10%' },
      { name: 'Solução Hidroalcoólica Q.S.P.', amount: '100ml' }
    ]
  },
  {
    id: '3',
    name: 'Magnésio Dimalato',
    subtitle: 'Energia e Saúde Muscular',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop',
    description: 'Suplemento mineral essencial para o funcionamento muscular, redução da fadiga e melhora do metabolismo energético.',
    components: [
      { name: 'Magnésio Dimalato', amount: '500mg' },
      { name: 'Excipiente Q.S.P.', amount: '1 cápsula' }
    ]
  },
  {
    id: '4',
    name: 'Melatonina 3mg Gotas',
    subtitle: 'Sono Reparador',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2080&auto=format&fit=crop',
    description: 'Hormônio do sono em formato de gotas sublinguais para rápida absorção. Auxilia na regulação do ciclo circadiano.',
    components: [
      { name: 'Melatonina', amount: '3mg/gota' },
      { name: 'Veículo Oleoso Q.S.P.', amount: '20ml' }
    ]
  }
];

interface Props {
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCatalogScreen({ onBack, onSelectProduct }: Props) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
      <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Fórmulas de Vitrine</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {CATALOG_PRODUCTS.map(product => (
            <div key={product.id} onClick={() => onSelectProduct(product)} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 cursor-pointer hover:shadow-md transition-all group flex flex-col">
              <div className="h-32 bg-gray-200 dark:bg-slate-800 relative overflow-hidden shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-xs font-bold text-corporate dark:text-white uppercase line-clamp-2 leading-tight mb-1">{product.name}</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase line-clamp-1 mb-2">{product.subtitle}</p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-sm font-black text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
