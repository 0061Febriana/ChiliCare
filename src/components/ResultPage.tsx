import { jsPDF } from "jspdf";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import { DiagnosisResult } from "./DiagnosisPage";

interface ResultPageProps {
  result: DiagnosisResult;
  onBack: () => void;
}

export default function ResultPage({ result, onBack }: ResultPageProps) {
  const { bestDisease, diagnosis } = result;

  /* =====================
     DOWNLOAD PDF (jsPDF)
  ===================== */
  const downloadPDF = () => {
    const element = document.getElementById("result-pdf");
    if (!element) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.html(element, {
      callback: function (doc) {
        doc.save("hasil-diagnosa-penyakit-cabai.pdf");
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      html2canvas: {
        scale: 0.8,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* =====================
            AREA YANG DIJADIKAN PDF
        ===================== */}
        <div
          id="result-pdf"
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Hasil Diagnosa Penyakit Cabai
            </h1>
            <p className="text-sm text-gray-500">
              Sistem Pakar Diagnosa Penyakit Tanaman Cabai
            </p>
          </div>

          {/* Penyakit Utama */}
          {bestDisease ? (
            <div className="bg-green-50 border border-green-300 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" />
                <h2 className="text-lg font-semibold text-green-700">
                  Penyakit Paling Mungkin
                </h2>
              </div>

              <p className="text-xl font-bold text-green-800">
                {bestDisease.name}
              </p>

              <p className="text-sm text-green-700 mt-1">
                Skor kecocokan: {bestDisease.score}
              </p>

              <h3 className="font-semibold mt-4 mb-2 text-green-700">
                Solusi Penanganan:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {bestDisease.solution.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-6">
              <p className="text-yellow-700 text-sm">
                Tidak ditemukan penyakit dominan berdasarkan gejala yang
                dipilih.
              </p>
            </div>
          )}

          {/* Detail Skor */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">
              Detail Skor Semua Penyakit
            </h3>

            <div className="space-y-2">
              {diagnosis.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between bg-gray-100 rounded-lg p-3"
                >
                  <span className="text-gray-700">{d.name}</span>
                  <span className="font-bold">{d.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
            <strong>Catatan:</strong> Hasil diagnosa ini bersifat rekomendasi
            awal dan tidak menggantikan pemeriksaan langsung oleh ahli
            pertanian.
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-400 text-center mt-6">
            Dicetak oleh Sistem Pakar Diagnosa Penyakit Cabai
          </div>
        </div>

        {/* =====================
            TOMBOL AKSI
        ===================== */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            <Download size={18} />
            Unduh PDF
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
