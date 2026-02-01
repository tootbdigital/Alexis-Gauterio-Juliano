
export type AnswerType = 'text' | 'scale' | 'choice';

export interface Question {
  id: string;
  pillar: number;
  label: string;
  type: AnswerType;
  options?: string[];
  placeholder?: string;
}

export interface MeetingAnswers {
  [key: string]: string | number;
}

export interface OneOnOne {
  id: string;
  data: string;
  liderId: string;
  lideradoId: string;
  respostas: MeetingAnswers;
  insightsIA?: string;
  sentimento: 'Positivo' | 'Neutro' | 'Preocupante';
}

export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  obra: string;
  foto?: string;
  dataUltimoFeedback?: string;
}

export interface Obra {
  id: string;
  nome: string;
  codigo: string;
  localizacao: string;
  cliente: string;
  status: string;
}

export enum Discipline {
  ARQ = 'ARQ',
  ESTR = 'ESTR',
  INST = 'INST'
}

export enum DocStatus {
  ENTREGUE = 'ENTREGUE',
  RASCUNHO = 'RASCUNHO'
}

export interface Documento {
  id: string;
  obraId: string;
  disciplina: Discipline;
  titulo: string;
  codigoDesenho: string;
  local: string;
  status: DocStatus;
}

export interface Revision {
  id: string;
  documentoId: string;
  rev: string;
  dataEmissao: string;
  arquivoPdf: string;
  descricao: string;
  autor: string;
  aprovadoPor: string;
  isVigente: boolean;
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  nome: string;
  perfil: string;
  obraPadraoId: string;
}
