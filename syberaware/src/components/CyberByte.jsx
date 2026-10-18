// ============================================================
//  <CyberByte/> — Robot mascot matching the design:
//  cyan-framed screen, white square eyes, pink antenna, cyan feet
// ============================================================
import React from 'react';

export default function CyberByte({ size = 56, className = '', animated = true }) {
  return (
    <div
      className={`mascot ${animated ? 'animated' : ''} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Cyber-Byte mascot"
    >
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Antenna */}
        <circle cx="24" cy="7" r="4.5" fill="#ff4f9a" />
        <rect x="22.5" y="10" width="3" height="6" fill="#00dcff" />

        {/* Head */}
        <rect x="4" y="15" width="56" height="38" rx="11" fill="#00dcff" />
        <rect x="9" y="20" width="46" height="28" rx="8" fill="#0a0a2a" />

        {/* Eyes */}
        <rect x="21" y="31" width="5" height="5" fill="#fff" />
        <rect x="38" y="31" width="5" height="5" fill="#fff" />

        {/* Feet */}
        <rect x="14" y="53" width="13" height="7" rx="2" fill="#00dcff" />
        <rect x="37" y="53" width="13" height="7" rx="2" fill="#00dcff" />
      </svg>
    </div>
  );
}
