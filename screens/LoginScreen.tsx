import React from 'react';

interface Props {
  onLogin: () => void;
  onSignUpClick: () => void;
  onVideoClick: () => void;
}

export default function LoginScreen({ onLogin, onSignUpClick, onVideoClick }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 transition-colors duration-300">
      {/* Header Image Section */}
      <div className="relative h-[320px] bg-background-dark dark:bg-slate-900 rounded-b-[2.5rem] overflow-hidden shadow-lg z-10">
        <img 
          src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop" 
          alt="Pharmacy Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent dark:from-slate-900/80"></div>
        
        <div className="absolute bottom-8 left-0 right-0 text-center px-6">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                <span className="material-symbols-outlined text-4xl text-white">local_pharmacy</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-1">OrcPharm</h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Medicina Manipulada</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col gap-5">
        
        <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-corporate dark:text-blue-300">CPF</label>
            <input 
                type="text" 
                placeholder="DIGITE SEU CPF" 
                className="w-full h-14 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary uppercase text-text-main dark:text-white transition-colors"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-corporate dark:text-blue-300">SENHA</label>
            <div className="relative">
                <input 
                    type="password" 
                    placeholder="DIGITE SUA SENHA" 
                    className="w-full h-14 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary uppercase text-text-main dark:text-white transition-colors"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            </div>
            <div className="flex justify-end">
                <button className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase hover:text-primary">Esqueceu a senha?</button>
            </div>
        </div>

        <button 
            onClick={onLogin}
            className="w-full h-14 bg-primary text-white rounded-xl font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
            Entrar
        </button>

        {/* Video Card */}
        <div 
            onClick={onVideoClick}
            className="mt-2 relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-primary/20 dark:from-slate-800 dark:to-primary/20 p-[2px] cursor-pointer group hover:scale-[1.02] transition-transform"
        >
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-[10px] flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl filled">play_arrow</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-xs font-bold text-corporate dark:text-gray-200 uppercase">Descubra como economizar</h3>
                    <p className="text-[10px] font-bold text-corporate/70 dark:text-gray-400 uppercase mt-0.5">Assista ao vídeo e aprenda a usar o app</p>
                </div>
            </div>
        </div>

        <div className="mt-auto text-center pb-4">
            <p className="text-sm font-bold text-gray-500 uppercase">
                Não tem uma conta? <button onClick={onSignUpClick} className="text-primary underline">Cadastre-se</button>
            </p>
        </div>
      </div>
    </div>
  );
}