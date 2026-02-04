import { GoogleGenAI, Type } from "@google/genai";
import { RPMFormData, RPMGeneratedContent } from "../types";

const parseGeminiResponse = (responseText: string): RPMGeneratedContent => {
  try {
    // Find the first '{' and the last '}' to handle potential markdown or extra text
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Format JSON tidak ditemukan dalam respons.");
    }

    const jsonString = responseText.substring(firstBrace, lastBrace + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    console.error("Raw response:", responseText.slice(0, 200) + "..."); 
    throw new Error("Gagal memproses respons AI. Mohon coba lagi.");
  }
};

export const generateRPM = async (data: RPMFormData): Promise<RPMGeneratedContent> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key tidak ditemukan.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Anda adalah konsultan kurikulum profesional. Buat konten Rencana Pembelajaran Mendalam (RPM) sesuai Permendikdasmen No. 1 Tahun 2026.
    
    Data Input:
    - Mapel: ${data.subject}
    - Fase/Kelas: ${data.gradeClass} (${data.level})
    - Materi: ${data.material}
    - TP: ${data.tp}
    - Model: ${data.pedagogies.join(', ')}

    Instruksi:
    1. Buat konten yang **spesifik**, **operasional**, dan **tidak bertele-tele**.
    2. Hindari pengulangan kalimat yang tidak perlu.
    3. Pastikan format JSON valid dan lengkap sesuai skema.
    
    Detail Isi:
    - Identifikasi Peserta Didik: Fokus pada pengetahuan awal dan prasyarat.
    - Desain Pembelajaran: Uraikan CP menjadi langkah konkret.
    - Langkah Pembelajaran:
      * Pendahuluan: Apersepsi yang menarik.
      * Inti: Kegiatan "Memahami" (konsep) & "Mengaplikasi" (praktik/LKS).
      * Penutup: Refleksi singkat.
    - Lampiran LKS: Harus ada langkah kerja eksperimen/aktivitas nyata.
    - Soal Akhir: 5 soal pilihan ganda singkat.

    Output Wajib JSON.
  `;

  // Using gemini-3-pro-preview for better handling of complex structured output
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identifikasi: {
            type: Type.OBJECT,
            properties: {
              peserta_didik: { type: Type.STRING },
              materi_pelajaran: { type: Type.STRING },
              lintas_disiplin: { type: Type.STRING }
            }
          },
          desain_pembelajaran: {
            type: Type.OBJECT,
            properties: {
              capaian_pembelajaran_narasi: { type: Type.STRING },
              topik_pembelajaran: { type: Type.STRING },
              kemitraan: { type: Type.STRING },
              lingkungan: { type: Type.STRING },
              digital: { type: Type.STRING }
            }
          },
          langkah_pembelajaran: {
            type: Type.OBJECT,
            properties: {
              pendahuluan: {
                type: Type.OBJECT,
                properties: {
                  salam_sapa: { type: Type.STRING },
                  aktivitas_pemantik: { type: Type.STRING },
                  informasi_tujuan: { type: Type.STRING }
                }
              },
              inti: {
                type: Type.OBJECT,
                properties: {
                  memahami: { type: Type.STRING },
                  mengaplikasi: { type: Type.STRING }
                }
              },
              penutup: {
                type: Type.OBJECT,
                properties: {
                  refleksi_presentasi: { type: Type.STRING },
                  kesimpulan: { type: Type.STRING }
                }
              }
            }
          },
          asesmen: {
            type: Type.OBJECT,
            properties: {
              awal: { type: Type.STRING },
              proses: { type: Type.STRING },
              akhir: { type: Type.STRING }
            }
          },
          lampiran: {
            type: Type.OBJECT,
            properties: {
              lks: {
                type: Type.OBJECT,
                properties: {
                  judul: { type: Type.STRING },
                  tujuan: { type: Type.STRING },
                  alat_bahan: { type: Type.STRING },
                  langkah_kerja: { type: Type.STRING },
                  pertanyaan_diskusi: { type: Type.STRING }
                }
              },
              rubrik: {
                type: Type.OBJECT,
                properties: {
                  aspek1: { type: Type.STRING },
                  deskripsi1: { type: Type.STRING },
                  aspek2: { type: Type.STRING },
                  deskripsi2: { type: Type.STRING }
                }
              },
              soal_akhir: {
                type: Type.OBJECT,
                properties: {
                  soal1: { type: Type.STRING },
                  soal2: { type: Type.STRING },
                  soal3: { type: Type.STRING },
                  soal4: { type: Type.STRING },
                  soal5: { type: Type.STRING },
                  kunci_jawaban: { type: Type.STRING }
                }
              },
              kktp: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Tidak ada respons dari AI.");
  }

  return parseGeminiResponse(response.text);
};