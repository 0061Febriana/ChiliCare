export default function ChiliCareLogo() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gambar PNG di belakang (opsional) */}
      <image
        href="https://tse2.mm.bing.net/th/id/OIP.q-LV4pc3QA1-yJ2CPo9SlwHaI5?pid=Api&P=0&h=220"
        x="0"
        y="0"
        width="120"
        height="120"
      />

      {/* Gradient definitions */}
      <defs>
        {/* Bright highlight gradient for shiny effect */}
        <linearGradient
          id="highlightGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Fresh green gradient for stem */}
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9ACD32" />
          <stop offset="50%" stopColor="#7CB342" />
          <stop offset="100%" stopColor="#558B2F" />
        </linearGradient>
      </defs>

      {/* Shadow/Base */}
      <ellipse cx="60" cy="120" rx="30" ry="8" fill="#000000" opacity="0.15" />

      {/* Main curved chili body */}
      <path
        d="M45 25 Q40 30, 38 40 Q36 55, 38 70 Q40 85, 45 95 Q48 100, 52 102 Q56 103, 60 101 Q63 99, 65 95 Q68 88, 70 75 Q71 60, 68 45 Q65 32, 60 26 Q55 22, 50 23 Q47 23.5, 45 25Z"
        fill="url(#chiliRedGradient)"
        opacity="0.98"
      />
      {/* Shadow side */}
      <path
        d="M60 26 Q63 30, 65 40 Q67 55, 66 70 Q65 85, 62 95"
        fill="url(#shadowGradient)"
      />
    </svg>
  );
}
