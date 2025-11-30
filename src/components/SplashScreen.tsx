import { motion } from "motion/react";
import ChiliCareLogo from "./ChiliCareLogo";
import { Leaf, Heart } from "lucide-react";

interface SplashScreenProps {
  onNavigate: () => void;
}

export default function SplashScreen({ onNavigate }: SplashScreenProps) {
  return (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="min-h-screen flex flex-col items-center justify-center px-6 py-10 gap-8 relative"
  style={{
    background: "linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)",
  }}
>
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Leaf size={40} color="#27AE60" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Heart size={40} color="#E74C3C" />
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <Leaf size={30} color="#27AE60" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="mb-6"
      >
        <ChiliCareLogo />
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mb-3"
        style={{
          fontFamily: "Georgia, serif",
          color: "#2C3E50",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: "bold",
          letterSpacing: "-0.02em",
        }}
      >
        Chili Care
      </motion.h1>

      {/* Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mb-8 px-4"
        style={{
          color: "#7F8C8D",
          fontSize: "clamp(1rem, 3vw, 1.25rem)",
          fontStyle: "italic",
        }}
      >
        Diagnosa Akurat, Cabai Lebih Sehat
      </motion.p>

      {/* Main CTA Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNavigate}
        className="px-8 py-4 rounded-full shadow-lg transition-all"
        style={{
          background: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)",
          color: "#FFFFFF",
          fontSize: "1.125rem",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
        }}
      >
        Mulai Diagnosa
      </motion.button>

      {/* Chili illustration hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center"
        style={{ color: "#95A5A6", fontSize: "0.875rem" }}
      >
        🌶️ Untuk tanaman cabai yang lebih sehat
      </motion.div>
    </motion.div>
  );
}
