import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (file: File, previewUrl: string) => void;
  selectedPreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedPreviewUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası yükleyin.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(file, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div 
        className={`relative group border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
            : 'border-slate-600 hover:border-indigo-400 hover:bg-slate-800/50 bg-slate-800/30'
          }
          ${selectedPreviewUrl ? 'border-solid border-indigo-500/50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={inputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        {selectedPreviewUrl ? (
          <div className="relative w-full aspect-[4/3] md:aspect-video rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={selectedPreviewUrl} 
              alt="Uploaded Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Fotoğrafı Değiştir
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className={`p-4 rounded-full bg-slate-700/50 mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fotoğraf Yükle</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              PNG, JPG veya WEBP. Sürükleyip bırakın veya seçmek için tıklayın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;