import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onProceed: () => void;
}

export default function PriceEstimateScreen({ onBack, onProceed }: Props) {
  const [tooltipModal, setTooltipModal] = useState<{title: string, content: string} | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col relative overflow-hidden transition-colors duration-300">
      
      {/* Tooltip Modal */}
      {tooltipModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setTooltipModal(null)}>
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={() => setTooltipModal(null)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">info</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-corporate dark:text-blue-300 uppercase mb-2 leading-tight">{tooltipModal.title}</h3>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase">{tooltipModal.content}</p>
                    </div>
                    <button 
                        onClick={() => setTooltipModal(null)}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide shadow-lg shadow-primary/20 mt-2"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <header className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-corporate dark:text-white">Análise de Mercado</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar">
        
        {/* Formula Summary Mini-Card */}
        <div className="flex items-center gap-3 mb-6 bg-gray-50 dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm dark:shadow-none">
                <span className="material-symbols-outlined">science</span>
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Sua Fórmula</p>
                <p className="text-xs font-black text-text-main dark:text-gray-200 uppercase">Creme Dermatológico • 100g</p>
            </div>
        </div>

        {/* Main Price Card */}
        <div className="bg-gradient-to-br from-corporate to-[#003380] dark:from-blue-900 dark:to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-corporate/20 dark:shadow-black/40 relative overflow-hidden mb-8 group">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">analytics</span>
             </div>
             
             <div className="relative z-10 text-center">
                 <div className="flex items-center justify-center gap-1 mb-2">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Estimativa Média</p>
                    <button onClick={() => setTooltipModal({
                        title: "Estimativa Média",
                        content: "Valor calculado com base no histórico de preços praticados pelas farmácias parceiras para fórmulas similares à sua."
                    })} className="text-white/60 hover:text-white">
                        <span className="material-symbols-outlined text-sm">info</span>
                    </button>
                 </div>
                 <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-4xl font-black">R$ 135</span>
                    <span className="text-xl font-bold opacity-60">-</span>
                    <span className="text-4xl font-black">R$ 160</span>
                 </div>
                 <p className="text-[10px] font-medium uppercase opacity-60">Valores baseados em fórmulas similares</p>
             </div>
        </div>

        {/* Market Graph */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-1">
                    <h3 className="text-sm font-black uppercase text-text-main dark:text-white">Variação de Preço</h3>
                     <button onClick={() => setTooltipModal({
                        title: "Variação de Preço",
                        content: "Mostra a diferença entre o menor e o maior preço encontrado no mercado. A barra indica onde sua cotação estimada se posiciona."
                    })} className="text-gray-400 hover:text-primary">
                        <span className="material-symbols-outlined text-sm">info</span>
                    </button>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Atualizado Hoje</span>
            </div>
            
            <div className="bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex relative">
                {/* Low Range */}
                <div className="w-[30%] bg-green-400 h-full"></div>
                {/* Mid Range */}
                <div className="w-[40%] bg-yellow-400 h-full"></div>
                {/* High Range */}
                <div className="w-[30%] bg-red-400 h-full"></div>
                
                {/* User Marker */}
                <div className="absolute top-0 bottom-0 left-[45%] w-1 bg-black dark:bg-white z-10 transform -translate-x-1/2"></div>
                <div className="absolute -top-1 left-[45%] transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                </div>
            </div>
            
            <div className="flex justify-between mt-2 text-[9px] font-bold uppercase text-gray-400">
                <span>Econômico</span>
                <span className="text-text-main dark:text-gray-200">Média de Mercado</span>
                <span>Premium</span>
            </div>
        </div>

        {/* Education/Info Card */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 flex flex-col items-center text-center relative">
                 <button onClick={() => setTooltipModal({
                    title: "Economia Estimada",
                    content: "Porcentagem que você economiza comparando o melhor preço da nossa plataforma com a média das farmácias tradicionais."
                })} className="absolute top-2 right-2 text-green-600/50 hover:text-green-600">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 mb-2 text-2xl">savings</span>
                <p className="text-[10px] font-bold text-green-800 dark:text-green-300 uppercase leading-tight">Economia<br/>Estimada</p>
                <p className="text-lg font-black text-green-600 dark:text-green-400 mt-1">~18%</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center text-center relative">
                <button onClick={() => setTooltipModal({
                    title: "Farmácias Disponíveis",
                    content: "Número de laboratórios qualificados e parceiros que podem atender seu pedido imediatamente."
                })} className="absolute top-2 right-2 text-blue-600/50 hover:text-blue-600">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
                <span className="material-symbols-outlined text-corporate dark:text-blue-400 mb-2 text-2xl">store</span>
                <p className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase leading-tight">Farmácias<br/>Disponíveis</p>
                <p className="text-lg font-black text-corporate dark:text-blue-400 mt-1">4 Lojas</p>
            </div>
        </div>

        {/* Image Card - Trust */}
        <div className="relative rounded-2xl overflow-hidden h-32 mb-6 shadow-sm border border-gray-100 dark:border-slate-800 group">
             <img 
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=2069&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Medicines and Pills"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-transparent flex items-center p-6">
                 <div>
                     <h3 className="text-white font-bold text-sm uppercase mb-1">Cálculo Preciso</h3>
                     <p className="text-white/80 text-[10px] font-medium uppercase max-w-[150px] leading-relaxed">
                        Nossa IA analisa os ativos e sugere o melhor custo-benefício.
                     </p>
                 </div>
             </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 pb-8 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-colors">
        <div className="text-center mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase">
                Os valores finais podem variar conforme o laboratório
            </p>
        </div>
        <button 
            onClick={onProceed} 
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 animate-pulse-slow"
        >
            Ver Ofertas Reais
            <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}