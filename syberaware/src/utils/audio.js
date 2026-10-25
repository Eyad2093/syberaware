// ============================================================
//  8-Bit Retro Sound Synthesizer (Web Audio API)
//  Synthesizes pure chip-tune sounds with zero external files.
// ============================================================

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

/**
 * 8-Bit Correct Answer / Level Up:
 * Bright, joyful ascending 4-note square-wave arpeggio (C5 -> E5 -> G5 -> C6)
 */
export function playCorrectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const startTime = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime + idx * 0.07);

    // 8-bit punchy envelope
    gain.gain.setValueAtTime(0, startTime + idx * 0.07);
    gain.gain.linearRampToValueAtTime(0.18, startTime + idx * 0.07 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.07 + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime + idx * 0.07);
    osc.stop(startTime + idx * 0.07 + 0.18);
  });
}

/**
 * 8-Bit Partial Answer (1 point / Sub-optimal):
 * Gentle 2-note triangle wave blip (G4 -> A4)
 */
export function playPartialSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [392.0, 440.0]; // G4, A4
  const startTime = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime + idx * 0.1);

    gain.gain.setValueAtTime(0, startTime + idx * 0.1);
    gain.gain.linearRampToValueAtTime(0.2, startTime + idx * 0.1 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.1 + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime + idx * 0.1);
    osc.stop(startTime + idx * 0.1 + 0.2);
  });
}

/**
 * 8-Bit Wrong Answer / Trap Hit:
 * Low retro buzz descending tone (D#3 -> C3) with sawtooth crunch
 */
export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(155.56, startTime); // Eb3
  osc.frequency.exponentialRampToValueAtTime(98.0, startTime + 0.28); // G2

  gain.gain.setValueAtTime(0.2, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.32);
}

/**
 * 8-Bit Combo / Streak Fanfare:
 * Triumphant fanfare when hitting a 2+ streak
 */
export function playStreakSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
  const startTime = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime + idx * 0.06);

    gain.gain.setValueAtTime(0, startTime + idx * 0.06);
    gain.gain.linearRampToValueAtTime(0.22, startTime + idx * 0.06 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.06 + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime + idx * 0.06);
    osc.stop(startTime + idx * 0.06 + 0.24);
  });
}
