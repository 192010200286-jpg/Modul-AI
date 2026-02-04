import React, { useRef, useState } from 'react';
import { RPMFormData, RPMGeneratedContent } from '../types';
import { Copy, FileText, CheckCheck, X } from 'lucide-react';

interface Props {
  formData: RPMFormData;
  generatedContent: RPMGeneratedContent;
}

const RPMResult: React.FC<Props> = ({ formData, generatedContent }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyToDocs = async () => {
    if (!tableRef.current) return;

    try {
      const range = document.createRange();
      range.selectNode(tableRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        
        setCopied(true);
        setShowToast(true);
        
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setShowToast(false), 8000); // Show for 8 seconds to ensure user sees it after tab switch

        window.open('https://docs.new', '_blank');
      }
    } catch (err) {
      console.error('Failed to copy', err);
      alert('Gagal menyalin otomatis. Silakan blok tabel dan salin manual.');
    }
  };

  // Custom color based on the screenshot (Peach/Light Orange)
  const headerColor = "bg-[#f6d8b6]"; 

  return (
    <div className="space-y-6 animate-fade-in relative">
        {/* Toast Notification */}
        {showToast && (
            <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full md:w-[400px] animate-bounce-in">
                <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-5 border-l-4 border-green-500 flex items-start gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                        <button 
                            onClick={() => setShowToast(false)}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-full flex-shrink-0 mt-1">
                        <CheckCheck className="text-green-400 w-6 h-6" />
                    </div>
                    <div className="flex-1 pr-4">
                        <h4 className="font-bold text-lg leading-tight mb-1">Berhasil Disalin!</h4>
                        <p className="text-gray-300 text-sm mb-3">
                            Konten telah disalin ke clipboard dan tab Google Dokumen sedang dibuka.
                        </p>
                        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-xs font-mono text-center text-gray-200">
                            <p className="mb-1">Langkah selanjutnya di Google Doc:</p>
                            <div className="flex justify-center gap-2 font-bold text-white">
                                <span className="bg-gray-700 px-2 py-0.5 rounded border border-gray-600">Ctrl</span>
                                <span>+</span>
                                <span className="bg-gray-700 px-2 py-0.5 rounded border border-gray-600">V</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-200 gap-4">
            <div className="text-gray-700">
                <h3 className="font-bold text-lg">RPM Siap!</h3>
                <p className="text-sm">Format sesuai Permendikdasmen No. 1 Tahun 2026</p>
            </div>
            <button 
                onClick={handleCopyToDocs}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow transition-all ${
                    copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                {copied ? <CheckCheck size={20} /> : <FileText size={20} />}
                {copied ? 'Tersalin!' : 'Salin & Buka Google Doc'}
            </button>
        </div>

        {/* DOCUMENT CONTAINER */}
        <div className="bg-white p-8 shadow-2xl rounded-xl overflow-x-auto" ref={tableRef}>
            <div className="min-w-[800px] font-serif text-black leading-tight">
                
                {/* TITLE */}
                <h1 className="text-center font-bold mb-6 text-lg">Format Perencanaan Pembelajaran</h1>
                
                {/* HEADER INFO */}
                <div className="mb-6 font-bold">
                    <h2 className="mb-2">Identitas</h2>
                    <ul className="list-none space-y-1 pl-4">
                        <li className="flex"><span className="w-40">• Nama Sekolah</span><span>: {formData.schoolName}</span></li>
                        <li className="flex"><span className="w-40">• Kelas/Fase</span><span>: {formData.gradeClass} / {formData.level}</span></li>
                        <li className="flex"><span className="w-40">• Semester</span><span>: (Ganjil/Genap)</span></li>
                        <li className="flex"><span className="w-40">• Mata Pelajaran</span><span>: {formData.subject}</span></li>
                        <li className="flex"><span className="w-40">• Alokasi Waktu</span><span>: {formData.duration} ({formData.meetingCount} JP)</span></li>
                        <li className="flex"><span className="w-40">• Materi</span><span>: {formData.material}</span></li>
                    </ul>
                </div>

                {/* === MAIN TABLE === */}
                <table className="rpm-table w-full text-[11pt] border-collapse border border-black mb-8">
                    <tbody>
                        {/* IDENTIFIKASI */}
                        <tr>
                            <td className={`${headerColor} font-bold p-2 w-[25%] align-top border border-black`}>
                                Identifikasi
                            </td>
                            <td className="p-2 align-top border border-black">
                                <div className="mb-4">
                                    <strong>Peserta Didik:</strong> Identifikasi kesiapan peserta didik sebelum belajar.<br/>
                                    <strong>Pengetahuan Awal:</strong>
                                    <div className="whitespace-pre-wrap mt-1">{generatedContent.identifikasi.peserta_didik}</div>
                                </div>
                                <div className="mb-4">
                                    <strong>Materi Pelajaran:</strong><br/>
                                    <div className="whitespace-pre-wrap mt-1">{generatedContent.identifikasi.materi_pelajaran}</div>
                                </div>
                                <div className="mb-4">
                                    <strong>Dimensi Profil Lulusan:</strong>
                                    <ul className="list-none m-0 pl-0">
                                        {formData.dimensions.map((d, i) => <li key={i}>DPL{i+1}: {d}</li>)}
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <strong>Lintas Disiplin Ilmu:</strong><br/>
                                    {generatedContent.identifikasi.lintas_disiplin}
                                </div>
                                <div>
                                    <strong>Panca Cinta (Kemenag RI):</strong>
                                    <ul className="list-disc pl-5 m-0">
                                        {formData.pancaCinta.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                </div>
                            </td>
                        </tr>

                        {/* DESAIN PEMBELAJARAN */}
                        <tr>
                            <td className={`${headerColor} font-bold p-2 align-top border border-black`}>
                                Desain<br/>Pembelajaran
                            </td>
                            <td className="p-2 align-top border border-black">
                                <div className="mb-3">
                                    <strong>Capaian Pembelajaran:</strong><br/>
                                    <div className="whitespace-pre-wrap">{generatedContent.desain_pembelajaran.capaian_pembelajaran_narasi}</div>
                                </div>
                                <div className="mb-3">
                                    <strong>Tujuan Pembelajaran:</strong><br/>
                                    {formData.tp}
                                </div>
                                <div className="mb-3">
                                    <strong>Topik Pembelajaran:</strong> {generatedContent.desain_pembelajaran.topik_pembelajaran}
                                </div>
                                <div className="mb-3">
                                    <strong>Praktik Pedagogis:</strong> {formData.pedagogies.join(', ')}
                                </div>
                                <div className="mb-3">
                                    <strong>Kemitraan Pembelajaran:</strong><br/>
                                    {generatedContent.desain_pembelajaran.kemitraan}
                                </div>
                                <div className="mb-3">
                                    <strong>Lingkungan Pembelajaran:</strong><br/>
                                    {generatedContent.desain_pembelajaran.lingkungan}
                                </div>
                                <div>
                                    <strong>Pemanfaatan Digital:</strong><br/>
                                    {generatedContent.desain_pembelajaran.digital}
                                </div>
                            </td>
                        </tr>

                        {/* PENGALAMAN BELAJAR */}
                        <tr>
                            <td className={`${headerColor} font-bold p-2 align-top border border-black`}>
                                Pengalaman<br/>Belajar
                            </td>
                            <td className="p-2 align-top border border-black">
                                <p className="mb-4 text-justify">
                                    Langkah-langkah Pembelajaran Pada tahap ini, murid aktif terlibat dalam pengalaman belajar memahami, mengaplikasi, dan merefleksi dalam suasana yang saling memuliakan. Pendidik menerapkan prinsip pembelajaran berkesadaran, bermakna, menyenangkan.
                                </p>
                                <div className="mb-3">
                                    <strong>Memahami</strong> (berkesadaran, bermakna, menggembirakan):<br/>
                                    {generatedContent.langkah_pembelajaran.inti.memahami}
                                </div>
                                <div className="mb-3">
                                    <strong>Mengaplikasi</strong> (berkesadaran, bermakna, menggembirakan):<br/>
                                    {generatedContent.langkah_pembelajaran.inti.mengaplikasi}
                                </div>
                                <div>
                                    <strong>Merefleksi</strong> (berkesadaran, bermakna, menggembirakan):<br/>
                                    {generatedContent.langkah_pembelajaran.penutup.kesimpulan}
                                </div>
                            </td>
                        </tr>
                        
                        {/* ASESMEN (Merged into the main table as per screenshot page 3) */}
                        <tr>
                             <td className={`${headerColor} font-bold p-2 align-top border border-black`}>
                                Asesmen<br/>Pembelajaran
                            </td>
                            <td className="p-2 align-top border border-black">
                                <p className="mb-2"><strong>Asesmen Awal:</strong> {generatedContent.asesmen.awal}</p>
                                <p className="mb-2"><strong>Asesmen Proses:</strong> {generatedContent.asesmen.proses}</p>
                                <p><strong>Asesmen Akhir:</strong> {generatedContent.asesmen.akhir}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* === TABEL LANGKAH PEMBELAJARAN (Page 5/6 Style) === */}
                <h3 className="font-bold mb-2">C. Langkah-Langkah Pembelajaran</h3>
                <table className="rpm-table w-full text-[11pt] border-collapse border border-black mb-8">
                    <tbody>
                        {/* Pendahuluan */}
                        <tr className="bg-gray-100"><td colSpan={2} className="font-bold p-2 border border-black">Pendahuluan</td></tr>
                        <tr>
                            <td className="p-2 border border-black w-[30%]">Salam Sapa</td>
                            <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.langkah_pembelajaran.pendahuluan.salam_sapa}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-black">Aktivitas Pemantik</td>
                            <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.langkah_pembelajaran.pendahuluan.aktivitas_pemantik}</td>
                        </tr>
                         <tr>
                            <td className="p-2 border border-black">Informasi</td>
                            <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.langkah_pembelajaran.pendahuluan.informasi_tujuan}</td>
                        </tr>

                        {/* Inti */}
                        <tr className="bg-gray-100"><td colSpan={2} className="font-bold p-2 border border-black">Inti</td></tr>
                        <tr>
                            <td className="p-2 border border-black font-semibold">Memahami<br/><span className="font-normal text-xs">(menggembirakan, berkesadaran)</span></td>
                            <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.langkah_pembelajaran.inti.memahami}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-black font-semibold">Mengaplikasi<br/><span className="font-normal text-xs">(bermakna, menggembirakan)</span></td>
                            <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.langkah_pembelajaran.inti.mengaplikasi}</td>
                        </tr>

                        {/* Penutup */}
                        <tr className="bg-gray-100"><td colSpan={2} className="font-bold p-2 border border-black">Merefleksi dan Penutup</td></tr>
                        <tr>
                            <td className="p-2 border border-black">Presentasi & Kesimpulan</td>
                            <td className="p-2 border border-black whitespace-pre-wrap">
                                {generatedContent.langkah_pembelajaran.penutup.refleksi_presentasi}<br/><br/>
                                {generatedContent.langkah_pembelajaran.penutup.kesimpulan}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* === LAMPIRAN === */}
                <div className="break-before-page">
                    <h2 className="text-center font-bold text-lg mb-4">Lembar Kerja Siswa (LKS)</h2>
                    <div className="border border-black p-4 mb-8">
                        <p><strong>Topik:</strong> {generatedContent.lampiran.lks.judul}</p>
                        <p><strong>Tujuan:</strong> {generatedContent.lampiran.lks.tujuan}</p>
                        <p className="mt-2"><strong>Alat dan Bahan:</strong></p>
                        <div className="whitespace-pre-wrap">{generatedContent.lampiran.lks.alat_bahan}</div>
                        <p className="mt-2"><strong>Langkah Kerja:</strong></p>
                        <div className="whitespace-pre-wrap">{generatedContent.lampiran.lks.langkah_kerja}</div>
                        <p className="mt-2"><strong>Pertanyaan Diskusi:</strong></p>
                        <div className="whitespace-pre-wrap">{generatedContent.lampiran.lks.pertanyaan_diskusi}</div>
                    </div>

                    <h3 className="font-bold mb-2">Rubrik Pengamatan Sikap</h3>
                    <table className="rpm-table w-full border-collapse border border-black mb-8">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-black">Aspek</th>
                                <th className="p-2 border border-black">Deskripsi Indikator</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border border-black font-bold">{generatedContent.lampiran.rubrik.aspek1}</td>
                                <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.lampiran.rubrik.deskripsi1}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-black font-bold">{generatedContent.lampiran.rubrik.aspek2}</td>
                                <td className="p-2 border border-black whitespace-pre-wrap">{generatedContent.lampiran.rubrik.deskripsi2}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="font-bold mb-2">Asesmen Formatif Akhir Pembelajaran (Quiz)</h3>
                    <div className="mb-6">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>{generatedContent.lampiran.soal_akhir.soal1}</li>
                            <li>{generatedContent.lampiran.soal_akhir.soal2}</li>
                            <li>{generatedContent.lampiran.soal_akhir.soal3}</li>
                            <li>{generatedContent.lampiran.soal_akhir.soal4}</li>
                            <li>{generatedContent.lampiran.soal_akhir.soal5}</li>
                        </ol>
                        <div className="mt-4 p-3 bg-gray-50 border border-gray-300">
                            <strong>Kunci Jawaban:</strong><br/>
                            {generatedContent.lampiran.soal_akhir.kunci_jawaban}
                        </div>
                    </div>

                    <h3 className="font-bold mb-2">Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</h3>
                    <div className="border border-black p-2 mb-8 whitespace-pre-wrap">
                        {generatedContent.lampiran.kktp}
                    </div>
                </div>

                {/* SIGNATURES */}
                <div className="flex justify-between mt-12 px-8 font-serif">
                     <div className="text-center">
                        <p className="mb-20">Mengetahui,<br/>Kepala Sekolah</p>
                        <p className="font-bold underline text-lg">{formData.principalName}</p>
                        <p>NIP. {formData.principalNIP}</p>
                    </div>
                    <div className="text-center">
                        <p className="mb-20">Banyuwangi, ..................... 2026<br/>Guru Mata Pelajaran</p>
                        <p className="font-bold underline text-lg">{formData.teacherName}</p>
                        <p>NIP. {formData.teacherNIP}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RPMResult;