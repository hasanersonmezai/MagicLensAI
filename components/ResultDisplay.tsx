import React from 'react';

interface ResultDisplayProps {
  originalImage: string | null;
  resultImage: string | null;
  onClose: () => void;
  onDownload: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, resultImage, onClose, onDownload }) => {
  if (!resultImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-sm z-10">
          <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Sihirli Dönüşüm Tamamlandı ✨
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-start">
          
          {/* Original */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">Orijinal</span>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 aspect-auto">
              {originalImage && (
                <img src={originalImage} alt="Original" className="w-full h-auto" />
              )}
            </div>
          </div>

          {/* Result */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider pl-1">Yapay Zeka Sonucu</span>
            <div className="rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] bg-slate-800">
              <img src={resultImage} alt="Generated" className="w-full h-auto" />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Kapat
          </button>
          <button
            onClick={onDownload}
            className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            İndir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;