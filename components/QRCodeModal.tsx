
import React from 'react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  drawingCode: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, documentId, drawingCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <h3 className="text-xl font-bold mb-2">QR Code de Controle</h3>
        <p className="text-gray-500 mb-6 text-sm">{drawingCode}</p>
        
        <div className="bg-white border-4 border-slate-900 p-4 inline-block rounded-xl mb-6">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=app_doc_${documentId}`} 
            alt="QR Code" 
            className="w-48 h-48"
          />
        </div>

        <p className="text-xs text-gray-400 mb-6 italic">
          O QR Code aponta sempre para a revisão vigente deste documento no campo.
        </p>

        <button 
          onClick={onClose}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
