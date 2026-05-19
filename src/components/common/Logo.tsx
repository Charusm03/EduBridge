export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g fill="currentColor">
        {/* Top Pillars */}
        <rect x="41" y="10" width="6" height="40" />
        <rect x="53" y="10" width="6" height="40" />
        
        {/* Curves */}
        <path d="M 15 50 C 25 50, 38 35, 44 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        <path d="M 85 50 C 75 50, 62 35, 56 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />

        {/* EDUBRIDGE text */}
        <text x="50" y="66" fontFamily="sans-serif" fontWeight="700" fontSize="12" textAnchor="middle" letterSpacing="1">EDUBRIDGE</text>
        
        {/* Bottom Pillars */}
        <rect x="41" y="75" width="6" height="20" />
        <rect x="53" y="75" width="6" height="20" />

        {/* Subtitle */}
        <text x="50" y="110" fontFamily="sans-serif" fontWeight="400" fontSize="6.5" textAnchor="middle">Learn Smarter, Grow Faster</text>
      </g>
    </svg>
  );
}
