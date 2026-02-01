
import React, { useRef, useState, useEffect } from 'react';

interface SignaturePadProps {
  onSave: (data: string) => void;
  onClear: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#0f172a'; // Slate 900
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Feedback visual imediato no contexto
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(245, 158, 11, 0.5)'; // Amber 500
    
    ctx.beginPath();
    const { x, y } = getCoord(e);
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoord(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.shadowBlur = 0; // Remove o brilho ao parar
      }
    }
  };

  const getCoord = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Cálculo preciso considerando o zoom do browser e escala do elemento
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Verifica se o canvas não está vazio antes de salvar (opcional)
    onSave(canvas.toDataURL());
  };

  return (
    <div className={`relative border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
      isDrawing 
        ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.01]' 
        : 'border-slate-200 border-dashed bg-slate-50'
    }`}>
      {/* Indicador visual de "Assinando" */}
      {isDrawing && (
        <div className="absolute top-4 right-4 flex items-center gap-2 animate-pulse pointer-events-none">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Capturando...</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={800} // Maior resolução interna
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`w-full h-[200px] touch-none transition-all ${
          isDrawing ? 'cursor-none' : 'cursor-crosshair'
        }`}
        style={{ 
          // Cursor personalizado quando estiver desenhando
          cursor: isDrawing ? 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSIjRjU5RTBCIi8+PC9zdmc+"), auto' : 'crosshair'
        }}
      />

      <div className="p-4 flex justify-between items-center bg-white border-t border-slate-100">
        <button 
          onClick={handleClear} 
          className="text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
        >
          <i className="fa-solid fa-eraser mr-2"></i>
          Limpar
        </button>
        <button 
          onClick={handleSave} 
          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all shadow-md"
        >
          Confirmar Assinatura
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
