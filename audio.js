// ===================================================
// Techno4 Framework 2 - Rust Web Audio API Subsystem
// ===================================================

let webAudio = null;
let isLoaded = false;
let loadError = null;

try {
  webAudio = require('node-web-audio-api');
  isLoaded = true;
} catch (err) {
  loadError = err;
}

/**
 * Helper to encode raw PCM Float32 audio channels into a standard WAV Buffer.
 */
function encodeWav(channels, sampleRate) {
  const numChannels = channels.length;
  const numSamples = channels[0].length;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataLength = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataLength);

  // RIFF Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);

  // Sub-chunk 1 (fmt )
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample

  // Sub-chunk 2 (data)
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      buffer.writeInt16LE(Math.floor(intSample), offset);
      offset += 2;
    }
  }

  return buffer;
}

const Techno4Audio = {
  isSupported: isLoaded,
  loadError,

  // Direct Node / Class references
  AudioContext: webAudio ? webAudio.AudioContext : null,
  OfflineAudioContext: webAudio ? webAudio.OfflineAudioContext : null,
  AudioBuffer: webAudio ? webAudio.AudioBuffer : null,
  OscillatorNode: webAudio ? webAudio.OscillatorNode : null,
  GainNode: webAudio ? webAudio.GainNode : null,
  BiquadFilterNode: webAudio ? webAudio.BiquadFilterNode : null,
  AnalyserNode: webAudio ? webAudio.AnalyserNode : null,
  StereoPannerNode: webAudio ? webAudio.StereoPannerNode : null,
  DelayNode: webAudio ? webAudio.DelayNode : null,
  PeriodicWave: webAudio ? webAudio.PeriodicWave : null,

  /**
   * Create a live real-time AudioContext.
   */
  createContext(options = {}) {
    if (!isLoaded || !webAudio) {
      throw new Error('Web Audio API is not available: ' + (loadError ? loadError.message : 'Not loaded'));
    }
    return new webAudio.AudioContext(options);
  },

  /**
   * Create an OfflineAudioContext for non-realtime fast sound rendering.
   */
  createOfflineContext(numberOfChannels = 2, length = 44100, sampleRate = 44100) {
    if (!isLoaded || !webAudio) {
      throw new Error('Web Audio API is not available: ' + (loadError ? loadError.message : 'Not loaded'));
    }
    return new webAudio.OfflineAudioContext(numberOfChannels, length, sampleRate);
  },

  /**
   * Synthesize a tone and return the rendered audio buffer + WAV encoder.
   * @param {Object} options - { frequency, type, duration, sampleRate, gain }
   * @returns {Promise<Object>}
   */
  async synthTone(options = {}) {
    const frequency = options.frequency || 440;
    const type = options.type || 'sine';
    const duration = options.duration || 0.5;
    const sampleRate = options.sampleRate || 44100;
    const peakGain = options.gain || 0.5;
    const numSamples = Math.floor(sampleRate * duration);

    const offlineCtx = this.createOfflineContext(1, numSamples, sampleRate);

    const osc = new webAudio.OscillatorNode(offlineCtx, { type, frequency });
    const gain = new webAudio.GainNode(offlineCtx, { gain: peakGain });

    // Smooth envelope: attack 10ms, decay to 0
    gain.gain.setValueAtTime(0.001, 0);
    gain.gain.exponentialRampToValueAtTime(peakGain, 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, duration);

    osc.connect(gain);
    gain.connect(offlineCtx.destination);

    osc.start(0);
    osc.stop(duration);

    const audioBuffer = await offlineCtx.startRendering();
    const channelData = audioBuffer.getChannelData(0);

    return {
      sampleRate,
      duration,
      length: numSamples,
      audioBuffer,
      channelData,
      toWavBuffer() {
        return encodeWav([channelData], sampleRate);
      },
    };
  },
};

module.exports = Techno4Audio;
