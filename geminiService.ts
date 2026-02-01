
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeOneOnOneDeep = async (answers: any, colaborador: string) => {
  try {
    const prompt = `Como Mentor Master de Liderança BDG, analise este One-on-One EXAUSTIVO (80 perguntas em 8 pilares) do liderado ${colaborador}, conduzido pelo Líder Sênior Alexis.
    
    Dados brutos (Foco especial nos pilares de DNA, Cultura e Liderança): ${JSON.stringify(answers)}
    
    Forneça uma análise de ALTA GESTÃO para o Alexis:
    1. **Perfil Psicológico e Operacional**: Como os traços de personalidade e o DNA dele estão influenciando a entrega técnica e a cultura do canteiro?
    2. **Mapa de Calor Emocional**: O liderado está engajado, em burnout ou apenas "cumprindo tabela"?
    3. **Diagnóstico de Liderança**: O que o Alexis precisa mudar ou reforçar na sua gestão específica com este colaborador?
    4. **Plano de Virada (Cirúrgico)**: 3 ações críticas e 1 "conselho mestre" para transformar este liderado em um talento de alto nível.
    5. **Indicador de Retenção**: Probabilidade de turnover ou perda de foco nos próximos 90 dias.

    Seja direto, use um tom executivo e mentor. Fale de líder para líder.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Alexis, houve um erro no processamento da IA. Use sua intuição sênior para analisar os 80 pontos de contato manualmente.";
  }
};
