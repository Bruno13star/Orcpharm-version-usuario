import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onAddToCart: () => void;
  onCheckout: () => void;
}

// Simulating data from the SignUp screen
const REGISTERED_USERS = [
    { id: 1, name: "JOÃO SILVA", type: "TITULAR (EU MESMO)" },
    { id: 2, name: "MARIA SILVA", type: "DEPENDENTE" },
    { id: 3, name: "PEDRO SILVA", type: "DEPENDENTE" }
];

export default function FormulaDetailScreen({ onBack, onAddToCart, onCheckout }: Props) {
  const [tooltipModal, setTooltipModal] = useState<{title: string, content: string} | null>(null);
  
  // State for Patient Dropdown
  const [selectedPatient, setSelectedPatient] = useState(REGISTERED_USERS[0]);
  const [isPatientListOpen, setIsPatientListOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300 relative">
      
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

       {/* Header */}
       <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white transition-colors">Resumo da Fórmula</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-48 px-4 py-6 space-y-6">
        
        {/* Section: Formula Summary & Price */}
        <section className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-sm font-black uppercase text-corporate dark:text-white">Creme Dermatológico</h2>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mt-0.5">Veículo QSP • 100g</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Valor do Pedido</p>
                    <p className="text-2xl font-black text-primary">R$ 135,90</p>
                </div>
            </div>

            <div className="space-y-2 mb-4 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-gray-100 dark:border-slate-700 pb-2 mb-2 text-gray-400">
                    <span>Componentes</span>
                    <span>Qtd</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase text-text-main dark:text-gray-200">
                    <span>Ureia</span>
                    <span>10%</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase text-text-main dark:text-gray-200">
                    <span>Óleo de Amêndoas</span>
                    <span>5%</span>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-corporate dark:text-blue-300 text-lg">store</span>
                <div className="flex-1">
                    <p className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">Farmácia Responsável</p>
                    <p className="text-xs font-black text-corporate dark:text-blue-300 uppercase">OrcPharm Labs (Parceiro Oficial)</p>
                </div>
                <span className="material-symbols-outlined text-green-500 text-lg">verified</span>
            </div>
        </section>

        {/* Section: Patient Name (DROPDOWN) */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">accessibility_new</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Quem vai usar?</h2>
            </div>
            
            <div className="space-y-1 relative z-30">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Selecione o Paciente</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg pointer-events-none">face</span>
                    
                    <button 
                        onClick={() => setIsPatientListOpen(!isPatientListOpen)}
                        className="w-full h-12 pl-11 pr-4 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase text-text-main dark:text-gray-200 transition-colors flex items-center justify-between focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <span>{selectedPatient.name} <span className="text-gray-400 dark:text-gray-500 ml-1">({selectedPatient.type})</span></span>
                        <span className={`material-symbols-outlined text-gray-400 transition-transform ${isPatientListOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>

                    {isPatientListOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden animate-fade-in z-50">
                            {REGISTERED_USERS.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => {
                                        setSelectedPatient(user);
                                        setIsPatientListOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-50 dark:border-slate-700 last:border-none flex items-center justify-between transition-colors ${selectedPatient.id === user.id ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                                >
                                    <div>
                                        <p className={`text-xs font-bold uppercase ${selectedPatient.id === user.id ? 'text-primary' : 'text-text-main dark:text-gray-200'}`}>
                                            {user.name}
                                        </p>
                                        <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase">{user.type}</p>
                                    </div>
                                    {selectedPatient.id === user.id && (
                                        <span className="material-symbols-outlined text-primary text-sm">check</span>
                                    )}
                                </button>
                            ))}
                            <button 
                                className="w-full text-center py-2 text-[10px] font-bold text-primary uppercase hover:bg-gray-50 dark:hover:bg-slate-700 border-t border-gray-100 dark:border-slate-700"
                                onClick={() => setIsPatientListOpen(false)}
                            >
                                + Novo Cadastro
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Section: Dados Médicos */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">medical_services</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Dados Médicos</h2>
                <button onClick={() => setTooltipModal({
                    title: "Dados Médicos",
                    content: "Informações do prescritor são obrigatórias para rastreabilidade e segurança sanitária, conforme normas da ANVISA."
                })} className="text-gray-400 hover:text-primary">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Nome do Médico</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">person</span>
                        <input 
                            type="text" 
                            defaultValue="DR. FERNANDO COSTA"
                            placeholder="DR. EXEMPLO DA SILVA" 
                            className="w-full h-12 pl-11 pr-4 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-gray-200 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">CRM</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">badge</span>
                        <input 
                            type="text" 
                            defaultValue="123456/SP"
                            placeholder="000000/UF" 
                            className="w-full h-12 pl-11 pr-4 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-gray-200 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Telefone de Contato</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">call</span>
                        <input 
                            type="tel" 
                            defaultValue="(11) 99876-5432"
                            placeholder="(00) 00000-0000" 
                            className="w-full h-12 pl-11 pr-4 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-gray-200 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Section: Posologia */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">medication</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Posologia</h2>
            </div>
            
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Instruções de Uso</label>
                <textarea 
                    rows={3}
                    defaultValue="TOMAR 1 CÁPSULA 2X AO DIA APÓS AS REFEIÇÕES. USO CONTÍNUO."
                    placeholder="DIGITE AS INSTRUÇÕES DE USO CONFORME RECEITA..." 
                    className="w-full p-4 rounded-3xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-gray-200 resize-none transition-colors"
                ></textarea>
            </div>
        </section>

        {/* Section: Observações (NEW) */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">sticky_note_2</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Observações</h2>
            </div>
            
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Detalhes Adicionais</label>
                <textarea 
                    rows={3}
                    placeholder="TEM ALGUMA ALERGIA? PREFERÊNCIA DE CÁPSULA? DIGITE AQUI..." 
                    className="w-full p-4 rounded-3xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-gray-200 resize-none transition-colors"
                ></textarea>
            </div>
        </section>

        {/* Section: Anexar Documentos (RENAMED & UPDATED) */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">attach_file</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Anexar Documentos</h2>
                <button onClick={() => setTooltipModal({
                    title: "Documentos Complementares",
                    content: "Você pode anexar fotos de medicamentos já utilizados, fórmulas antigas, caixas com quantidades de referência, fotos do local a ser tratado (ex: pele/machucado) ou qualquer outro documento que auxilie o farmacêutico."
                })} className="text-gray-400 hover:text-primary">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-primary/50 bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                </div>
                <div className="text-center">
                    <h3 className="text-xs font-black text-text-main dark:text-white uppercase mb-1">Deseja anexar mais algum documento?</h3>
                    <p className="text-[9px] font-bold text-gray-400 uppercase max-w-[200px] mx-auto leading-relaxed">
                        Toque para adicionar fotos de referências, remédios antigos ou diagnósticos
                    </p>
                </div>
            </div>
        </section>

      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 p-4 pb-8 z-30 transition-colors flex gap-3">
        <button 
            onClick={onAddToCart} 
            className="flex-1 h-14 bg-white dark:bg-slate-900 text-primary border-2 border-primary hover:bg-primary/5 dark:hover:bg-primary/10 font-extrabold rounded-2xl uppercase tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span className="text-xs">No Carrinho</span>
        </button>
        <button 
            onClick={onCheckout} 
            className="flex-1 h-14 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
            <span className="text-xs">Finalizar</span>
            <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}