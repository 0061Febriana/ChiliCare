import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface DiagnosisPageProps {
  onNavigateToResult: (results: DiagnosisResults) => void;
}

export interface DiagnosisResults {
  answers: Record<string, boolean>;
}

// All symptoms combined into one array for forward chaining
const allSymptoms = [
  "Apakah daun menguning?",
  "Apakah daun keriting?",
  "Apakah daun bercak coklat?",
  "Apakah daun layu walau tanah basah?",
  "Apakah daun layu pada tanaman muda?",
  "Apakah daun rontok?",
  "Apakah daun kecil dan menggulung ke atas?",
  "Apakah tulang daun menebal dan berwarna kuning?",
  "Apakah batang busuk?",
  "Apakah batang mengering di bagian bawah?",
  "Apakah batang terdapat garis hitam atau coklat?",
  "Apakah batang layu mendadak?",
  "Apakah terdapat lendir putih susu pada batang dan akar?",
  "Apakah buah gugur sebelum matang?",
  "Apakah buah keriput atau kerdil?",
  "Apakah buah bercak coklat kehitaman?",
  "Apakah buah mengkerut dan mengering?",
  "Apakah buah terlihat layu ?",
  "Apakah bunga dan buah rontok?",
  "Apakah pertumbuhan terhambat?",
  "Apakah tanaman kerdil?",
  "Apakah akar membusuk?",
  "Apakah akar berwarna coklat kehitaman?",
  "Apakah akar tidak berkembang normal?",
  "Apakah tanah terlalu lembab?",
  "Apakah drainase buruk?",
  "Apakah tanah terlalu becek?",
  "Apakah tanah gembur tapi banyak kutu kebul?",
  "Apakah banyak sisa buah busuk di tanah?",
  "Apakah jarak tanam terlalu rapat?",
  "Apakah intensitas hujan tinggi?",
  "Apakah kurang sinar matahari?",
  "Apakah tidak ada pengendalian hama?",
  "Apakah tidak dilakukan penggemburan?",
  "Apakah kebersihan lahan kurang?",
  "Apakah jarang disemprot insektisida nabati?",
  "Apakah tanaman kekurangan kalsium",
  "Apakah kualitas bibit rendah?",
];

export default function DiagnosisPage({ onNavigateToResult }: DiagnosisPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const currentQuestion = allSymptoms[currentQuestionIndex];
  const totalQuestions = allSymptoms.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswer = (answer: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));

    // Auto-advance after answering (optional, can be removed if you want manual navigation)
    setTimeout(() => {
      if (!isLastQuestion) {
        handleNext();
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    onNavigateToResult({ answers });
  };

  const currentAnswer = answers[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)" }}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 text-center shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
        <h1
          className="mb-2"
          style={{
            fontFamily: "Georgia, serif",
            color: "#2C3E50",
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            fontWeight: "bold",
          }}
        >
          Pertanyaan Gejala
        </h1>
        <p style={{ color: "#7F8C8D", fontSize: "0.875rem" }}>
          Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full"
          style={{ background: "linear-gradient(90deg, #27AE60 0%, #229954 100%)" }}
        />
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestionIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
            >
              {/* Question Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)",
                  }}
                >
                  <span className="text-3xl sm:text-4xl">🌶️</span>
                </div>
              </div>

              {/* Question Text */}
              <h2
                className="text-center mb-8"
                style={{
                  color: "#2C3E50",
                  fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                  fontWeight: "600",
                  lineHeight: "1.4",
                }}
              >
                {currentQuestion}
              </h2>

              {/* Answer Buttons */}
              <div className="flex gap-4 justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                  className="flex-1 max-w-xs py-4 px-6 rounded-xl transition-all shadow-md"
                  style={{
                    background:
                      currentAnswer === true
                        ? "linear-gradient(135deg, #27AE60 0%, #229954 100%)"
                        : "#FFFFFF",
                    color: currentAnswer === true ? "#FFFFFF" : "#27AE60",
                    border: `2px solid ${currentAnswer === true ? "#27AE60" : "#27AE60"}`,
                    fontWeight: "600",
                    fontSize: "1.125rem",
                  }}
                >
                  {currentAnswer === true && <CheckCircle className="inline mr-2" size={20} />}
                  Ya
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                  className="flex-1 max-w-xs py-4 px-6 rounded-xl transition-all shadow-md"
                  style={{
                    background:
                      currentAnswer === false
                        ? "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
                        : "#FFFFFF",
                    color: currentAnswer === false ? "#FFFFFF" : "#E74C3C",
                    border: `2px solid ${currentAnswer === false ? "#E74C3C" : "#E74C3C"}`,
                    fontWeight: "600",
                    fontSize: "1.125rem",
                  }}
                >
                  {currentAnswer === false && <CheckCircle className="inline mr-2" size={20} />}
                  Tidak
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 sm:p-6 bg-white shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all"
            style={{
              backgroundColor: isFirstQuestion ? "#BDC3C7" : "#ECF0F1",
              color: isFirstQuestion ? "#95A5A6" : "#2C3E50",
              fontWeight: "600",
              border: "none",
              cursor: isFirstQuestion ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all"
              style={{
                background:
                  currentAnswer !== undefined
                    ? "linear-gradient(135deg, #27AE60 0%, #229954 100%)"
                    : "#BDC3C7",
                color: "#FFFFFF",
                fontWeight: "600",
                border: "none",
                cursor: currentAnswer !== undefined ? "pointer" : "not-allowed",
              }}
            >
              <span className="hidden sm:inline">Lanjut</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={currentAnswer === undefined}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all"
              style={{
                background:
                  currentAnswer !== undefined
                    ? "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
                    : "#BDC3C7",
                color: "#FFFFFF",
                fontWeight: "600",
                border: "none",
                cursor: currentAnswer !== undefined ? "pointer" : "not-allowed",
              }}
            >
              <CheckCircle size={20} />
              <span>Simpan & Selesai</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}