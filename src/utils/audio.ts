/**
 * Synthesized Web Audio sound effects for the kawaii birthday site.
 * Pure Web Audio API: 100% reliable, zero external MP3 dependencies.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  private musicPlaying: boolean = false;
  private musicTimer: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playSparkle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + idx * 0.05 + 0.35);
    });
  }

  playGrandReveal() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 783.99, d: 0.1 },
      { f: 880.00, d: 0.12 },
      { f: 1046.50, d: 0.4 },
    ];

    let t = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.85;
    });

    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 1.2);
    });
  }

  playTick() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700 + Math.random() * 80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }

  playWin() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [659.25, 659.25, 659.25, 523.25, 659.25, 783.99];
    const times = [0, 0.12, 0.24, 0.38, 0.50, 0.65];
    const lens = [0.1, 0.1, 0.1, 0.1, 0.12, 0.45];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i]);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + times[i]);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + lens[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + times[i]);
      osc.stop(ctx.currentTime + times[i] + lens[i]);
    });
  }

  playSecretChime() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.9);
    });
  }

  toggleMusicBox(onStateChange?: (playing: boolean) => void) {
    if (this.musicPlaying) {
      this.stopMusicBox();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusicBox();
      onStateChange?.(true);
      return true;
    }
  }

  isMusicPlaying() {
    return this.musicPlaying;
  }

  startMusicBox() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.musicPlaying = true;

    const melody: [number, number][] = [
      [261.63, 0.3], [261.63, 0.2], [293.66, 0.5], [261.63, 0.5], [349.23, 0.5], [329.63, 0.9],
      [261.63, 0.3], [261.63, 0.2], [293.66, 0.5], [261.63, 0.5], [392.00, 0.5], [349.23, 0.9],
      [261.63, 0.3], [261.63, 0.2], [523.25, 0.5], [440.00, 0.5], [349.23, 0.5], [329.63, 0.5], [293.66, 0.7],
      [466.16, 0.3], [466.16, 0.2], [440.00, 0.5], [349.23, 0.5], [392.00, 0.5], [349.23, 1.1]
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.musicPlaying) return;
      const [freq, dur] = melody[noteIdx];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 2, now);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 6, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur * 1.5);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + dur * 1.5);
      oscHarmonic.stop(now + dur * 1.5);

      noteIdx = (noteIdx + 1) % melody.length;
      const delay = (dur + 0.12) * 1000;
      this.musicTimer = window.setTimeout(playNext, delay);
    };

    playNext();
  }

  stopMusicBox() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sounds = new SoundEffects();
