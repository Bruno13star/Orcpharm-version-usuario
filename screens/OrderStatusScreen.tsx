import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onChatClick: () => void;
}

export default function OrderStatusScreen({ onBack, onChatClick }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
       <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Status do Pedido</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-8">
        {/* Card Header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors">
            <div className="flex gap-4">
                <div className="flex-1">
                    <span className="bg-primary/20 text-primary-dark dark:text-primary-light px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Em Andamento</span>
                    <h2 className="font-bold text-base mt-2 uppercase text-corporate dark:text-white">Fórmula Personalizada #4829</h2>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase">Orcpharm Labs</p>
                </div>
                <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop')" }}></div>
            </div>
            <button 
                onClick={() => setShowDetails(true)}
                className="w-full mt-4 h-10 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg text-xs font-bold uppercase text-text-main dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
                Ver Detalhes do Pedido
            </button>
        </div>

        <h3 className="text-sm font-bold uppercase mb-4 text-corporate dark:text-blue-300">Progresso</h3>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors">
            <div className="relative pl-8 border-l-2 border-primary pb-8">
                <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <p className="text-sm font-bold uppercase text-corporate dark:text-white">Receita em Análise</p>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mt-0.5">Aprovado • 09:41</p>
            </div>
             <div className="relative pl-8 border-l-2 border-gray-200 dark:border-slate-700 pb-8">
                <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-primary text-white ring-4 ring-primary/20 dark:ring-primary/10 flex items-center justify-center shadow-md">
                     <span className="material-symbols-outlined text-sm font-bold">science</span>
                </div>
                <p className="text-sm font-bold uppercase text-corporate dark:text-white">Em Manipulação</p>
                <p className="text-xs font-bold text-primary uppercase mt-0.5 animate-pulse">Processando no laboratório...</p>
            </div>
             <div className="relative pl-8">
                <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-slate-700 flex items-center justify-center">
                     <span className="material-symbols-outlined text-sm font-bold">local_shipping</span>
                </div>
                <p className="text-sm font-bold uppercase text-gray-400 dark:text-gray-600">Saiu para Entrega</p>
                <p className="text-xs font-medium text-gray-300 dark:text-gray-700 uppercase mt-0.5">Aguardando etapa anterior</p>
            </div>
        </div>

        <h3 className="text-sm font-bold uppercase mb-4 text-corporate dark:text-blue-300">Detalhes da Entrega</h3>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 space-y-4 transition-colors">
            <div className="flex justify-between items-start border-b border-dashed border-gray-200 dark:border-slate-800 pb-4">
                <div className="flex gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Endereço</span>
                </div>
                <p className="text-sm font-medium text-right uppercase text-text-main dark:text-gray-200">Rua das Flores, 123<br/>Apto 402 - Jardins</p>
            </div>
            <div className="flex justify-between items-start border-b border-dashed border-gray-200 dark:border-slate-800 pb-4">
                <div className="flex gap-2">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Previsão</span>
                </div>
                <p className="text-sm font-medium text-right uppercase text-text-main dark:text-gray-200">Hoje, até às 18:00</p>
            </div>
             <div className="flex justify-between items-start">
                <div className="flex gap-2">
                    <span className="material-symbols-outlined text-primary">two_wheeler</span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Método</span>
                </div>
                <p className="text-sm font-medium text-right uppercase text-text-main dark:text-gray-200">Motoboy Express</p>
            </div>
        </div>

        <button 
            onClick={onChatClick}
            className="w-full mt-6 bg-white dark:bg-slate-900 border border-primary text-primary font-bold rounded-lg py-3 uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
        >
            <span className="material-symbols-outlined text-lg">support_agent</span>
            Precisa de Ajuda?
        </button>
      </div>

      {/* Full Order Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
             <div 
                className="bg-white dark:bg-slate-950 w-full rounded-t-3xl h-[90vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl transition-colors"
                onClick={(e) => e.stopPropagation()}
             >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950 shrink-0 transition-colors">
                    <div>
                        <h2 className="text-lg font-black uppercase text-corporate dark:text-white">Resumo do Pedido</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">ID: #4829 • 24/10/2023</p>
                    </div>
                    <button 
                        onClick={() => setShowDetails(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-300"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Item 1 */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">science</span>
                            Composição da Fórmula
                        </h3>
                        <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 transition-colors">
                            <div className="flex justify-between items-start mb-3 border-b border-gray-200 dark:border-slate-800 pb-3">
                                <div>
                                    <h4 className="font-bold text-sm text-corporate dark:text-white uppercase">Creme Dermatológico</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Embalagem Pump Airless • 100g</p>
                                </div>
                                <span className="text-xs font-black text-primary">R$ 185,00</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-text-sec dark:text-gray-400 uppercase">
                                    <span>Ureia</span>
                                    <span className="font-bold">10%</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-text-sec dark:text-gray-400 uppercase">
                                    <span>Óleo de Amêndoas</span>
                                    <span className="font-bold">5%</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-text-sec dark:text-gray-400 uppercase">
                                    <span>Creme Base Q.S.P.</span>
                                    <span className="font-bold">100g</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Medical Info */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">medical_services</span>
                            Dados Médicos
                        </h3>
                        <div className="border border-gray-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-corporate dark:text-blue-300">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-corporate dark:text-white uppercase">Dr. Exemplo da Silva</p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase">CRM/SP 123456</p>
                            </div>
                            <span className="ml-auto text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-bold uppercase">Receita Validada</span>
                        </div>
                    </section>

                    {/* Payment Info */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            Pagamento
                        </h3>
                         <div className="border border-gray-100 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center mb-4">
                             <div className="flex items-center gap-3">
                                 <span className="material-symbols-outlined text-green-600 dark:text-green-500">qr_code_2</span>
                                 <div>
                                     <p className="text-xs font-bold text-corporate dark:text-white uppercase">PIX</p>
                                     <p className="text-[10px] font-medium text-gray-400 uppercase">Aprovado em 24/10 às 09:40</p>
                                 </div>
                             </div>
                             <span className="text-xs font-black text-text-main dark:text-white">R$ 190,75</span>
                         </div>

                         {/* Total Breakdown */}
                         <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-4 space-y-2 transition-colors">
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                                <span>Subtotal</span>
                                <span>R$ 185,00</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                                <span>Entrega (Motoboy)</span>
                                <span>R$ 15,00</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">
                                <span>Desconto PIX (5%)</span>
                                <span>- R$ 9,25</span>
                            </div>
                            <div className="border-t border-dashed border-gray-200 dark:border-slate-800 pt-2 mt-2 flex justify-between text-sm font-black text-text-main dark:text-white uppercase">
                                <span>Total Pago</span>
                                <span className="text-primary">R$ 190,75</span>
                            </div>
                         </div>
                    </section>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
                    <button className="w-full h-12 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Baixar Nota Fiscal
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}