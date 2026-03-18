import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onFinish: () => void;
}

export default function CheckoutScreen({ onBack, onFinish }: Props) {
  const [deliveryMethod, setDeliveryMethod] = useState<'MOTO' | 'CORREIOS' | 'PICKUP'>('MOTO');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT'>('PIX');
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Pricing Constants
  const SUBTOTAL = 158.40;
  
  let DELIVERY_COST = 0;
  if (deliveryMethod === 'MOTO') DELIVERY_COST = 15.00;
  if (deliveryMethod === 'CORREIOS') DELIVERY_COST = 22.90;
  if (deliveryMethod === 'PICKUP') DELIVERY_COST = 0;
  
  // Calculate discount based on subtotal (simulating logic)
  const DISCOUNT = paymentMethod === 'PIX' ? (SUBTOTAL * 0.05) : 0; 
  
  const TOTAL = SUBTOTAL + DELIVERY_COST - DISCOUNT;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
       <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white transition-colors">Finalizar Pedido</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-48 space-y-6">
        
        {/* Address Section */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">location_on</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Endereço</h2>
            </div>
            {deliveryMethod === 'PICKUP' ? (
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-200 dark:border-green-900/30 flex items-start gap-3 transition-all animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                        <span className="material-symbols-outlined">store</span>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-corporate dark:text-white uppercase mb-1">Ponto de Retirada</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase leading-relaxed">
                            OrcPharm Labs - Matriz<br/>
                            Av. Paulista, 1000 • São Paulo - SP
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 flex items-start justify-between transition-all animate-fade-in">
                    <div>
                        <h3 className="text-xs font-bold text-corporate dark:text-white uppercase mb-1">Casa</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase leading-relaxed">
                            Rua das Flores, 123<br/>
                            Jardins • São Paulo - SP
                        </p>
                    </div>
                    <button className="text-primary text-[10px] font-bold uppercase hover:underline">Alterar</button>
                </div>
            )}
        </section>

        {/* Delivery Method Selection */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">local_shipping</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Método de Entrega</h2>
            </div>
            
            <div className="flex flex-col gap-3">
                {/* Option: Pickup (Featured) */}
                <button 
                    onClick={() => setDeliveryMethod('PICKUP')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all relative ${
                        deliveryMethod === 'PICKUP' 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                        : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-300 dark:hover:border-slate-700'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${deliveryMethod === 'PICKUP' ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <div className="text-left">
                            <span className={`block text-xs font-black uppercase ${deliveryMethod === 'PICKUP' ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>Retirada na Loja</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase mt-0.5">Pronto em 2 horas</span>
                        </div>
                    </div>
                    <div className="text-right">
                         <span className="block text-xs font-black text-green-600 dark:text-green-400 uppercase">Grátis</span>
                    </div>
                    {deliveryMethod === 'PICKUP' && <div className="absolute top-2 right-2 text-green-500"><span className="material-symbols-outlined text-base">check_circle</span></div>} 
                </button>

                {/* Grid for Paid Options */}
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setDeliveryMethod('MOTO')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all relative ${
                            deliveryMethod === 'MOTO' 
                            ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                            : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-300 dark:hover:border-slate-700'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${deliveryMethod === 'MOTO' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>
                            <span className="material-symbols-outlined">two_wheeler</span>
                        </div>
                        <div className="text-center">
                            <span className={`block text-xs font-black uppercase ${deliveryMethod === 'MOTO' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>Motoboy</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase mt-0.5">Hoje, até 18h</span>
                            <span className="block text-xs font-black text-text-main dark:text-white mt-1">R$ 15,00</span>
                        </div>
                        {deliveryMethod === 'MOTO' && <div className="absolute top-2 right-2 text-primary"><span className="material-symbols-outlined text-base">check_circle</span></div>} 
                    </button>

                    <button 
                        onClick={() => setDeliveryMethod('CORREIOS')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all relative ${
                            deliveryMethod === 'CORREIOS' 
                            ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                            : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-300 dark:hover:border-slate-700'
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${deliveryMethod === 'CORREIOS' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>
                            <span className="material-symbols-outlined">local_post_office</span>
                        </div>
                        <div className="text-center">
                            <span className={`block text-xs font-black uppercase ${deliveryMethod === 'CORREIOS' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>Correios</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase mt-0.5">3 a 5 dias úteis</span>
                            <span className="block text-xs font-black text-text-main dark:text-white mt-1">R$ 22,90</span>
                        </div>
                        {deliveryMethod === 'CORREIOS' && <div className="absolute top-2 right-2 text-primary"><span className="material-symbols-outlined text-base">check_circle</span></div>}
                    </button>
                </div>
            </div>
        </section>

        {/* Payment Method */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary filled">payments</span>
                <h2 className="text-sm font-black uppercase text-text-main dark:text-white transition-colors">Pagamento</h2>
            </div>
            
            <div className="space-y-3">
                <button 
                    onClick={() => setPaymentMethod('PIX')}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        paymentMethod === 'PIX' 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                        : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${paymentMethod === 'PIX' ? 'text-green-600' : 'text-gray-400'}`}>qr_code_2</span>
                        <div className="text-left">
                            <span className="block text-xs font-black uppercase text-text-main dark:text-white">PIX (5% OFF)</span>
                            <span className="block text-[10px] font-bold text-green-600 uppercase">Aprovação Imediata</span>
                        </div>
                    </div>
                    {paymentMethod === 'PIX' && <span className="material-symbols-outlined text-green-500">check_circle</span>}
                </button>

                <button 
                    onClick={() => setPaymentMethod('CREDIT')}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        paymentMethod === 'CREDIT' 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                >
                     <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${paymentMethod === 'CREDIT' ? 'text-primary' : 'text-gray-400'}`}>credit_card</span>
                        <div className="text-left">
                            <span className="block text-xs font-black uppercase text-text-main dark:text-white">Cartão de Crédito</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase">Até 3x sem juros</span>
                        </div>
                    </div>
                    {paymentMethod === 'CREDIT' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </button>
            </div>
        </section>

        {/* Order Summary */}
        <section className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-black uppercase text-gray-400 mb-2">Resumo de Valores</h3>
            
            <div className="flex justify-between items-center text-xs font-medium uppercase text-text-sec dark:text-gray-400">
                <span>Subtotal (2 itens)</span>
                <span>{SUBTOTAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs font-medium uppercase text-text-sec dark:text-gray-400">
                <div className="flex flex-col">
                    <span className="font-bold">
                        Entrega ({deliveryMethod === 'MOTO' ? 'Motoboy' : (deliveryMethod === 'PICKUP' ? 'Retirada' : 'Correios')})
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500">
                        {deliveryMethod === 'MOTO' ? 'Previsão: Hoje, até 18h' : (deliveryMethod === 'PICKUP' ? 'Disponível em 2 horas' : 'Previsão: 3 a 5 dias úteis')}
                    </span>
                </div>
                <span className={`${deliveryMethod === 'PICKUP' ? 'text-green-600 font-bold' : ''}`}>
                    {DELIVERY_COST === 0 ? 'GRÁTIS' : DELIVERY_COST.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
            </div>

            {DISCOUNT > 0 && (
                <div className="flex justify-between items-center text-xs font-bold uppercase text-green-600 dark:text-green-400">
                    <span>Desconto PIX (5%)</span>
                    <span>- {DISCOUNT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            )}

            <div className="border-t border-dashed border-gray-200 dark:border-slate-700 pt-3 mt-2 flex justify-between items-center">
                <span className="text-sm font-black uppercase text-text-main dark:text-white">Total Final</span>
                <span className="text-xl font-black text-primary">{TOTAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        </section>

      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 p-4 pb-8 z-30 transition-colors">
        <button 
            onClick={() => setShowThankYouModal(true)} 
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
            <span>Pagar {TOTAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border border-gray-100 dark:border-slate-800 animate-slide-up">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
                </div>
                <h2 className="text-2xl font-black text-corporate dark:text-white uppercase mb-2">Pedido Finalizado!</h2>
                <h3 className="text-sm font-bold text-primary uppercase mb-4">Obrigado pela preferência</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Seu pedido foi recebido com sucesso. Por favor, <strong className="text-text-main dark:text-gray-200">aguarde a comunicação da empresa parceira</strong> para os próximos passos e detalhes da entrega.
                </p>
                <button 
                    onClick={onFinish}
                    className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                    Concluir
                </button>
            </div>
        </div>
      )}
    </div>
  );
}