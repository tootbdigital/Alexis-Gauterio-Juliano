
import { Question } from '../types';

export const PILLARS = [
  "1️⃣ Abertura – Clima e Presença",
  "2️⃣ Cultura BDG – Valores na Prática",
  "3️⃣ DNA e Potencial – Identidade",
  "4️⃣ Performance e Projeto – Entrega",
  "5️⃣ Ambição e Crescimento",
  "6️⃣ Caminho pra chegar lá – Ação",
  "7️⃣ Liderança – Espelho e Maturidade",
  "8️⃣ Fechamento Forte – Compromisso"
];

const BDG_VALORES = [
  'Confiança',
  'Comunicação',
  'Espírito de dono',
  'Trabalho em equipe',
  'Segurança e conformidade',
  'Inovação'
];

export const QUESTIONS: Question[] = [
  // 1. Abertura (10 Perguntas)
  { id: 'q1', pillar: 0, label: 'Como você está de verdade hoje?', type: 'text', placeholder: 'Papo reto: como está a cabeça e o coração?' },
  { id: 'q2', pillar: 0, label: 'Nível de presença e foco para esta conversa?', type: 'scale' },
  { id: 'q3', pillar: 0, label: 'O que tem te dado mais energia no trabalho ultimamente?', type: 'text' },
  { id: 'q4', pillar: 0, label: 'E o que mais tem te drenado?', type: 'text' },
  { id: 'q5', pillar: 0, label: 'Nível de energia geral hoje?', type: 'scale' },
  { id: 'q6', pillar: 0, label: 'Tem algo fora do trabalho que eu preciso saber para te apoiar?', type: 'text' },
  { id: 'q7', pillar: 0, label: 'Você sente que este é um espaço seguro para falar?', type: 'choice', options: ['Sim, total', 'Na maior parte', 'Ainda construindo', 'Não muito'] },
  { id: 'q8', pillar: 0, label: 'Como você avalia a qualidade do seu descanso nos últimos dias?', type: 'scale' },
  { id: 'q9', pillar: 0, label: 'Qual sua principal expectativa para esta conversa hoje?', type: 'text' },
  { id: 'q10', pillar: 0, label: 'Se sua semana fosse uma obra, ela estaria em que fase?', type: 'text' },

  // 2. Cultura BDG (10 Perguntas)
  { id: 'q11', pillar: 1, label: 'O que é “jeito BDG de fazer obra” pra você?', type: 'text' },
  { id: 'q12', pillar: 1, label: 'Quanto você sente que vive os valores da BDG?', type: 'scale' },
  { id: 'q13', pillar: 1, label: 'Em quais momentos você acha que estamos vivendo bem nossos valores?', type: 'text' },
  { id: 'q14', pillar: 1, label: 'Onde estamos escorregando como time no aspecto cultural?', type: 'text' },
  { id: 'q15', pillar: 1, label: 'Qual valor da BDG você mais se identifica hoje?', type: 'choice', options: BDG_VALORES },
  { id: 'q16', pillar: 1, label: 'E qual valor mais te desafia a praticar?', type: 'choice', options: BDG_VALORES },
  { id: 'q17', pillar: 1, label: 'Você sente orgulho de apresentar esta obra para sua família?', type: 'scale' },
  { id: 'q18', pillar: 1, label: 'O quanto você sente que sua opinião é ouvida na empresa?', type: 'scale' },
  { id: 'q19', pillar: 1, label: 'Cite um exemplo recente onde você agiu como "dono" da obra.', type: 'text' },
  { id: 'q20', pillar: 1, label: 'Se você fosse o dono da BDG, o que nunca mudaria aqui?', type: 'text' },

  // 3. DNA E POTENCIAL (10 Perguntas)
  { id: 'q21', pillar: 2, label: 'Qual você considera ser seu maior "superpoder" profissional?', type: 'text', placeholder: 'Aquilo que você faz melhor que todo mundo...' },
  { id: 'q22', pillar: 2, label: 'Nível de resiliência emocional sob pressão extrema?', type: 'scale' },
  { id: 'q23', pillar: 2, label: 'Qual característica sua o time mais confia e depende?', type: 'text' },
  { id: 'q24', pillar: 2, label: 'Qual o seu maior "ponto cego" comportamental hoje?', type: 'text', placeholder: 'Aquela falha que você já percebeu, mas é difícil mudar...' },
  { id: 'q25', pillar: 2, label: 'Nível de facilidade em receber e aplicar críticas pesadas?', type: 'scale' },
  { id: 'q26', pillar: 2, label: 'Em que situação recente você sentiu que superou seus próprios limites?', type: 'text' },
  { id: 'q27', pillar: 2, label: 'Qual perfil melhor descreve sua personalidade no campo?', type: 'choice', options: ['Executor Veloz', 'Planejador Detalhista', 'Líder Agregador', 'Analista Técnico'] },
  { id: 'q28', pillar: 2, label: 'O que você mais admira em um colega e gostaria de ter em si mesmo?', type: 'text' },
  { id: 'q29', pillar: 2, label: 'Clareza sobre como seu temperamento impacta o resultado da obra?', type: 'scale' },
  { id: 'q30', pillar: 2, label: 'Se você pudesse mudar um único traço da sua personalidade, qual seria?', type: 'text' },

  // 4. Performance e Projeto (10 Perguntas)
  { id: 'q31', pillar: 3, label: 'Do que você mais se orgulha no seu projeto hoje?', type: 'text' },
  { id: 'q32', pillar: 3, label: 'Qual a sua nota para a entrega técnica da última quinzena?', type: 'scale' },
  { id: 'q33', pillar: 3, label: 'O que, se você pudesse refazer agora, faria diferente?', type: 'text' },
  { id: 'q34', pillar: 3, label: 'Onde você sente que precisa de mais apoio técnico ou clareza?', type: 'text' },
  { id: 'q35', pillar: 3, label: 'O que está travando a performance da obra hoje?', type: 'choice', options: ['Processos', 'Pessoas', 'Decisão', 'Logística'] },
  { id: 'q36', pillar: 3, label: 'Nível de autonomia percebido na sua função?', type: 'scale' },
  { id: 'q37', pillar: 3, label: 'Como você avalia o ritmo de produtividade atual da equipe?', type: 'scale' },
  { id: 'q38', pillar: 3, label: 'Qual o maior risco técnico que você identifica no canteiro hoje?', type: 'text' },
  { id: 'q39', pillar: 3, label: 'Nível de segurança observado na sua frente de serviço?', type: 'scale' },
  { id: 'q40', pillar: 3, label: 'O que falta para atingirmos 100% de qualidade na sua área?', type: 'text' },

  // 5. Ambição e Crescimento (10 Perguntas)
  { id: 'q41', pillar: 4, label: 'Onde você quer chegar profissionalmente nos próximos 2-3 anos?', type: 'text' },
  { id: 'q42', pillar: 4, label: 'Que tipo de líder ou especialista você quer se tornar?', type: 'text' },
  { id: 'q43', pillar: 4, label: 'Qual sua clareza sobre o próximo passo na sua carreira?', type: 'scale' },
  { id: 'q44', pillar: 4, label: 'O que você acha que ainda te falta para dar esse próximo passo?', type: 'text' },
  { id: 'q45', pillar: 4, label: 'Se dependesse só de você, que nova responsabilidade assumiria hoje?', type: 'text' },
  { id: 'q46', pillar: 4, label: 'Nível de ambição e "vontade de crescer" hoje?', type: 'scale' },
  { id: 'q47', pillar: 4, label: 'O quanto você se vê crescendo dentro da BDG a longo prazo?', type: 'scale' },
  { id: 'q48', pillar: 4, label: 'Qual projeto da empresa você mais gostaria de liderar no futuro?', type: 'text' },
  { id: 'q49', pillar: 4, label: 'Se você pudesse escolher um mentor na empresa, quem seria?', type: 'text' },
  { id: 'q50', pillar: 4, label: 'O que sucesso significa para você, além do salário?', type: 'text' },

  // 6. Caminho pra chegar lá (10 Perguntas)
  { id: 'q51', pillar: 5, label: 'O que você precisa aprender ou desenvolver para evoluir?', type: 'text' },
  { id: 'q52', pillar: 5, label: 'Qual a sua nota para o seu esforço de autodesenvolvimento?', type: 'scale' },
  { id: 'q53', pillar: 5, label: 'Que projetos na obra podem acelerar esse crescimento?', type: 'text' },
  { id: 'q54', pillar: 5, label: 'Onde você precisa ser mais firme ou ter mais iniciativa?', type: 'text' },
  { id: 'q55', pillar: 5, label: 'Qual hábito seu, se melhorado, mudaria seu jogo profissional?', type: 'text' },
  { id: 'q56', pillar: 5, label: 'Disponibilidade para novos desafios fora da zona de conforto?', type: 'choice', options: ['Total', 'Parcial', 'Focado no atual'] },
  { id: 'q57', pillar: 5, label: 'Quanto tempo você dedica por semana ao seu aprendizado?', type: 'choice', options: ['< 1h', '1-3h', '3-5h', '5h+'] },
  { id: 'q58', pillar: 5, label: 'Qual livro, curso ou experiência te marcou recentemente?', type: 'text' },
  { id: 'q59', pillar: 5, label: 'Você tem facilidade em ensinar o que sabe para os outros?', type: 'scale' },
  { id: 'q60', pillar: 5, label: 'O que te impede de ser 1% melhor todos os dias?', type: 'text' },

  // 7. Liderança - Espelho (10 Perguntas)
  { id: 'q61', pillar: 6, label: 'O que eu, como seu líder Alexis, faço que realmente te ajuda?', type: 'text' },
  { id: 'q62', pillar: 6, label: 'E o que eu faço que poderia fazer melhor ou deixar de fazer?', type: 'text' },
  { id: 'q63', pillar: 6, label: 'Nível de confiança e transparência em nossa relação?', type: 'scale' },
  { id: 'q64', pillar: 6, label: 'Em que momentos você se sente com total autonomia para decidir?', type: 'text' },
  { id: 'q65', pillar: 6, label: 'O que você espera de mim como seu gestor nos próximos meses?', type: 'text' },
  { id: 'q66', pillar: 6, label: 'Nível de clareza das minhas instruções e metas para você?', type: 'scale' },
  { id: 'q67', pillar: 6, label: 'Sente-se confortável para me dar um feedback "papo reto" agora?', type: 'choice', options: ['Sim', 'Depende do assunto', 'Prefiro outro momento'] },
  { id: 'q68', pillar: 6, label: 'Como você avalia minha agilidade em resolver seus problemas?', type: 'scale' },
  { id: 'q69', pillar: 6, label: 'Eu sou um líder que te inspira ou que te cobra?', type: 'choice', options: ['Mais inspira', 'Mais cobra', 'Equilibrado', 'Nenhum'] },
  { id: 'q70', pillar: 6, label: 'Qual atitude minha você mais gostaria que eu mantivesse?', type: 'text' },

  // 8. Fechamento Forte (10 Perguntas)
  { id: 'q71', pillar: 7, label: 'Qual é o compromisso concreto que você assume até nosso próximo 1:1?', type: 'text' },
  { id: 'q72', pillar: 7, label: 'O que eu (Alexis) prometo fazer por você até nosso próximo encontro?', type: 'text' },
  { id: 'q73', pillar: 7, label: 'O que precisa mudar AGORA na sua atitude para o time voar?', type: 'text' },
  { id: 'q74', pillar: 7, label: 'Nota geral para a utilidade desta conversa de hoje?', type: 'scale' },
  { id: 'q75', pillar: 7, label: 'Ficou algo por dizer que você não teve coragem ou tempo?', type: 'text' },
  { id: 'q76', pillar: 7, label: 'Nível de alinhamento e clareza pós-conversa?', type: 'scale' },
  { id: 'q77', pillar: 7, label: 'Como você está saindo dessa sala (sentimento)?', type: 'text' },
  { id: 'q78', pillar: 7, label: 'Qual a prioridade número 1 da sua semana a partir de agora?', type: 'text' },
  { id: 'q79', pillar: 7, label: 'Em uma escala de 1 a 5, quanto você acredita no plano que traçamos?', type: 'scale' },
  { id: 'q80', pillar: 7, label: 'Resuma nossa conversa em uma única palavra.', type: 'text' }
];
