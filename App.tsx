import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import PresetGrid from './components/PresetGrid';
import ResultDisplay from './components/ResultDisplay';
import { generateTransformedImage } from './services/geminiService';
import { Preset } from './types';

function App() {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [manualApiKey, setManualApiKey] = useState<string>(""); 

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
    } else {
      // Check if env var exists (for local dev or properly configured builds)
      if (process.env.API_KEY) {
        setHasApiKey(true);
      }
    }
  };

  const handleSelectApiKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setHasApiKey(true);
      } catch (e) {
        console.error("Key selection failed", e);
      }
    } else {
      // Manual entry validation
      if (manualApiKey.trim().length > 10) {
        setHasApiKey(true);
      } else {
        alert("Lütfen geçerli bir API anahtarı girin (AIza...).");
      }
    }
  };

  const handleImageSelected = (file: File, url: string) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setResultImage(null);
    setError(null);
  };

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    setError(null);
  };

  const handleBackToStyles = () => {
    setSelectedPreset(null);
    setResultImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!previewUrl || !selectedPreset) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Use manualApiKey if provided, otherwise the service will look for process.env.API_KEY
      const generated = await generateTransformedImage(previewUrl, selectedPreset.prompt, manualApiKey);
      setResultImage(generated);
    } catch (err: any) {
      console.error(err);
      
      // If error suggests missing key, reset to key entry screen
      if (err.message && (err.message.includes("API Anahtarı bulunamadı") || err.message.includes("403"))) {
         if (!process.env.API_KEY && !manualApiKey) {
            setHasApiKey(false);
         }
         setError("API Hatası: Anahtarınız yetkisiz veya eksik. Lütfen geçerli bir anahtar girdiğinizden emin olun.");
         return;
      }

      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `magiclens-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // -------------------------------------------------------------------------
  // API Key Entry Screen
  // -------------------------------------------------------------------------
  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Hoşgeldiniz</h2>
          
          <div className="text-slate-400 mb-6 space-y-4">
            <p>
              Uygulamayı kullanmak için Google AI Studio'dan (Gemini) aldığınız API anahtarını giriniz.
            </p>
            
            {/* Show manual input if not in aistudio environment */}
            {!window.aistudio ? (
              <div className="space-y-4 text-left">
                <label className="block text-sm font-medium text-slate-300">
                  API Anahtarınızı Yapıştırın:
                </label>
                <input 
                  type="password" 
                  value={manualApiKey}
                  onChange={(e) => setManualApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500">
                  Anahtarınız sadece tarayıcınızda geçici olarak kullanılır.
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-300">
                Google IDX ortamındasınız, aşağıdaki butonu kullanabilirsiniz.
              </p>
            )}
          </div>

          <button 
            onClick={handleSelectApiKey}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all mb-4"
          >
            {window.aistudio ? "API Anahtarı Seç" : "Anahtarı Kaydet ve Başla"}
          </button>
          
          <div className="text-xs text-slate-500 border-t border-slate-700 pt-4">
             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                API Anahtarı Alın
              </a>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Main App UI
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              MagicLens AI
            </span>
          </div>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => {
                 setHasApiKey(false);
                 setManualApiKey("");
               }}
               className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
             >
               Anahtarı Değiştir
             </button>
            <div className="text-sm text-slate-400 hidden sm:block">
              Gemini 3 Pro
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 relative">
        {/* Background blobs */}
        <div className="fixed top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* STEP 1: STYLE SELECTION */}
          {!selectedPreset && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <div className="text-center mb-10 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Önce Bir <span className="text-indigo-400">Stil</span> Seçin
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Dönüştürmek istediğiniz stili seçerek başlayın. Ardından fotoğrafınızı yükleyip sonucu görebilirsiniz.
                </p>
              </div>
              <PresetGrid 
                onSelectPreset={handlePresetSelect} 
                disabled={isProcessing}
              />
            </div>
          )}

          {/* STEP 2: IMAGE UPLOAD & GENERATION */}
          {selectedPreset && (
            <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col items-center">
              
              {/* Context Header */}
              <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <button 
                  onClick={handleBackToStyles}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Stil Değiştir
                </button>
                
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    {selectedPreset.icon}
                  </span>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Seçilen Stil</p>
                    <p className="font-semibold text-white">{selectedPreset.label}</p>
                  </div>
                </div>
                
                <div className="hidden md:block w-32"></div> {/* Spacer for better centering */}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Fotoğraf Yükle</h2>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Bu stili uygulamak için bir fotoğraf yükleyin.
                </p>
              </div>

              <ImageUploader 
                onImageSelected={handleImageSelected} 
                selectedPreviewUrl={previewUrl}
              />

              {error && (
                <div className="w-full max-w-xl mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              {previewUrl && (
                <button
                  onClick={handleGenerate}
                  disabled={isProcessing}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full max-w-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isProcessing ? 'Sihir Yapılıyor...' : 'Sihri Başlat'}
                    {!isProcessing && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.008c.108.166.177.369.177.585a.75.75 0 001.348.375 3 3 0 014.053 4.053.75.75 0 00.375 1.348A.75.75 0 0118 24a2.25 2.25 0 01-2.25-2.25c0-.158.05-.306.135-.43a.75.75 0 00-.375-1.349 3 3 0 01-4.053-4.053.75.75 0 00-1.349-.375c-.144 0-.28.03-.406.085l-1.385-1.385.085-.405a.75.75 0 00-.375-1.349 3 3 0 01-4.053-4.053.75.75 0 00.375-1.348 2.25 2.25 0 012.25-2.25z" clipRule="evenodd" />
                        <path d="M5.625 12a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75h-1.5zM12 5.625a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
                      </svg>
                    )}
                  </span>
                </button>
              )}

            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MagicLens AI. Google Gemini API kullanılarak oluşturulmuştur.</p>
      </footer>

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-white">Sihir Yapılıyor...</h3>
            <p className="text-slate-400 text-center text-sm">
              Yapay zeka fotoğrafınızı işliyor. Bu işlem genellikle 15-20 saniye sürer.
            </p>
          </div>
        </div>
      )}

      {/* Result Modal */}
      <ResultDisplay 
        originalImage={previewUrl}
        resultImage={resultImage}
        onClose={() => setResultImage(null)}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default App;