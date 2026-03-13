import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onSignUp: () => void;
}

interface UserProfile {
  id: number;
  type: 'MAIN' | 'DEPENDENT';
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen({ onBack, onSignUp }: Props) {
  // State to manage multiple profiles (Max 3)
  const [profiles, setProfiles] = useState<UserProfile[]>([
    { id: 1, type: 'MAIN', name: '', cpf: '', birthDate: '', phone: '', email: '', password: '', confirmPassword: '' }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProfile = profiles[activeIndex];

  // Handler to add a new dependent
  const handleAddProfile = () => {
    if (profiles.length < 3) {
      const newId = profiles.length + 1;
      const newProfile: UserProfile = { 
        id: newId, 
        type: 'DEPENDENT', 
        name: '', 
        cpf: '', 
        birthDate: '', 
        phone: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
      };
      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);
      setActiveIndex(updatedProfiles.length - 1); // Switch to new profile
    }
  };

  // Handler to remove a dependent
  const handleRemoveProfile = (index: number) => {
    if (index === 0) return; // Cannot remove main user
    
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
    setActiveIndex(Math.max(0, index - 1));
  };

  // Generic input handler
  const handleChange = (field: keyof UserProfile, value: string) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[activeIndex] = { ...updatedProfiles[activeIndex], [field]: value };
    setProfiles(updatedProfiles);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-slate-950 z-20 px-4 py-3 flex items-center border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
         <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h1 className="flex-1 text-center font-bold text-sm uppercase pr-10 text-text-main dark:text-white">Criar Conta</h1>
      </header>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar">
        
        <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-corporate dark:text-blue-300 uppercase leading-tight">Boas-vindas<br/>ao OrcPharm</h2>
            <p className="text-xs font-bold text-text-sec dark:text-gray-400 uppercase mt-2">Cadastre você e seus dependentes</p>
        </div>

        {/* Profile Tabs Manager */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
            {profiles.map((profile, index) => (
                <button 
                    key={profile.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shrink-0 ${
                        activeIndex === index 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:border-primary/50'
                    }`}
                >
                    <span className="material-symbols-outlined text-sm">
                        {profile.type === 'MAIN' ? 'person' : 'face'}
                    </span>
                    <span className="text-xs font-bold uppercase">
                        {profile.type === 'MAIN' ? 'Titular' : `Dependente ${index}`}
                    </span>
                    {profile.type === 'DEPENDENT' && activeIndex === index && (
                        <span 
                            onClick={(e) => { e.stopPropagation(); handleRemoveProfile(index); }}
                            className="ml-1 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40"
                        >
                            <span className="material-symbols-outlined text-[10px]">close</span>
                        </span>
                    )}
                </button>
            ))}

            {profiles.length < 3 && (
                <button 
                    onClick={handleAddProfile}
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all shrink-0"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            )}
        </div>

        <div className="space-y-5 animate-fade-in">
            {/* Header for Active Profile */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-slate-800 mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Editando: {activeProfile.type === 'MAIN' ? 'Titular' : 'Dependente'}
                </span>
            </div>

            {/* Nome Completo */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Nome Completo</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">person</span>
                    <input 
                        type="text" 
                        value={activeProfile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="DIGITE O NOME" 
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white transition-colors"
                    />
                </div>
            </div>

            {/* CPF & Data Nascimento Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">CPF</label>
                    <input 
                        type="tel" 
                        value={activeProfile.cpf}
                        onChange={(e) => handleChange('cpf', e.target.value)}
                        placeholder="000.000.000-00" 
                        className="w-full h-14 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white text-center transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Nascimento</label>
                    <input 
                        type="tel" 
                        value={activeProfile.birthDate}
                        onChange={(e) => handleChange('birthDate', e.target.value)}
                        placeholder="DD/MM/AAAA" 
                        className="w-full h-14 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white text-center transition-colors"
                    />
                </div>
            </div>

            {/* Celular / WhatsApp */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Celular / WhatsApp</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">smartphone</span>
                    <input 
                        type="tel" 
                        value={activeProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(00) 00000-0000" 
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white transition-colors"
                    />
                </div>
            </div>

            {/* E-mail (Only for Main user usually, but allowed for all if needed. Assuming separate logins or just separate data) */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">E-mail</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">mail</span>
                    <input 
                        type="email" 
                        value={activeProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="SEU@EMAIL.COM" 
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white transition-colors"
                    />
                </div>
            </div>

            {/* Passwords - Only show for Main User or if full account creation is implied for dependents */}
            {activeProfile.type === 'MAIN' && (
                <>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Senha</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">lock</span>
                            <input 
                                type="password" 
                                value={activeProfile.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="SENHA ALFANUMÉRICA" 
                                className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white transition-colors"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary">
                                <span className="material-symbols-outlined">visibility_off</span>
                            </button>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase ml-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">abc</span>
                            Use letras e números
                        </p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Confirmar Senha</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">lock_reset</span>
                            <input 
                                type="password" 
                                value={activeProfile.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder="REPITA SUA SENHA" 
                                className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm font-bold uppercase placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-primary focus:ring-primary text-text-main dark:text-white transition-colors"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Termos */}
            {activeProfile.type === 'MAIN' && (
                <div className="flex items-start gap-3 pt-2">
                    <div className="w-6 h-6 rounded-lg border-2 border-gray-300 dark:border-slate-600 flex items-center justify-center shrink-0 cursor-pointer hover:border-primary">
                        {/* <span className="material-symbols-outlined text-sm text-primary">check</span> */}
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase leading-relaxed">
                        Ao criar conta, você concorda com nossos <span className="text-primary underline">Termos de Uso</span> e <span className="text-primary underline">Política de Privacidade</span>.
                    </p>
                </div>
            )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 p-4 pb-8 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-colors">
        <button 
            onClick={onSignUp} 
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
            {profiles.length > 1 ? `Finalizar (${profiles.length} Perfis)` : 'Criar Minha Conta'}
            <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
}