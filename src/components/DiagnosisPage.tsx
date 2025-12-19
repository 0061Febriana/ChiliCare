import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =====================
   INTERFACE
===================== */
export interface DiagnosisResult {
  answers: Record<string, boolean>;
  diagnosis: DiseaseResult[];
  bestDisease: DiseaseResult | null;
}

interface DiseaseResult {
  name: string;
  score: number;
  solution: string[];
}

interface DiagnosisPageProps {
  onNavigateToResult: (result: DiagnosisResult) => void;
}

/* =====================
   GEJALA
===================== */
const symptomMap: Record<string, string> = {
  G01: "Apakah daun menguning?",
  G02: "Apakah daun keriting?",
  G03: "Apakah daun bercak coklat?",
  G04: "Apakah daun layu walau tanah basah?",
  G05: "Apakah daun layu pada tanaman muda?",
  G06: "Apakah daun rontok?",
  G07: "Apakah daun kecil dan menggulung ke atas?",
  G08: "Apakah tulang daun menebal dan berwarna kuning?",
  G09: "Apakah batang busuk?",
  G10: "Apakah batang mengering di bagian bawah?",
  G11: "Apakah batang terdapat garis hitam atau coklat?",
  G12: "Apakah batang layu mendadak?",
  G13: "Apakah terdapat lendir putih susu pada batang dan akar?",
  G14: "Apakah buah gugur sebelum matang?",
  G15: "Apakah buah keriput atau kerdil?",
  G16: "Apakah buah bercak coklat kehitaman?",
  G17: "Apakah buah mengkerut dan mengering?",
  G18: "Apakah buah terlihat layu?",
  G19: "Apakah bunga dan buah rontok?",
  G20: "Apakah pertumbuhan terhambat?",
  G21: "Apakah tanaman kerdil?",
  G22: "Apakah akar membusuk?",
  G23: "Apakah akar berwarna coklat kehitaman?",
  G24: "Apakah akar tidak berkembang normal?",
  G25: "Apakah tanah terlalu lembab?",
  G26: "Apakah drainase buruk?",
  G27: "Apakah tanah terlalu becek?",
  G28: "Apakah tanah gembur tapi banyak kutu kebul?",
  G29: "Apakah banyak sisa buah busuk di tanah?",
  G30: "Apakah jarak tanam terlalu rapat?",
  G31: "Apakah intensitas hujan tinggi?",
  G32: "Apakah kurang sinar matahari?",
  G33: "Apakah tidak ada pengendalian hama?",
  G34: "Apakah tidak dilakukan penggemburan?",
  G35: "Apakah kebersihan lahan kurang?",
  G36: "Apakah jarang disemprot insektisida nabati?",
  G37: "Apakah tanaman kekurangan kalsium?",
  G38: "Apakah kualitas bibit rendah?",
};

const questions = Object.values(symptomMap);

/* =====================
   RULE PENYAKIT
===================== */
const diseaseRules = [
  {
    name: "Layu Fusarium",
    symptoms: ["G04", "G11", "G20", "G24", "G25", "G26"],
    solution: [
      "Gunakan benih tahan fusarium",
      "Perbaiki drainase tanah",
      "Cabut dan musnahkan tanaman terinfeksi",
      "Rotasi tanaman",
      "Gunakan Trichoderma",
    ],
  },
  {
    name: "Busuk Batang",
    symptoms: ["G09", "G12", "G18", "G27", "G31", "G37"],
    solution: [
      "Hindari penyiraman berlebih",
      "Gunakan mulsa plastik",
      "Semprot pupuk kalsium",
      "Perbaiki drainase lahan",
    ],
  },
  {
    name: "Bercak Daun",
    symptoms: ["G03", "G06", "G32", "G33"],
    solution: [
      "Pangkas daun bawah",
      "Jaga kebersihan lahan",
      "Gunakan fungisida kontak",
      "Hindari jarak tanam rapat",
    ],
  },
  {
    name: "Daun Kerdil",
    symptoms: ["G02", "G01", "G15", "G20", "G28", "G36"],
    solution: [
      "Kendalikan kutu kebul",
      "Tanam varietas tahan virus",
      "Cabut tanaman terinfeksi berat",
      "Bersihkan gulma",
    ],
  },
  {
    name: "Busuk Akar / Rebah Semai",
    symptoms: ["G10", "G22", "G23", "G25", "G29", "G34", "G38"],
    solution: [
      "Gunakan media tanam steril",
      "Jangan menyiram berlebihan",
      "Tambahkan Trichoderma",
      "Jaga aerasi tanah",
    ],
  },
  {
    name: "Antraknosa (Patek)",
    symptoms: ["G14", "G16", "G17", "G25", "G30", "G36"],
    solution: [
      "Panen tepat waktu",
      "Semprot fungisida preventif",
      "Gunakan varietas tahan",
      "Jaga kebersihan lahan",
    ],
  },
  {
    name: "Virus Kuning / Gemini",
    symptoms: ["G01", "G07", "G08", "G19", "G21"],
    solution: [
      "Kendalikan serangga vektor",
      "Gunakan benih sehat",
      "Sanitasi lahan",
      "Musnahkan tanaman terinfeksi",
    ],
  },
  {
    name: "Layu Bakteri",
    symptoms: ["G05", "G09", "G13", "G22"],
    solution: [
      "Gunakan agens hayati",
      "Semprot bakterisida",
      "Musnahkan tanaman terinfeksi",
      "Rotasi tanaman",
    ],
  },
];

/* =====================
   KOMPONEN
===================== */
export default function DiagnosisPage({
  onNavigateToResult,
}: DiagnosisPageProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const currentQuestion = questions[index];
  const isLast = index === questions.length - 1;

  const answer = (value: boolean) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const finish = () => {
    const diagnosis = diseaseRules
      .map((d) => {
        let score = 0;
        d.symptoms.forEach((code) => {
          const q = symptomMap[code];
          if (answers[q]) score++;
        });
        return { name: d.name, score, solution: d.solution };
      })
      .sort((a, b) => b.score - a.score);

    onNavigateToResult({
      answers,
      diagnosis,
      bestDisease: diagnosis[0]?.score > 0 ? diagnosis[0] : null,
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Pertanyaan {index + 1} / {questions.length}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="bg-white shadow rounded-xl p-6"
        >
          <p className="text-lg font-medium mb-6">{currentQuestion}</p>

          <div className="flex gap-4">
            <button
              onClick={() => answer(true)}
              className="flex-1 py-3 rounded-xl bg-green-600 text-white"
            >
              Ya
            </button>
            <button
              onClick={() => answer(false)}
              className="flex-1 py-3 rounded-xl bg-red-600 text-white"
            >
              Tidak
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button disabled={index === 0} onClick={() => setIndex(index - 1)}>
          <ChevronLeft />
        </button>

        {!isLast ? (
          <button onClick={() => setIndex(index + 1)}>
            <ChevronRight />
          </button>
        ) : (
          <button
            onClick={finish}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Lihat Hasil
          </button>
        )}
      </div>
    </div>
  );
}
