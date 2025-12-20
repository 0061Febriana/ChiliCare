import { motion } from "motion/react";
import { DiagnosisResults } from "./DiagnosisPage";
import {
  Home,
  AlertTriangle,
  Info,
  CheckCircle2,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

interface ResultPageProps {
  results: DiagnosisResults;
  onNavigateBack: () => void;
}

// Disease database with symptoms for each disease
interface Disease {
  name: string;
  symptoms: string[];
  solutions: string[];
  severity: "warning" | "info" | "success";
}

const diseaseDatabase: Disease[] = [
  {
    name: "Layu Fusarium",
    symptoms: [
      "Apakah daun layu walau tanah basah?",
      "Apakah batang terdapat garis hitam atau coklat?",
      "Apakah akar tidak berkembang normal?",
      "Apakah pertumbuhan terhambat?",
      "Apakah tanah terlalu lembab?",
      "Apakah drainase buruk?",
    ],
    solutions: [
      "Gunakan benih tahan terhadap fusarium ",
      "Perbaiki drainase tanah (Buat bedengan tinggi dan saluran air yang lancar) ",
      "Segera cabut dan musnahkan terinfeksi",
      "Lakukan rotasi tanaman hindari tanam cabai terus-menerus",
      "Sterilkan tanah atau gunakan Trichoderma",
      "Perbaiki drainase tanah",
    ],
    severity: "warning",
  },
  {
    name: "Busuk Batang",
    symptoms: [
      "Apakah batang busuk?",
      "Apakah batang layu mendadak?",
      "Apakah tanah terlalu becek?",
      "Apakah tanaman kekurangan kalsium",
      "Apakah buah terlihat layu ?",
      "Apakah intensitas hujan tinggi?",
    ],
    solutions: [
      "Hindari penyiraman berlebih",
      "Gunakan mulsa plastik untuk menjaga kelembapan tetap stabil",
      "Semprot dengan pupuk kalsium",
      "Lakukan drainase lahan",
      "Cabut tanaman yang busuk agar tidak menular",
      "Perbaiki drainase tanah",
    ],
    severity: "warning",
  },
  {
    name: "Bercak Daun",
    symptoms: [
      "Apakah daun bercak coklat?",
      "Apakah daun rontok?",
      "Apakah kurang sinar matahari?",
      "Apakah tidak ada pengendalian hama?",
    ],
    solutions: [
      "Pangkas daun bawah agar sirkulasi udara lancar",
      "Jaga kebersihan lahan dari daun gugur",
      "Gunakan fungisida kontak seperti mankozeb atau klorotalonil",
      "Hindari jarak tanam terlalu rapat",
    ],
    severity: "info",
  },
  {
    name: "Daun Kerdil (Virus)",
    symptoms: [
      "Apakah daun keriting?",
      "Apakah daun menguning?",
      "Apakah pertumbuhan terhambat?",
      "Apakah buah keriput atau kerdil?",
      "Apakah tanah gembur tapi banyak kutu kebul?",
      "Apakah jarang disemprot insektisida nabati?",
    ],
    solutions: [
      "Kendalikan hama vektor dengan insektisida nabati atau perangkap kuning",
      "Tanam varietas tahan virus",
      "Cabut tanaman terinfeksi berat",
      "Hindari jarak tanam terlalu rapat",
      "Bersihkan di sekitar lahan gulma",
    ],
    severity: "warning",
  },
  {
    name: "Busuk Akar / Rebah Semai",
    symptoms: [
      "Apakah akar membusuk?",
      "Apakah akar berwarna coklat kehitaman?",
      "Apakah batang mengering di bagian bawah?",
      "Apakah banyak sisa buah busuk di tanah?",
      "Apakah tidak dilakukan penggemburan?",
      "Apakah kualitas bibit rendah?",
      "Apakah tanah terlalu lembab?",
    ],
    solutions: [
      "Gunakan media tanam steril untuk persemaian",
      "Jangan menyiram berlebihan",
      "Tambahkan Trichoderma pada tanah",
      "Jaga aerasi tanah tetap baik",
      "Hindari menanam di lahan yang terlalu lembab",
    ],
    severity: "warning",
  },
  {
    name: "Antraknosa / Patek",
    symptoms: [
      "Apakah buah gugur sebelum matang?",
      "Apakah jarak tanam terlalu rapat?",
      "Apakah kebersihan lahan kurang?",
      "Apakah tanah terlalu lembab?",
      "Apakah buah bercak coklat kehitaman?",
      "Apakah buah mengkerut dan mengering?",
    ],
    solutions: [
      "Panen buah segera setelah matang",
      "Semprotkan fungisida preventif saat buah mulai muncul",
      "Gunakan varietas tahan antraknosa",
      "Jaga kebersihan lahan dan alat panen",
      "Hindari buah kontak langsung dengan tanah",
    ],
    severity: "info",
  },
  {
    name: "Virus Kuning atau Gemini",
    symptoms: [
      "Apakah daun menguning?",
      "Apakah daun kecil dan menggulung ke atas?",
      "Apakah tulang daun menebal dan berwarna kuning?",
      "Apakah tanaman kerdil?",
      "Apakah bunga dan buah rontok?",
    ],
    solutions: [
      "Pengendalian dengan insektisida",
      "Gunakan benih yang sehat",
      "Lakukan sanitasi lahan dari gulma",
      "Musnahkan segera tanaman yang terinfeksi",
    ],
    severity: "warning",
  },
  {
    name: "Layu Bakteri",
    symptoms: [
      "Apakah daun layu pada tanaman muda?",
      "Apakah terdapat lendir putih susu pada batang dan akar?",
      "Apakah batang busuk?",
      "Apakah akar membusuk?",
    ],
    solutions: [
      "Aplikasikan agensia hayati seperti Pseudomonas fluorescens dan Bacillus subtilis",
      "Lakukan penyemprotan bakterisida",
      "Musnahkan tanaman terinfeksi",
      "Lakukan penggiliran tanaman",
    ],
    severity: "warning",
  },
];

export default function ResultPage({
  results,
  onNavigateBack,
}: ResultPageProps) {
  // Get "Yes" answers
  const getYesAnswers = () => {
    return Object.entries(results.answers)
      .filter(([_, answer]) => answer === true)
      .map(([question]) => question);
  };

  const yesAnswers = getYesAnswers();

  // Calculate score for each disease based on matching symptoms
  const calculateDiseaseScores = () => {
    return diseaseDatabase.map((disease) => {
      let score = 0;
      const matchedSymptoms: string[] = [];

      yesAnswers.forEach((answer) => {
        if (disease.symptoms.includes(answer)) {
          score++;
          matchedSymptoms.push(answer);
        }
      });

      return {
        disease,
        score,
        matchedSymptoms,
        matchPercentage:
          disease.symptoms.length > 0
            ? (score / disease.symptoms.length) * 100
            : 0,
      };
    });
  };

  // Get the disease with highest score
  const getDiagnosis = () => {
    if (yesAnswers.length === 0) {
      return {
        diagnosis:
          "Tidak ada gejala yang terdeteksi. Tanaman Anda tampak sehat!",
        disease: null,
        score: 0,
        matchedSymptoms: [],
        severity: "success" as const,
      };
    }

    const scores = calculateDiseaseScores();
    const sortedScores = scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.matchPercentage - a.matchPercentage;
    });

    const topDisease = sortedScores[0];

    if (topDisease.score === 0) {
      return {
        diagnosis: `Terdeteksi ${yesAnswers.length} gejala pada tanaman. Diperlukan perawatan lebih lanjut.`,
        disease: null,
        score: 0,
        matchedSymptoms: [],
        severity: "info" as const,
      };
    }

    const diagnosis = `Terdeteksi gejala penyakit ${
      topDisease.disease.name
    } yang disebabkan oleh ${getDiseaseDescription(topDisease.disease.name)}.`;

    return {
      diagnosis,
      disease: topDisease.disease,
      score: topDisease.score,
      matchedSymptoms: topDisease.matchedSymptoms,
      severity: topDisease.disease.severity,
    };
  };

  const getDiseaseDescription = (diseaseName: string): string => {
    const descriptions: Record<string, string> = {
      "Layu Fusarium": "jamur patogen fusarium oxysporum",
      "Busuk Batang": "jamur phytophthora capsici",
      "Bercak Daun": "jamur cercospora capsici atau alternaria solani",
      "Daun Kerdil (Virus)":
        "serangan virus yang ditularkan serangga kutu kebul atau aphid",
      "Busuk Akar / Rebah Semai":
        "jamur tanah pythium sp. atau rhizoctonia sp.",
      "Antraknosa / Patek": "jamur colletotrichum capsici",
      "Virus Kuning atau Gemini":
        "virus dari kelompok Begomovirus (seperti Pepper Yellow Leaf Curl Virus atau TYLCV)",
      "Layu Bakteri": "bakteri Ralstonia solanacearum",
    };
    return descriptions[diseaseName] || "penyebab yang belum teridentifikasi";
  };

  const getSolution = () => {
    if (yesAnswers.length === 0) {
      return [
        "Lanjutkan perawatan rutin tanaman Anda dengan penyiraman teratur dan pemupukan sesuai jadwal.",
      ];
    }

    const diagnosisResult = getDiagnosis();

    if (diagnosisResult.disease) {
      return diagnosisResult.disease.solutions;
    }

    return [
      "Lakukan pemantauan rutin kondisi tanaman",
      "Pastikan penyiraman dan pemupukan teratur",
      "Jaga kebersihan area sekitar tanaman",
      "Pastikan tanaman mendapat cukup sinar matahari",
    ];
  };

  const diagnosisResult = getDiagnosis();
  const solutions = getSolution();

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica");

    // Header
    doc.setFillColor(39, 174, 96);
    doc.rect(0, 0, 210, 40, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Diagnosa Cabai", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text("Hasil Diagnosa Penyakit Tanaman Cabai", 105, 30, {
      align: "center",
    });

    // Date
    const currentDate = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.setFontSize(10);
    doc.text(`Tanggal: ${currentDate}`, 105, 50, { align: "center" });

    // Diagnosis Section
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(16);
    doc.text("Hasil Diagnosis", 20, 70);

    // Diagnosis box
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(20, 75, 170, 30);

    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);
    const diagnosisLines = doc.splitTextToSize(diagnosisResult.diagnosis, 160);
    doc.text(diagnosisLines, 25, 83);

    // Score badge (if applicable)
    let yPosition = 110;
    if (diagnosisResult.score > 0) {
      doc.setFontSize(10);
      doc.setTextColor(39, 174, 96);
      doc.text(`✓ ${diagnosisResult.score} gejala cocok`, 25, yPosition);
      yPosition += 10;
    }

    // Solutions Section
    yPosition += 10;
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(16);
    doc.text("Solusi & Rekomendasi", 20, yPosition);

    yPosition += 8;
    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);

    solutions.forEach((solution, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      const solutionText = `${index + 1}. ${solution}`;
      const solutionLines = doc.splitTextToSize(solutionText, 165);
      doc.text(solutionLines, 25, yPosition);
      yPosition += solutionLines.length * 6 + 3;
    });

    // Symptoms Section (if any)
    if (yesAnswers.length > 0) {
      yPosition += 10;

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setTextColor(44, 62, 80);
      doc.setFontSize(16);
      doc.text(`Gejala yang Terdeteksi (${yesAnswers.length})`, 20, yPosition);

      yPosition += 8;
      doc.setFontSize(10);
      doc.setTextColor(52, 73, 94);

      yesAnswers.forEach((symptom, index) => {
        if (yPosition > 275) {
          doc.addPage();
          yPosition = 20;
        }

        const cleanedSymptom = symptom.replace("Apakah ", "").replace("?", "");
        doc.text(`• ${cleanedSymptom}`, 25, yPosition);
        yPosition += 6;
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Diagnosa Cabai - Halaman ${i} dari ${pageCount}`, 105, 290, {
        align: "center",
      });
    }

    // Save PDF
    const fileName = `Hasil_Diagnosa_Cabai_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const getSeverityIcon = () => {
    switch (diagnosisResult.severity) {
      case "warning":
        return <AlertTriangle size={32} color="#E74C3C" />;
      case "info":
        return <Info size={32} color="#3498DB" />;
      case "success":
        return <CheckCircle2 size={32} color="#27AE60" />;
    }
  };

  const getSeverityColor = () => {
    switch (diagnosisResult.severity) {
      case "warning":
        return "#E74C3C";
      case "info":
        return "#3498DB";
      case "success":
        return "#27AE60";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col"
      style={{
        background: "linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 sm:p-6 text-center shadow-sm"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#2C3E50",
            fontSize: "clamp(1.25rem, 4vw, 1.875rem)",
            fontWeight: "bold",
          }}
        >
          Hasil Diagnosa
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Diagnosis Result Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 mt-1">{getSeverityIcon()}</div>
              <div className="flex-1">
                <h2
                  className="mb-3"
                  style={{
                    color: "#2C3E50",
                    fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                    fontWeight: "700",
                  }}
                >
                  Diagnosis Penyakit
                </h2>
                <p
                  className="leading-relaxed"
                  style={{
                    color: "#34495E",
                    fontSize: "clamp(0.9375rem, 2.5vw, 1.0625rem)",
                    lineHeight: "1.7",
                  }}
                >
                  {diagnosisResult.diagnosis}
                </p>
              </div>
            </div>

            {/* Score Badge */}
            {diagnosisResult.score > 0 && (
              <div
                className="inline-block px-4 py-2 rounded-full mt-3"
                style={{
                  backgroundColor: `${getSeverityColor()}15`,
                  border: `2px solid ${getSeverityColor()}`,
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    color: getSeverityColor(),
                    fontWeight: "600",
                  }}
                >
                  ✓ {diagnosisResult.score} gejala cocok
                </p>
              </div>
            )}
          </motion.div>

          {/* Solution Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <h2
              className="mb-4 flex items-center gap-2"
              style={{
                color: "#2C3E50",
                fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                fontWeight: "700",
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#27AE60" }}
              >
                💡
              </span>
              Solusi & Rekomendasi
            </h2>
            <div className="space-y-3">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-gray-50"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "#27AE60",
                      color: "#FFFFFF",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </div>
                  <p
                    style={{
                      color: "#34495E",
                      fontSize: "clamp(0.9375rem, 2.5vw, 1.0625rem)",
                      lineHeight: "1.6",
                    }}
                  >
                    {solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detected Symptoms (if any) */}
          {yesAnswers.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h3
                className="mb-4"
                style={{
                  color: "#2C3E50",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontWeight: "700",
                }}
              >
                Gejala yang Terdeteksi ({yesAnswers.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yesAnswers.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <CheckCircle2 size={16} color="#27AE60" />
                    <p
                      className="text-sm"
                      style={{
                        color: "#34495E",
                      }}
                    >
                      {symptom.replace("Apakah ", "").replace("?", "")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-4 sm:p-6 bg-white shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generatePDF}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl shadow-md transition-all"
              style={{
                background: "linear-gradient(135deg, #3498DB 0%, #2980B9 100%)",
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: "1.0625rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download size={20} />
              Download PDF
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateBack}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl shadow-md transition-all"
              style={{
                background: "linear-gradient(135deg, #27AE60 0%, #229954 100%)",
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: "1.0625rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Home size={20} />
              Kembali ke Halaman Utama
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
