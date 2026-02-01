
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userPerfil: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userPerfil }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-house-chimney' },
    { id: 'history', label: 'Histórico', icon: 'fa-timeline' },
    { id: 'team', label: 'Minha Equipe', icon: 'fa-users-gear' },
    { id: 'settings', label: 'Configurações', icon: 'fa-sliders' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-40 shadow-2xl">
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-500 w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 shadow-lg shadow-amber-500/30">
            <i className="fa-solid fa-handshake-simple font-bold"></i>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase">1:1 FIELD</h1>
        </div>
        <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">{userPerfil}</p>
      </div>

      <nav className="flex-1 p-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${
              activeTab === item.id 
                ? 'bg-amber-500 text-slate-900 font-black shadow-xl shadow-amber-500/20' 
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center text-lg`}></i>
            <span className="text-xs uppercase tracking-widest">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-900 rounded-l-full"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-slate-800">
        <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700">
          <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest">Atalho Rápido</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="w-full bg-white/5 hover:bg-white/10 p-3 rounded-xl text-[10px] font-bold text-slate-300 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-circle-plus text-amber-500"></i>
            INICIAR CONVERSA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
