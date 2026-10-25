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

// Create + unlock the audio engine on the very first tap/click anywhere, so the
// first real sound isn't clipped while the browser is still "waking up" the audio.
if (typeof window !== 'undefined') {
  const unlock = () => {
    getAudioContext();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

/**
 * Plays a short chip-tune phrase.
 * - `step`  : seconds between note starts
 * - `hold`  : how long every note rings before decaying
 * - `tail`  : extra ring-out added to the LAST note so the melody finishes cleanly
 */
function playPhrase({ notes, type, step, hold, tail = 0, volume }) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Small lead-in so the first note is never clipped while the context spins up
  const startTime = ctx.currentTime + 0.04;

  notes.forEach((freq, idx) => {
    const t0 = startTime + idx * step;
    const isLastNote = idx === notes.length - 1;
    const ring = hold + (isLastNote ? tail : 0);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ring);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + ring + 0.05);
  });
}

/**
 * 8-Bit Correct Answer / Level Up:
 * Bright, joyful ascending 4-note square-wave arpeggio (C5 -> E5 -> G5 -> C6)
 * with a held final note so it doesn't get cut off.
 */
export function playCorrectSound() {
  if (!soundEnabled) return;
  playPhrase({
    notes: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6
    type: 'square',
    step: 0.09,
    hold: 0.2,
    tail: 0.45,
    volume: 0.18,
  });
}

/**
 * 8-Bit Partial Answer (1 point / Sub-optimal):
 * Gentle 2-note triangle wave blip (G4 -> A4)
 */
export function playPartialSound() {
  if (!soundEnabled) return;
  playPhrase({
    notes: [392.0, 440.0], // G4, A4
    type: 'triangle',
    step: 0.12,
    hold: 0.22,
    tail: 0.2,
    volume: 0.22,
  });
}

/**
 * 8-Bit Wrong Answer / Trap Hit:
 * Low retro buzz descending tone (Eb3 -> G2) with sawtooth crunch
 */
export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + 0.04;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(155.56, startTime); // Eb3
  osc.frequency.exponentialRampToValueAtTime(98.0, startTime + 0.38); // G2

  gain.gain.setValueAtTime(0.2, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.42);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.46);
}

/**
 * 8-Bit Combo / Streak Fanfare:
 * Triumphant fanfare when hitting a 2+ streak
 */
export function playStreakSound() {
  if (!soundEnabled) return;
  playPhrase({
    notes: [587.33, 739.99, 880.0, 1174.66], // D5, F#5, A5, D6
    type: 'square',
    step: 0.08,
    hold: 0.22,
    tail: 0.5,
    volume: 0.22,
  });
}
