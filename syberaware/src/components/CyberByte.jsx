// ============================================================
//  <CyberByte/> — Refined Cyber-Pet Mascot
//  Cute retro robot companion with glowing CRT visor, expressive
//  digital eyes (normal, happy, thinking, alert), blinking antenna,
//  cyber ear-pods, and blush pixels.
// ============================================================
import React from 'react';

export default function CyberByte({
  size = 56,
  className = '',
  animated = true,
  mood = 'normal', // 'normal' | 'happy' | 'thinking' | 'alert'
}) {
  return (
    <div
      className={`mascot ${animated ? 'animated' : ''} mood-${mood} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Cyber-Byte mascot (${mood})`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <defs>
          {/* Subtle CRT Screen Glow */}
          <linearGradient id="cb-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0f2d" />
            <stop offset="100%" stopColor="#05081b" />
          </linearGradient>

          {/* Cyan Frame Gradient */}
          <linearGradient id="cb-frame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0096c7" />
          </linearGradient>

          {/* Antenna Beacon Glow */}
          <radialGradient id="cb-beacon" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff85c0" />
            <stop offset="60%" stopColor="#ff4f9a" />
            <stop offset="100%" stopColor="#b30059" />
          </radialGradient>
        </defs>

        {/* --- Antenna --- */}
        {/* Pulse wave ring when animated */}
        <circle
          cx="32"
          cy="7"
          r="6.5"
          fill="none"
          stroke="#ff4f9a"
          strokeWidth="1.2"
          opacity="0.5"
          className="antenna-wave"
        />
        {/* Antenna Stem */}
        <rect x="30.5" y="10" width="3" height="7" rx="1.5" fill="#00e5ff" />
        {/* Antenna Beacon Tip */}
        <circle cx="32" cy="7" r="4.5" fill="url(#cb-beacon)" className="antenna-bulb" />
        <circle cx="30.5" cy="5.5" r="1.4" fill="#ffffff" opacity="0.8" />

        {/* --- Cyber Ear Pods / Headset Bolts --- */}
        <rect x="2" y="27" width="5" height="14" rx="2.5" fill="#ff4f9a" />
        <rect x="3.5" y="30" width="2" height="8" rx="1" fill="#fff" opacity="0.6" />

        <rect x="57" y="27" width="5" height="14" rx="2.5" fill="#ff4f9a" />
        <rect x="58.5" y="30" width="2" height="8" rx="1" fill="#fff" opacity="0.6" />

        {/* --- Main Robot Chassis / Head --- */}
        <rect
          x="6"
          y="16"
          width="52"
          height="38"
          rx="12"
          fill="url(#cb-frame)"
          stroke="#003554"
          strokeWidth="1.5"
        />

        {/* Corner chassis highlights */}
        <rect x="10" y="18" width="8" height="2" rx="1" fill="#ffffff" opacity="0.45" />

        {/* --- Visor Screen Frame & CRT Bevel --- */}
        <rect x="10" y="20" width="44" height="29" rx="8" fill="#020412" />
        <rect x="11" y="21" width="42" height="27" rx="7" fill="url(#cb-screen)" />

        {/* Screen glass reflection highlight */}
        <path
          d="M13 23 L32 23 Q18 29 14 36 Z"
          fill="#00ffff"
          opacity="0.12"
        />

        {/* --- Expressive Eyes by Mood --- */}
        {mood === 'happy' && (
          <g className="cb-eyes happy">
            {/* Left Happy Arch: ^ */}
            <path
              d="M19 33 Q23 27 27 33"
              stroke="#00ffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Happy Arch: ^ */}
            <path
              d="M37 33 Q41 27 45 33"
              stroke="#00ffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Joyful blush */}
            <rect x="16" y="37" width="5" height="2" rx="1" fill="#ff4f9a" opacity="0.85" />
            <rect x="43" y="37" width="5" height="2" rx="1" fill="#ff4f9a" opacity="0.85" />
          </g>
        )}

        {mood === 'alert' && (
          <g className="cb-eyes alert">
            {/* Left Alert Eye: Wide O */}
            <rect x="19" y="27" width="8" height="10" rx="3" fill="#fff200" />
            <rect x="21" y="29" width="4" height="6" rx="1.5" fill="#0a0a2a" />
            {/* Right Alert Eye: Wide O */}
            <rect x="37" y="27" width="8" height="10" rx="3" fill="#fff200" />
            <rect x="39" y="29" width="4" height="6" rx="1.5" fill="#0a0a2a" />
            {/* Warning Sweat Pixel */}
            <rect x="49" y="23" width="3" height="4" rx="1" fill="#00e5ff" opacity="0.8" />
          </g>
        )}

        {mood === 'thinking' && (
          <g className="cb-eyes thinking">
            {/* Left Eye looking up-right */}
            <rect x="20" y="29" width="7" height="7" rx="2" fill="#00ffff" />
            <rect x="23" y="29" width="3" height="3" fill="#ffffff" />
            {/* Right Eye looking up-right */}
            <rect x="38" y="29" width="7" height="7" rx="2" fill="#00ffff" />
            <rect x="41" y="29" width="3" height="3" fill="#ffffff" />
            {/* Curious Brow Pixels */}
            <rect x="19" y="26" width="8" height="2" rx="1" fill="#fff200" />
            <rect x="37" y="24" width="8" height="2" rx="1" fill="#fff200" transform="rotate(-6 41 25)" />
          </g>
        )}

        {mood === 'normal' && (
          <g className="cb-eyes normal">
            {/* Left Digital Eye */}
            <rect x="20" y="29" width="7" height="7" rx="2" fill="#00ffff" className="cb-eye-left" />
            <rect x="21" y="30" width="3" height="3" fill="#ffffff" />
            {/* Right Digital Eye */}
            <rect x="37" y="29" width="7" height="7" rx="2" fill="#00ffff" className="cb-eye-right" />
            <rect x="38" y="30" width="3" height="3" fill="#ffffff" />
            {/* Cute Pixel Blush */}
            <rect x="16" y="38" width="4" height="2" rx="1" fill="#ff4f9a" opacity="0.6" />
            <rect x="44" y="38" width="4" height="2" rx="1" fill="#ff4f9a" opacity="0.6" />
          </g>
        )}

        {/* --- Cyber Visor Micro Mouth / Status LEDs --- */}
        <g className="cb-leds">
          <circle cx="27" cy="42" r="1.2" fill="#00e5ff" opacity="0.75" />
          <circle cx="32" cy="42" r="1.2" fill="#fff200" opacity="0.85" />
          <circle cx="37" cy="42" r="1.2" fill="#ff4f9a" opacity="0.75" />
        </g>

        {/* --- Magnetic Hover Feet --- */}
        <g className="cb-feet">
          <rect x="15" y="55" width="12" height="5" rx="2.5" fill="#00b4d8" />
          <rect x="17" y="58" width="8" height="2" rx="1" fill="#00ffff" opacity="0.8" />

          <rect x="37" y="55" width="12" height="5" rx="2.5" fill="#00b4d8" />
          <rect x="39" y="58" width="8" height="2" rx="1" fill="#00ffff" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
