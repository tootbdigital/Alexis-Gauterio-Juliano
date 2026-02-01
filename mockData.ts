
import { Obra, Documento, Discipline, DocStatus, Revision, DeliveryStatus, User } from './types';

export const mockObras: Obra[] = [
  { id: 'o1', nome: 'Residencial Aurora', codigo: 'AUR-001', localizacao: 'São Paulo, SP', cliente: 'Incorporadora Sol', status: 'Ativa' },
  { id: 'o2', nome: 'Edifício Horizonte', codigo: 'HOR-002', localizacao: 'Rio de Janeiro, RJ', cliente: 'Construir S.A.', status: 'Ativa' }
];

export const mockDocumentos: Documento[] = [
  { id: 'd1', obraId: 'o1', disciplina: Discipline.ARQ, titulo: 'Planta Baixa - Pavimento Tipo', codigoDesenho: 'ARQ-01-100', local: 'Torre A', status: DocStatus.ENTREGUE },
  { id: 'd2', obraId: 'o1', disciplina: Discipline.ESTR, titulo: 'Armação de Vigas - 5º Pav', codigoDesenho: 'EST-05-201', local: 'Torre B', status: DocStatus.ENTREGUE },
  { id: 'd3', obraId: 'o1', disciplina: Discipline.INST, titulo: 'Layout Elétrico - Áreas Comuns', codigoDesenho: 'ELE-00-050', local: 'Térreo', status: DocStatus.RASCUNHO }
];

export const mockRevisoes: Revision[] = [
  { id: 'r1', documentoId: 'd1', rev: '01', dataEmissao: '2023-10-15', arquivoPdf: 'planta_v1.pdf', descricao: 'Emissão inicial', autor: 'Carlos Arq', aprovadoPor: 'Eng. Marcos', isVigente: false },
  { id: 'r2', documentoId: 'd1', rev: '02', dataEmissao: '2023-11-20', arquivoPdf: 'planta_v2.pdf', descricao: 'Ajuste de shafts', autor: 'Carlos Arq', aprovadoPor: 'Eng. Marcos', isVigente: true },
  { id: 'r3', documentoId: 'd2', rev: 'A', dataEmissao: '2023-12-01', arquivoPdf: 'vigas_v1.pdf', descricao: 'Para execução', autor: 'Eng. Structural', aprovadoPor: 'Eng. Marcos', isVigente: true }
];

export const mockUsers: User[] = [
  { id: 'u1', nome: 'Admin Master', perfil: 'Admin', obraPadraoId: 'o1' },
  { id: 'u2', nome: 'Eng. Marcos', perfil: 'Engenheiro', obraPadraoId: 'o1' },
  { id: 'u3', nome: 'Mestre Silva', perfil: 'Mestre', obraPadraoId: 'o1' }
];
