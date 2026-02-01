// Web Audio API Synth to avoid external asset dependencies
// This keeps the app fast and works offline automatically.

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playSound = (type, isEnabled = true) => {
    if (!isEnabled) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
        case 'correct':
            // Pleasant major chord arpeggio (C5 - E5 - G5)
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.linearRampToValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.linearRampToValueAtTime(783.99, now + 0.2); // G5

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

            oscillator.start(now);
            oscillator.stop(now + 0.6);
            break;

        case 'wrong':
            // Dissonant low buzz
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(150, now);
            oscillator.frequency.linearRampToValueAtTime(120, now + 0.3);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

            oscillator.start(now);
            oscillator.stop(now + 0.5);
            break;

        case 'complete':
            // Victory fanfare
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
            oscillator.frequency.setValueAtTime(1046.50, now + 0.4); // C6

            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

            oscillator.start(now);
            oscillator.stop(now + 1.3);
            break;

        case 'flip':
            // Short high click for card flip
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;

        case 'hover':
            // Very subtle blip
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, now);

            gainNode.gain.setValueAtTime(0.02, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;

        default:
            break;
    }
};
