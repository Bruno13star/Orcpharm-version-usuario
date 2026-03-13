import React from 'react';

interface Props {
  onBack: () => void;
}

const TUTORIALS = [
  {
    id: 1,
    title: "Como Cotar sua Receita",
    duration: "02:15",
    thumb: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop",
    category: "Tutorial"
  },
  {
    id: 2,
    title: "Entenda a Economia",
    duration: "01:45",
    thumb: "https://images.unsplash.com/photo-1554224155-9ffd4cf4438e?q=80&w=1000&auto=format&fit=crop",
    category: "Dicas"
  },
  {
    id: 3,
    title: "Rastreando seu Pedido",
    duration: "03:00",
    thumb: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1000&auto=format&fit=crop",
    category: "Ajuda"
  },
];

const PARTNER_ADS = [
    {
        id: 101,
        title: "Dermocosméticos",
        subtitle: "Nova linha facial",
        image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 102,
        title: "Suplementação",
        subtitle: "Alta performance",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function VideoTutorialScreen({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header Transparent */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
         <button onClick={onBack} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 flex items-center justify-center text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 flex items-center justify-center text-white transition-colors">
            <span className="material-symbols-outlined">share</span>
         </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 no-scrollbar">
        
        {/* Hero Featured Video */}
        <div className="relative h-[45vh] bg-slate-900 group cursor-pointer">
            <img 
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-60"
                alt="Featured Video"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            {/* Play Button Big */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(224,11,127,0.5)] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl filled ml-1">play_arrow</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Destaque</span>
                <h1 className="text-3xl font-black text-white uppercase leading-tight mb-2">Descubra como<br/>Economizar</h1>
                <p className="text-xs font-bold text-gray-300 uppercase line-clamp-2 max-w-[80%]">
                    Aprenda a usar a calculadora inteligente e compare preços em tempo real com nossa IA.
                </p>
            </div>
        </div>

        {/* Content Body */}
        <div className="px-4 py-6 -mt-6 bg-white dark:bg-slate-950 rounded-t-3xl relative z-10 transition-colors">
            
            {/* Advertising Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-black text-corporate dark:text-blue-300 uppercase">Publicidade & Parceiros</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {PARTNER_ADS.map(ad => (
                        <div key={ad.id} className="min-w-[160px] h-[220px] rounded-2xl relative overflow-hidden group cursor-pointer shadow-lg bg-gray-200 dark:bg-slate-800">
                            <img src={ad.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={ad.title} />
                            
                            {/* Play Icon for Story feel */}
                            <div className="absolute top-2 right-2 z-10">
                                 <span className="material-symbols-outlined text-white drop-shadow-md">play_circle</span>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                                <span className="text-[8px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded w-fit backdrop-blur-sm uppercase mb-auto">Patrocinado</span>
                                <h4 className="text-white font-bold text-sm uppercase leading-tight">{ad.title}</h4>
                                <p className="text-[10px] text-gray-300 uppercase">{ad.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tutorials List */}
            <div>
                <h3 className="text-sm font-black text-corporate dark:text-blue-300 uppercase mb-4">Aprenda a Usar o App</h3>
                <div className="space-y-4">
                    {TUTORIALS.map((video, index) => (
                        <div key={video.id} className="flex gap-3 group cursor-pointer">
                            <div className="w-32 h-20 rounded-xl bg-gray-200 dark:bg-slate-800 relative overflow-hidden shrink-0">
                                <img src={video.thumb} className="w-full h-full object-cover" alt={video.title} />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white border border-white/50">
                                        <span className="material-symbols-outlined text-lg filled">play_arrow</span>
                                    </div>
                                </div>
                                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center border-b border-gray-100 dark:border-slate-800 pb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-bold text-primary uppercase bg-primary/10 px-1.5 rounded">{video.category}</span>
                                    {index === 0 && <span className="text-[9px] font-bold text-green-600 bg-green-100 px-1.5 rounded uppercase">Novo</span>}
                                </div>
                                <h4 className="text-xs font-bold text-text-main dark:text-white uppercase leading-snug mb-1 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h4>
                                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase">
                                    OrcPharm Academy
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Help Banner */}
            <div className="mt-8 bg-gray-50 dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-corporate dark:bg-blue-900/40 flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                    <h4 className="text-xs font-black text-corporate dark:text-white uppercase">Ainda com dúvidas?</h4>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Nosso time de farmacêuticos pode ajudar.</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}