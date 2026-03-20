import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import MeetingForm from './components/MeetingForm';
import { Colaborador, OneOnOne, Portal } from './types';

const STORAGE_KEYS = {
  portals: 'bdg-portals',
  meetings: 'bdg-meetings',
};

const initialPortals: Portal[] = [
  {
    id: 'p1',
    nome: 'Portal Canteiro Central',
    codigo: 'PCC-001',
    descricao: 'Portal principal da operação de campo com foco em pessoas, ritmo e execução.',
    responsavel: 'Alexis',
    status: 'Ativo',
    createdAt: '2026-03-20',
  },
  {
    id: 'p2',
    nome: 'Portal Expansão Norte',
    codigo: 'PEN-002',
    descricao: 'Portal dedicado a uma frente adicional para acompanhar crescimento e novos times.',
    responsavel: 'Gabrielle',
    status: 'Planejamento',
    createdAt: '2026-03-20',
  },
];

const initialColaboradores: Colaborador[] = [
  { id: 'c1', nome: 'Derneval', cargo: 'Liderado BDG', obra: 'Canteiro Central', portalId: 'p1', dataUltimoFeedback: '---' },
  { id: 'c2', nome: 'Gabrielle', cargo: 'Liderada BDG', obra: 'Canteiro Central', portalId: 'p1', dataUltimoFeedback: '---' },
  { id: 'c3', nome: 'Fernando', cargo: 'Liderado BDG', obra: 'Canteiro Central', portalId: 'p1', dataUltimoFeedback: '---' },
  { id: 'c4', nome: 'Eliane', cargo: 'Liderada BDG', obra: 'Canteiro Central', portalId: 'p1', dataUltimoFeedback: '---' },
  { id: 'c5', nome: 'Wayne', cargo: 'Liderado BDG', obra: 'Expansão Norte', portalId: 'p2', dataUltimoFeedback: '---' },
  { id: 'c6', nome: 'Rafael', cargo: 'Liderado BDG', obra: 'Expansão Norte', portalId: 'p2', dataUltimoFeedback: '---' },
  { id: 'c7', nome: 'Paulo Vaz', cargo: 'Liderado BDG', obra: 'Expansão Norte', portalId: 'p2', dataUltimoFeedback: '---' },
  { id: 'c8', nome: 'Aniellen', cargo: 'Liderada BDG', obra: 'Expansão Norte', portalId: 'p2', dataUltimoFeedback: '---' },
  { id: 'c9', nome: 'Igor Ollero', cargo: 'Liderado BDG', obra: 'Expansão Norte', portalId: 'p2', dataUltimoFeedback: '---' },
];

const defaultPortalForm = {
  nome: '',
  codigo: '',
  descricao: '',
  responsavel: '',
  status: 'Planejamento' as Portal['status'],
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [meetings, setMeetings] = useState<OneOnOne[]>([]);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);
  const [portals, setPortals] = useState<Portal[]>([]);
  const [activePortalId, setActivePortalId] = useState('');
  const [portalForm, setPortalForm] = useState(defaultPortalForm);

  useEffect(() => {
    const storedPortals = window.localStorage.getItem(STORAGE_KEYS.portals);
    const storedMeetings = window.localStorage.getItem(STORAGE_KEYS.meetings);

    const parsedPortals: Portal[] = storedPortals ? JSON.parse(storedPortals) : initialPortals;
    const parsedMeetings: OneOnOne[] = storedMeetings ? JSON.parse(storedMeetings) : [];

    setPortals(parsedPortals);
    setMeetings(parsedMeetings);
    setActivePortalId(parsedPortals[0]?.id ?? '');
  }, []);

  useEffect(() => {
    if (portals.length > 0) {
      window.localStorage.setItem(STORAGE_KEYS.portals, JSON.stringify(portals));
    }
  }, [portals]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.meetings, JSON.stringify(meetings));
  }, [meetings]);

  const activePortal = useMemo(
    () => portals.find((portal) => portal.id === activePortalId) ?? portals[0] ?? null,
    [portals, activePortalId],
  );

  const teamByPortal = useMemo(
    () => initialColaboradores.filter((colab) => colab.portalId === activePortal?.id),
    [activePortal],
  );

  const meetingsByPortal = useMemo(
    () => meetings.filter((meeting) => meeting.portalId === activePortal?.id),
    [meetings, activePortal],
  );

  const handleSaveMeeting = (data: { answers: OneOnOne['respostas']; analysis: string }) => {
    if (!selectedColaborador || !activePortal) return;

    const newMeeting: OneOnOne = {
      id: `m-${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
      liderId: 'u1',
      lideradoId: selectedColaborador.id,
      portalId: activePortal.id,
      respostas: data.answers,
      insightsIA: data.analysis,
      sentimento: 'Positivo',
    };

    setMeetings((currentMeetings) => [newMeeting, ...currentMeetings]);
    setActiveTab('history');
    setSelectedColaborador(null);
  };

  const handleCreatePortal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedNome = portalForm.nome.trim();
    const normalizedCodigo = portalForm.codigo.trim();
    const normalizedDescricao = portalForm.descricao.trim();
    const normalizedResponsavel = portalForm.responsavel.trim();

    if (!normalizedNome || !normalizedCodigo || !normalizedDescricao || !normalizedResponsavel) {
      return;
    }

    const newPortal: Portal = {
      id: `p-${Date.now()}`,
      nome: normalizedNome,
      codigo: normalizedCodigo.toUpperCase(),
      descricao: normalizedDescricao,
      responsavel: normalizedResponsavel,
      status: portalForm.status,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setPortals((currentPortals) => [newPortal, ...currentPortals]);
    setActivePortalId(newPortal.id);
    setPortalForm(defaultPortalForm);
    setActiveTab('dashboard');
  };

  const renderDashboard = () => (
    <div className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Portais ativos" value={portals.length} icon="fa-layer-group" color="bg-sky-100 text-sky-600" />
        <StatCard title="Conversas do portal" value={meetingsByPortal.length} icon="fa-heart-pulse" color="bg-blue-100 text-blue-600" />
        <StatCard title="Insights Profundos" value={meetingsByPortal.filter((m) => m.insightsIA).length} icon="fa-brain" color="bg-amber-100 text-amber-600" />
        <StatCard title="Time do portal" value={teamByPortal.length} icon="fa-users" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10 gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{activePortal?.nome ?? 'Crie seu primeiro portal'}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                {activePortal ? `${activePortal.codigo} • Responsável: ${activePortal.responsavel}` : 'Cadastre um portal para começar'}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase">{activePortal?.status ?? 'Sem status'}</span>
              <button
                onClick={() => setActiveTab('portals')}
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-colors"
              >
                Novo portal
              </button>
            </div>
          </div>

          {teamByPortal.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                <i className="fa-solid fa-layer-group text-2xl text-slate-300"></i>
              </div>
              <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Este portal foi criado e já pode receber quantas frentes você quiser.</p>
              <p className="text-slate-400 text-xs mt-2">Adicione novos portais ilimitados na aba Portais e use este espaço como cockpit de cada operação.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamByPortal.map((colab) => (
                <div key={colab.id} className="group flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center font-black text-amber-500 text-lg border-2 border-white shadow-md group-hover:rotate-6 transition-transform">
                      {colab.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{colab.nome}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{colab.obra}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedColaborador(colab);
                      setActiveTab('new_meeting');
                    }}
                    className="bg-white border border-slate-200 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all shadow-sm"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8 shadow-lg">
              <i className="fa-solid fa-helmet-safety text-xl"></i>
            </div>
            <p className="text-xl font-bold leading-relaxed mb-8 italic">
              "Agora você pode cadastrar inúmeros portais e alternar entre eles sem perder o histórico de cada operação."
            </p>
            <div className="space-y-1">
              <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Escala BDG</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Cockpit multiportal</p>
            </div>
          </div>
          <i className="fa-solid fa-handshake-simple absolute -bottom-16 -right-16 text-[15rem] text-white/5 transform -rotate-12 pointer-events-none"></i>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Histórico do portal</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">{activePortal?.nome ?? 'Nenhum portal selecionado'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meetingsByPortal.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-history text-3xl text-slate-200"></i>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Ainda não há sessões registradas neste portal.</p>
          </div>
        ) : (
          meetingsByPortal.map((m) => {
            const colab = initialColaboradores.find((c) => c.id === m.lideradoId);
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
                  <p className="text-xs text-slate-400 uppercase font-black tracking-tighter mb-6">{activePortal?.codigo}</p>

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

  const renderPortals = () => (
    <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 animate-fadeIn">
      <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Portais ilimitados</h2>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Cadastre quantos portais precisar e troque o contexto em um clique.</p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[180px]">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total cadastrado</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{portals.length}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {portals.map((portal) => {
            const portalMembers = initialColaboradores.filter((colab) => colab.portalId === portal.id).length;
            const portalMeetings = meetings.filter((meeting) => meeting.portalId === portal.id).length;
            const isActive = portal.id === activePortal?.id;

            return (
              <button
                key={portal.id}
                onClick={() => {
                  setActivePortalId(portal.id);
                  setActiveTab('dashboard');
                }}
                className={`text-left p-6 rounded-[2rem] border transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl'
                    : 'bg-slate-50 hover:bg-white border-slate-100 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-black uppercase tracking-tight">{portal.nome}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isActive ? 'bg-white/10 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                        {portal.status}
                      </span>
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-widest mt-2 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                      {portal.codigo} • {portal.responsavel}
                    </p>
                    <p className={`text-sm mt-4 max-w-2xl ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                      {portal.descricao}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 min-w-[180px]">
                    <div className={`p-3 rounded-2xl ${isActive ? 'bg-white/5' : 'bg-white border border-slate-100'}`}>
                      <p className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>Time</p>
                      <p className="text-2xl font-black mt-1">{portalMembers}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${isActive ? 'bg-white/5' : 'bg-white border border-slate-100'}`}>
                      <p className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>1:1</p>
                      <p className="text-2xl font-black mt-1">{portalMeetings}</p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl text-white">
        <div className="mb-8">
          <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-3">Novo portal</p>
          <h2 className="text-3xl font-black tracking-tight uppercase">Cadastrar outro portal</h2>
          <p className="text-slate-400 mt-3">Preencha os dados abaixo para acrescentar quantos portais forem necessários.</p>
        </div>

        <form className="space-y-5" onSubmit={handleCreatePortal}>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Nome do portal</label>
            <input
              value={portalForm.nome}
              onChange={(event) => setPortalForm((current) => ({ ...current, nome: event.target.value }))}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
              placeholder="Ex.: Portal Retrofit Leste"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Código</label>
              <input
                value={portalForm.codigo}
                onChange={(event) => setPortalForm((current) => ({ ...current, codigo: event.target.value }))}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
                placeholder="Ex.: PRL-003"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Responsável</label>
              <input
                value={portalForm.responsavel}
                onChange={(event) => setPortalForm((current) => ({ ...current, responsavel: event.target.value }))}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
                placeholder="Nome do gestor"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Descrição</label>
            <textarea
              value={portalForm.descricao}
              onChange={(event) => setPortalForm((current) => ({ ...current, descricao: event.target.value }))}
              className="w-full min-h-[140px] rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
              placeholder="Explique o objetivo do portal, frente de obra, operação ou regional."
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Status inicial</label>
            <select
              value={portalForm.status}
              onChange={(event) => setPortalForm((current) => ({ ...current, status: event.target.value as Portal['status'] }))}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:border-amber-500"
            >
              <option className="text-slate-900" value="Planejamento">Planejamento</option>
              <option className="text-slate-900" value="Ativo">Ativo</option>
              <option className="text-slate-900" value="Em pausa">Em pausa</option>
              <option className="text-slate-900" value="Concluído">Concluído</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-amber-500 text-slate-900 font-black uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-2xl shadow-amber-500/20"
          >
            Acrescentar portal
          </button>
        </form>
      </section>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'new_meeting' && selectedColaborador) {
      return (
        <MeetingForm
          colaborador={selectedColaborador}
          onSave={handleSaveMeeting}
          onCancel={() => {
            setActiveTab('dashboard');
            setSelectedColaborador(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'history':
        return renderHistory();
      case 'portals':
        return renderPortals();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-amber-200 antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userPerfil="Líder Senior Alexis" />

      <main className="flex-1 ml-64 p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-16 gap-6 flex-wrap">
          <div className="animate-slideInDown">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">One-to-One</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Cultura de Alta Performance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-end">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Portal ativo</span>
              <select
                value={activePortal?.id ?? ''}
                onChange={(event) => setActivePortalId(event.target.value)}
                className="min-w-[240px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:border-amber-500"
              >
                {portals.map((portal) => (
                  <option key={portal.id} value={portal.id}>
                    {portal.nome}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Alexis</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Gestor Master BDG</p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-slate-900 border-4 border-white shadow-2xl flex items-center justify-center text-amber-500 font-black text-2xl rotate-3 hover:rotate-0 transition-all">
                AL
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
