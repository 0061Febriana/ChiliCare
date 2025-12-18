import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import DiagnosisPage from "./components/DiagnosisPage";
import ResultPage from "./components/ResultPage";
import { DiagnosisResults } from "./components/DiagnosisPage";

type Page = "splash" | "diagnosis" | "result";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("splash");
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResults | null>(null);

  const navigateToSplash = () => setCurrentPage("splash");
  const navigateToDiagnosis = () => setCurrentPage("diagnosis");
  const navigateToResult = (results: DiagnosisResults) => {
    setDiagnosisResults(results);
    setCurrentPage("result");
  };

  return (
    <div className="size-full">
      {currentPage === "splash" && <SplashScreen onNavigate={navigateToDiagnosis} />}
      {currentPage === "diagnosis" && <DiagnosisPage onNavigateToResult={navigateToResult} />}
      {currentPage === "result" && diagnosisResults && (
        <ResultPage results={diagnosisResults} onNavigateBack={navigateToDiagnosis} />
      )}
    </div>
  );
}
