import React, { useState, useEffect } from 'react';
import { EducationLevel, PedagogyType, GraduateDimension, PancaCinta, RPMFormData } from '../types';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface Props {
  onSubmit: (data: RPMFormData) => void;
  isLoading: boolean;
}

const RPMForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RPMFormData>({
    schoolName: '',
    teacherName: '',
    teacherNIP: '',
    principalName: '',
    principalNIP: '',
    level: EducationLevel.SD,
    gradeClass: '',
    subject: '',
    cp: '',
    tp: '',
    material: '',
    meetingCount: 1,
    duration: '',
    pedagogies: [PedagogyType.InkuiriDiscovery],
    dimensions: [],
    pancaCinta: [],
  });

  // Update pedagogies array when meeting count changes
  useEffect(() => {
    setFormData(prev => {
      const currentLength = prev.pedagogies.length;
      if (prev.meetingCount > currentLength) {
        const diff = prev.meetingCount - currentLength;
        return {
          ...prev,
          pedagogies: [...prev.pedagogies, ...Array(diff).fill(PedagogyType.InkuiriDiscovery)]
        };
      } else if (prev.meetingCount < currentLength) {
        return {
          ...prev,
          pedagogies: prev.pedagogies.slice(0, prev.meetingCount)
        };
      }
      return prev;
    });
  }, [formData.meetingCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (dim: string) => {
    setFormData(prev => {
      const exists = prev.dimensions.includes(dim);
      if (exists) {
        return { ...prev, dimensions: prev.dimensions.filter(d => d !== dim) };
      }
      return { ...prev, dimensions: [...prev.dimensions, dim] };
    });
  };

  const handlePancaCintaChange = (val: string) => {
    setFormData(prev => {
      const exists = prev.pancaCinta.includes(val);
      if (exists) {
        return { ...prev, pancaCinta: prev.pancaCinta.filter(d => d !== val) };
      }
      return { ...prev, pancaCinta: [...prev.pancaCinta, val] };
    });
  };

  const handlePedagogyChange = (index: number, value: string) => {
    const newPedagogies = [...formData.pedagogies];
    newPedagogies[index] = value;
    setFormData(prev => ({ ...prev, pedagogies: newPedagogies }));
  };

  const getClassOptions = () => {
    if (formData.level === EducationLevel.SD) return ['1', '2', '3', '4', '5', '6'];
    if (formData.level === EducationLevel.SMP) return ['7', '8', '9'];
    return ['10', '11', '12'];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Shared classes for input fields to ensure consistency
  const inputClasses = "w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 p-2 border bg-white text-black";

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-8 border border-gray-100">
      
      {/* Section 1: Data Identitas */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary border-b pb-2 flex items-center">
          <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
          Data Pendidik & Sekolah
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Satuan Pendidikan *</label>
            <input required name="schoolName" value={formData.schoolName} onChange={handleChange} className={inputClasses} placeholder="Contoh: SD Negeri 1 Merdeka" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah *</label>
            <input required name="principalName" value={formData.principalName} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIP Kepala Sekolah *</label>
            <input required name="principalNIP" value={formData.principalNIP} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Guru *</label>
            <input required name="teacherName" value={formData.teacherName} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIP Guru *</label>
            <input required name="teacherNIP" value={formData.teacherNIP} onChange={handleChange} className={inputClasses} />
          </div>
        </div>
      </div>

      {/* Section 2: Detail Kelas & Mata Pelajaran */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary border-b pb-2 flex items-center">
            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
            Detail Pembelajaran
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang *</label>
            <select name="level" value={formData.level} onChange={handleChange} className={inputClasses}>
              {Object.values(EducationLevel).map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
            <select required name="gradeClass" value={formData.gradeClass} onChange={handleChange} className={inputClasses}>
                <option value="">Pilih Kelas</option>
                {getClassOptions().map(c => <option key={c} value={c}>Kelas {c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
            <input required name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} placeholder="Contoh: IPAS" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capaian Pembelajaran (CP) *</label>
                <textarea required rows={3} name="cp" value={formData.cp} onChange={handleChange} className={inputClasses} placeholder="Salin CP dari kurikulum..." />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Pembelajaran (TP) *</label>
                <textarea required rows={3} name="tp" value={formData.tp} onChange={handleChange} className={inputClasses} placeholder="Rumusan tujuan pembelajaran..." />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Materi Pelajaran *</label>
                <input required name="material" value={formData.material} onChange={handleChange} className={inputClasses} placeholder="Contoh: Rantai Makanan" />
            </div>
        </div>
      </div>

       {/* Section 3: Teknis Pelaksanaan */}
       <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary border-b pb-2 flex items-center">
            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
            Strategi & Waktu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pertemuan *</label>
                <input required type="number" min="1" max="20" name="meetingCount" value={formData.meetingCount} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durasi per Pertemuan *</label>
                <input required name="duration" value={formData.duration} onChange={handleChange} className={inputClasses} placeholder="Contoh: 2 x 35 menit" />
            </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
            <label className="block text-sm font-medium text-gray-700 mb-3">Praktik Pedagogis per Pertemuan</label>
            {formData.pedagogies.map((pedagogy, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-500 w-24 uppercase">Pertemuan {idx + 1}</span>
                    <select 
                        value={pedagogy} 
                        onChange={(e) => handlePedagogyChange(idx, e.target.value)} 
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 p-2 border text-sm bg-white text-black"
                    >
                        {Object.values(PedagogyType).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            ))}
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensi Lulusan (Pilih yang relevan)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.values(GraduateDimension).map(dim => (
                    <label key={dim} className={`cursor-pointer border p-2 rounded text-sm flex items-center gap-2 transition-colors ${formData.dimensions.includes(dim) ? 'bg-primary/10 border-primary text-primary font-medium' : 'hover:bg-gray-50 bg-white text-black'}`}>
                        <input type="checkbox" checked={formData.dimensions.includes(dim)} onChange={() => handleDimensionChange(dim)} className="rounded text-primary focus:ring-primary" />
                        {dim}
                    </label>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">5 Panca Cinta (Kemenag RI)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.values(PancaCinta).map(val => (
                    <label key={val} className={`cursor-pointer border p-2 rounded text-sm flex items-center gap-2 transition-colors ${formData.pancaCinta.includes(val) ? 'bg-primary/10 border-primary text-primary font-medium' : 'hover:bg-gray-50 bg-white text-black'}`}>
                        <input type="checkbox" checked={formData.pancaCinta.includes(val)} onChange={() => handlePancaCintaChange(val)} className="rounded text-primary focus:ring-primary" />
                        {val}
                    </label>
                ))}
            </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Sedang Menyusun RPM...
            </>
          ) : (
            'Generate Rencana Pembelajaran'
          )}
        </button>
      </div>
    </form>
  );
};

export default RPMForm;