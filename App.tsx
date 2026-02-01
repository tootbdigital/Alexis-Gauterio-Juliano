
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import MeetingForm from './components/MeetingForm';
import { OneOnOne, Colaborador } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [meetings, setMeetings] = useState<OneOnOne[]>([]);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  // Time real atualizado conforme solicitado por Alexis
  const timeMock: Colaborador[] = [
    { id: 'c1', nome: 'Derneval', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c2', nome: 'Gabrielle', cargo: 'Liderada BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c3', nome: 'Fernando', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c4', nome: 'Eliane', cargo: 'Liderada BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c5', nome: 'Wayne', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c6', nome: 'Rafael', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c7', nome: 'Paulo Vaz', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c8', nome: 'Aniellen', cargo: 'Liderada BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
    { id: 'c9', nome: 'Igor Ollero', cargo: 'Liderado BDG', obra: 'Canteiro Central', dataUltimoFeedback: '---' },
  ];

  const handleSaveMeeting = (data: any) => {
    if (!selectedColaborador) return;

    const newMeeting: OneOnOne = {
      id: `m-${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
      liderId: 'u1',
      lideradoId: selectedColaborador.id,
      respostas: data.answers,
      insightsIA: data.analysis,
      sentimento: 'Positivo'
    };

    setMeetings([newMeeting, ...meetings]);
    setActiveTab('history');
    setSelectedColaborador(null);
  };

  const renderDashboard = () => (
    <div className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Conversas de Alexis" value={meetings.length} icon="fa-heart-pulse" color="bg-blue-100 text-blue-600" />
        <StatCard title="Insights Profundos" value={meetings.filter(m => m.insightsIA).length} icon="fa-brain" color="bg-amber-100 text-amber-600" />
        <StatCard title="Alinhamento BDG" value="98%" icon="fa-bullseye" color="bg-green-100 text-green-600" />
        <StatCard title="Time de Campo" value={timeMock.length} icon="fa-users" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Equipe de Alexis</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Selecione para iniciar o 1:1</p>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase">80 Pontos de Alinhamento</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeMock.map(colab => (
              <div key={colab.id} className="group flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center font-black text-amber-500 text-lg border-2 border-white shadow-md group-hover:rotate-6 transition-transform">
                    {colab.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{colab.nome}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status: Pronto para 1:1</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setSelectedColaborador(colab); setActiveTab('new_meeting'); }}
                  className="bg-white border border-slate-200 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all shadow-sm"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
           <div className="relative z-10">
             <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8 shadow-lg">
                <i className="fa-solid fa-helmet-safety text-xl"></i>
             </div>
             <p className="text-xl font-bold leading-relaxed mb-8 italic">
               "Nenhuma obra é maior que as pessoas que a constroem. Alexis, sua escuta é sua melhor ferramenta."
             </p>
             <div className="space-y-1">
               <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Cultura Alexis</p>
               <p className="text-slate-500 text-[10px] font-bold uppercase">Liderança Senior BDG</p>
             </div>
           </div>
           <i className="fa-solid fa-handshake-simple absolute -bottom-16 -right-16 text-[15rem] text-white/5 transform -rotate-12 pointer-events-none"></i>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Dossiê de Alexis</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Evolução do Time BDG</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meetings.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-history text-3xl text-slate-200"></i>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Alexis, o histórico aguarda sua primeira sessão.</p>
          </div>
        ) : (
          meetings.map(m => {
            const colab = timeMock.find(c => c.id === m.lideradoId);
            return (
              <div key={m.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all group">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-slate-900 text-amber-500 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{m.data}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <i className="fa-solid fa-brain"></i>
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-2">{colab?.nome}</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-tighter mb-6">Liderado BDG</p>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl mb-6 italic text-sm text-slate-600 border-l-4 border-amber-500 font-medium">
                    "{m.respostas.q42 || 'Resumo da conversa concluída.'}"
                  </div>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg">
                  Ver Análise Estratégica
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'new_meeting' && selectedColaborador) {
      return (
        <MeetingForm 
          colaborador={selectedColaborador} 
          onSave={handleSaveMeeting} 
          onCancel={() => { setActiveTab('dashboard'); setSelectedColaborador(null); }}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'history': return renderHistory();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-amber-200 antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userPerfil="Líder Senior Alexis" />
      
      <main className="flex-1 ml-64 p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-16">
          <div className="animate-slideInDown">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">One-to-One</h1>
            <div className="flex items-center gap-3 mt-2">
               <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
               <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Cultura de Alta Performance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Alexis</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Gestor Master BDG</p>
            </div>
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border-4 border-white shadow-2xl flex items-center justify-center text-amber-500 font-black text-2xl rotate-3 hover:rotate-0 transition-all">
              AL
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
