// ===================================================
// Techno4 Framework 2 - Rust Web Audio API Subsystem (ESM)
// ===================================================

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Techno4Audio = require('./audio.js');

export const AudioContext = Techno4Audio.AudioContext;
export const OfflineAudioContext = Techno4Audio.OfflineAudioContext;
export const AudioBuffer = Techno4Audio.AudioBuffer;
export const OscillatorNode = Techno4Audio.OscillatorNode;
export const GainNode = Techno4Audio.GainNode;
export const BiquadFilterNode = Techno4Audio.BiquadFilterNode;
export const AnalyserNode = Techno4Audio.AnalyserNode;
export const StereoPannerNode = Techno4Audio.StereoPannerNode;
export const DelayNode = Techno4Audio.DelayNode;
export const PeriodicWave = Techno4Audio.PeriodicWave;

export default Techno4Audio;
