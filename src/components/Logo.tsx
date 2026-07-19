/**
 * Beeldmerk: twee handen die de stang opvangen (de spotter), met de halter
 * ertussen. Puur SVG, schaalt mee en volgt currentColor voor de stang.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Spotter"
      focusable="false"
    >
      <rect width="32" height="32" rx="9" fill="var(--color-primary-500)" />
      <g
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      >
        {/* de stang */}
        <path d="M8 16h16" />
        {/* de handen eronder */}
        <path d="M10.5 21.5V16" />
        <path d="M21.5 21.5V16" />
        {/* de schijven */}
        <path d="M8 12.5v7" />
        <path d="M24 12.5v7" />
      </g>
    </svg>
  );
}
