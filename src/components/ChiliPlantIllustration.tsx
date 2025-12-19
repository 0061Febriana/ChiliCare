export default function ChiliPlantIllustration() {
  return (
    <svg
      width="200"
      height="240"
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soil */}
      <ellipse cx="100" cy="220" rx="80" ry="20" fill="#8B6F47" />

      {/* Stem */}
      <path
        d="M100 220 Q95 180, 100 140 Q105 100, 100 60"
        stroke="#5C8D4B"
        strokeWidth="6"
        fill="none"
      />

      {/* Leaves - left side */}
      <ellipse
        cx="70"
        cy="160"
        rx="25"
        ry="35"
        fill="#5C8D4B"
        transform="rotate(-30 70 160)"
      />
      <ellipse
        cx="60"
        cy="120"
        rx="28"
        ry="38"
        fill="#5C8D4B"
        transform="rotate(-35 60 120)"
      />
      <ellipse
        cx="65"
        cy="80"
        rx="24"
        ry="32"
        fill="#A7DCA0"
        transform="rotate(-25 65 80)"
      />

      {/* Leaves - right side */}
      <ellipse
        cx="130"
        cy="160"
        rx="25"
        ry="35"
        fill="#5C8D4B"
        transform="rotate(30 130 160)"
      />
      <ellipse
        cx="140"
        cy="120"
        rx="28"
        ry="38"
        fill="#5C8D4B"
        transform="rotate(35 140 120)"
      />
      <ellipse
        cx="135"
        cy="80"
        rx="24"
        ry="32"
        fill="#A7DCA0"
        transform="rotate(25 135 80)"
      />

      {/* Chili peppers - red */}
      <ellipse
        cx="90"
        cy="90"
        rx="8"
        ry="20"
        fill="#DC2626"
        transform="rotate(-15 90 90)"
      />
      <ellipse
        cx="110"
        cy="95"
        rx="8"
        ry="22"
        fill="#DC2626"
        transform="rotate(20 110 95)"
      />
      <ellipse
        cx="100"
        cy="75"
        rx="7"
        ry="18"
        fill="#EF4444"
        transform="rotate(5 100 75)"
      />

      {/* Top leaves */}
      <ellipse
        cx="95"
        cy="50"
        rx="20"
        ry="25"
        fill="#A7DCA0"
        transform="rotate(-20 95 50)"
      />
      <ellipse
        cx="105"
        cy="45"
        rx="22"
        ry="28"
        fill="#A7DCA0"
        transform="rotate(15 105 45)"
      />
    </svg>
  );
}
