/**
 * Audio Manager - Handles all sound effects
 */

class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    this.sounds = new Map();
    this.audioContext = null;
  }

  /**
   * Initialize audio context (required for mobile)
   */
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume audio context on user interaction
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Play a simple beep/tone
   */
  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * Play click sound
   */
  playClick() {
    this.playTone(800, 0.1, 'sine');
  }

  /**
   * Play correct answer sound (happy chime)
   */
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'sine'), i * 100);
    });
  }

  /**
   * Play wrong answer sound (gentle boop)
   */
  playWrong() {
    this.playTone(200, 0.3, 'triangle');
  }

  /**
   * Play pickup sound
   */
  playPickup() {
    this.playTone(600, 0.08, 'sine');
  }

  /**
   * Play drop sound
   */
  playDrop() {
    this.playTone(400, 0.1, 'triangle');
  }

  /**
   * Play celebration fanfare
   */
  playCelebration() {
    if (!this.enabled) return;
    this.init();
    
    const melody = [
      { freq: 523, time: 0 },     // C5
      { freq: 659, time: 0.15 },  // E5
      { freq: 784, time: 0.3 },   // G5
      { freq: 1047, time: 0.45 }, // C6
      { freq: 784, time: 0.6 },   // G5
      { freq: 1047, time: 0.75 }, // C6
    ];
    
    melody.forEach(note => {
      setTimeout(() => this.playTone(note.freq, 0.2, 'sine'), note.time * 1000);
    });
  }

  /**
   * Toggle sound on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled);
    return this.enabled;
  }

  /**
   * Check if sound is enabled
   */
  isEnabled() {
    return this.enabled;
  }
}

// Global audio manager instance
const audioManager = new AudioManager();
