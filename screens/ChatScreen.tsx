import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'pharmacist';
  time: string;
  isImage?: boolean;
  imageUrl?: string;
}

export default function ChatScreen({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a Dra. Luana. Como posso ajudar com seu pedido hoje?',
      sender: 'pharmacist',
      time: '09:41'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate pharmacist response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Entendi. Vou verificar o status do seu pedido com o laboratório. Um momento, por favor.',
        sender: 'pharmacist',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div className="h-screen bg-background-light dark:bg-slate-950 flex flex-col overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 z-20 pt-4 pb-2 border-b border-gray-100 dark:border-slate-800 shadow-sm shrink-0 transition-colors">
         <div className="flex items-center px-4 mb-3">
             <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
             </button>
             <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Suporte Farmacêutico</h1>
         </div>
         <div className="px-4 pb-2 flex items-center gap-4">
            <div className="relative">
                <div className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop')" }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border border-white dark:border-slate-900"></div>
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-base text-corporate dark:text-white uppercase leading-tight">Farmacêutico Online:<br/>Dra. Luana</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="bg-primary/10 text-primary-dark dark:text-primary-light text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">CRF 12345</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">• Online Agora</span>
                </div>
            </div>
             <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-300">
                <span className="material-symbols-outlined text-sm">more_vert</span>
             </button>
         </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-background-light dark:bg-slate-950 transition-colors">
         <div className="flex justify-center">
            <div className="bg-gray-200 dark:bg-slate-800 rounded-full px-3 py-1 flex items-center gap-1 border border-gray-300 dark:border-slate-700">
                <span className="material-symbols-outlined text-xs text-gray-500 dark:text-gray-400">lock</span>
                <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Conversa monitorada para sua segurança</span>
            </div>
         </div>
         <div className="text-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Hoje</span>
         </div>

         {messages.map((msg) => (
           msg.sender === 'pharmacist' ? (
             <div key={msg.id} className="flex items-end gap-2 max-w-[85%]">
                 <div className="w-6 h-6 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop')" }}></div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-text-sec dark:text-gray-400 uppercase ml-1">Dra. Luana</span>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-slate-800 relative transition-colors">
                        <p className="text-sm font-medium uppercase text-text-main dark:text-white pr-8">{msg.text}</p>
                        <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 absolute bottom-1 right-2">{msg.time}</span>
                    </div>
                 </div>
             </div>
           ) : (
             <div key={msg.id} className="flex items-end gap-2 max-w-[85%] ml-auto justify-end">
                 <div className="flex flex-col gap-1 items-end">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-br-none shadow-sm border-2 border-primary relative transition-colors">
                        <p className="text-sm font-medium uppercase text-text-main dark:text-white pr-8">{msg.text}</p>
                        <span className="text-[9px] font-bold text-gray-300 dark:text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
                        Enviado <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                 </div>
             </div>
           )
         ))}

         {isTyping && (
          <div className="flex items-end gap-2">
             <div className="w-6 h-6 rounded-full bg-cover bg-center shrink-0 opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop')" }}></div>
             <div className="bg-white dark:bg-slate-900 px-3 py-2 h-9 rounded-2xl rounded-bl-none flex items-center gap-1 transition-colors">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-slate-900 p-4 border-t border-gray-100 dark:border-slate-800 z-20 transition-colors">
        <div className="flex items-end gap-2">
             <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center text-text-sec dark:text-gray-400 shrink-0 transition-colors">
                <span className="material-symbols-outlined rotate-45">attach_file</span>
             </button>
             <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-[1.5rem] flex items-center px-4 py-2 transition-colors">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="DIGITE SUA DÚVIDA..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium uppercase placeholder:text-gray-400 dark:placeholder:text-gray-500 text-text-main dark:text-white" 
                />
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">sentiment_satisfied</span>
             </div>
             <button 
               onClick={handleSend}
               disabled={!inputValue.trim()}
               className="w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <span className="material-symbols-outlined ml-1">send</span>
             </button>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
}