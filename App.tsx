import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import RPMForm from './components/RPMForm';
import RPMResult from './components/RPMResult';
import { generateRPM } from './services/geminiService';
import { RPMFormData, RPMGeneratedContent } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RPMFormData | null>(null);
  const [result, setResult] = useState<RPMGeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: RPMFormData) => {
    setIsLoading(true);
    setError(null);
    setFormData(data); // Save form data to pass to result view
    
    try {
      const generatedContent = await generateRPM(data);
      setResult(generatedContent);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat membuat RPM. Pastikan API KEY valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
            <img 
              src="https://i.imghippo.com/files/nrnU9752iR.png" 
              alt="Logo Formal" 
              className="h-12 w-auto" 
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Generator RPM</h1>
              <p className="text-xs text-gray-500 font-medium">Perencanaan Pembelajaran Mendalam AI</p>
            </div>
          </div>
          {result && (
            <button 
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-primary font-medium"
            >
              Buat Baru
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Conditional Rendering */}
        {!result ? (
          <div className="space-y-6">
             <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 flex-shrink-0 mt-1 text-yellow-300" />
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Selamat Datang, Bapak/Ibu Guru Hebat!</h2>
                        <p className="opacity-90 leading-relaxed">
                            Lengkapi formulir di bawah ini untuk membuat Rencana Pembelajaran Mendalam (RPM) yang terstruktur, kreatif, dan sesuai dengan kebutuhan siswa Anda secara otomatis menggunakan kecerdasan buatan.
                        </p>
                    </div>
                </div>
             </div>
            <RPMForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        ) : (
          formData && <RPMResult formData={formData} generatedContent={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-8 border-t mt-12">
        <p>© 2026 Generator RPM Berbasis AI. Dibuat oleh Eko Cahyono untuk MIN 1 Banyuwangi</p>
      </footer>
    </div>
  );
};

export default App;