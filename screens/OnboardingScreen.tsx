import React, { useState } from 'react';

interface Props {
  onFinish: () => void;
}

const slides = [
  {
    id: 1,
    title: "VOCÊ NO CONTROLE",
    desc: "MONTE SUA FÓRMULA, VEJA O PREÇO NA HORA E FINALIZE O PEDIDO SEM DEPENDER DE ORÇAMENTISTAS.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    highlight: "CONTROLE"
  },
  {
    id: 2,
    title: "SEGURANÇA EM CADA MILIGRAMA",
    desc: "VÍNCULO DIRETO COM SUA RECEITA, RASTREABILIDADE TOTAL DE LOTES E VALIDADE GARANTIDA.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop",
    highlight: "SEGURANÇA"
  },
  {
    id: 3,
    title: "DÊ ADEUS ÀS FILAS",
    desc: "MANIPULE SUAS FÓRMULAS 24H POR DIA.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    highlight: "ADEUS"
  }
];

export default function OnboardingScreen({ onFinish }: Props) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  const activeSlide = slides[current];

  return (
    <div className="h-screen flex flex-col bg-background-light dark:bg-slate-950 relative transition-colors duration-300">
       {/* Top Bar */}
       <div className="flex justify-between items-center p-6">
            {current > 0 ? (
                <button onClick={() => setCurrent(current - 1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            ) : (
                <div />
            )}
            <button onClick={onFinish} className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase hover:text-primary dark:hover:text-primary transition-colors">Pular</button>
       </div>

       {/* Content */}
       <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
            <div className="w-64 h-80 bg-gray-200 dark:bg-slate-800 rounded-3xl overflow-hidden mb-8 shadow-xl relative transition-colors">
                <img src={activeSlide.image} alt="Onboarding" className="w-full h-full object-cover" />
                {/* Decorative Overlay mimic */}
                {current === 1 && (
                     <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                        <div className="bg-background-dark border border-primary/20 p-4 rounded-xl w-full max-w-[200px] mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold">ANVISA</span>
                            </div>
                            <div className="text-white text-xs font-bold">STATUS: 100% SEGURO</div>
                        </div>
                        <div className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            RASTREABILIDADE TOTAL
                        </div>
                     </div>
                )}
            </div>

            {/* Dots */}
            <div className="flex gap-2 mb-6">
                {slides.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-slate-700'}`}
                    />
                ))}
            </div>

            <h1 className="text-2xl font-extrabold text-center uppercase mb-4 text-corporate dark:text-white transition-colors">
                {activeSlide.title.split(activeSlide.highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-primary">{activeSlide.highlight}</span>}
                    </React.Fragment>
                ))}
            </h1>

            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase leading-relaxed max-w-xs transition-colors">
                {activeSlide.desc}
            </p>

            <button 
                onClick={handleNext}
                className="w-full mt-auto bg-primary hover:bg-primary-dark text-white font-extrabold h-14 rounded-xl uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
                {current === slides.length - 1 ? "Começar Agora" : "Próximo"}
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>
       </div>
    </div>
  );
}