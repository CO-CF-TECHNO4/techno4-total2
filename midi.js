// ===================================================
// Techno4 Framework 2 - Hardware MIDI Subsystem
// ===================================================

const { EventEmitter } = require('node:events');

let easymidi = null;
let isLoaded = false;
let loadError = null;

try {
  easymidi = require('easymidi');
  isLoaded = true;
} catch (err) {
  loadError = err;
}

/**
 * Virtual MIDI Port Pair for headless environments, testing, or mock routing.
 */
class VirtualMidiBus extends EventEmitter {
  constructor(name = 'Techno4VirtualBus') {
    super();
    this.name = name;
  }

  send(type, msg = {}) {
    this.emit('midi', type, msg);
  }

  close() {
    this.removeAllListeners();
  }
}

class VirtualMidiInput extends EventEmitter {
  constructor(bus) {
    super();
    this.bus = bus;
    this.name = bus.name;
    this._handler = (type, msg) => {
      this.emit(type, msg);
      this.emit('message', { type, ...msg });
    };
    this.bus.on('midi', this._handler);
  }

  close() {
    if (this.bus) {
      this.bus.off('midi', this._handler);
      this.removeAllListeners();
    }
  }
}

class VirtualMidiOutput {
  constructor(bus) {
    this.bus = bus;
    this.name = bus.name;
  }

  send(type, msg = {}) {
    if (this.bus) {
      this.bus.send(type, msg);
    }
  }

  close() {
    this.bus = null;
  }
}

const Techno4MIDI = {
  isSupported: isLoaded,
  loadError,

  /**
   * Get available physical and system MIDI input device names.
   * @returns {string[]}
   */
  getInputs() {
    if (!isLoaded || !easymidi) return [];
    try {
      return easymidi.getInputs();
    } catch {
      return [];
    }
  },

  /**
   * Get available physical and system MIDI output device names.
   * @returns {string[]}
   */
  getOutputs() {
    if (!isLoaded || !easymidi) return [];
    try {
      return easymidi.getOutputs();
    } catch {
      return [];
    }
  },

  /**
   * Open a MIDI input port.
   * @param {string} portName
   * @param {boolean} [virtual=false]
   * @returns {easymidi.Input}
   */
  createInput(portName, virtual = false) {
    if (!isLoaded || !easymidi) {
      throw new Error('MIDI is not supported in current environment: ' + (loadError ? loadError.message : 'Not loaded'));
    }
    return new easymidi.Input(portName, virtual);
  },

  /**
   * Open a MIDI output port.
   * @param {string} portName
   * @param {boolean} [virtual=false]
   * @returns {easymidi.Output}
   */
  createOutput(portName, virtual = false) {
    if (!isLoaded || !easymidi) {
      throw new Error('MIDI is not supported in current environment: ' + (loadError ? loadError.message : 'Not loaded'));
    }
    return new easymidi.Output(portName, virtual);
  },

  /**
   * Create an in-memory virtual MIDI loopback pair (ideal for testing or internal routing).
   * @param {string} name
   * @returns {{ input: VirtualMidiInput, output: VirtualMidiOutput, bus: VirtualMidiBus }}
   */
  createVirtualPair(name = 'Techno4Loopback') {
    const bus = new VirtualMidiBus(name);
    const input = new VirtualMidiInput(bus);
    const output = new VirtualMidiOutput(bus);
    return { bus, input, output };
  },

  // Raw class references
  Input: easymidi ? easymidi.Input : VirtualMidiInput,
  Output: easymidi ? easymidi.Output : VirtualMidiOutput,
  VirtualBus: VirtualMidiBus,
};

module.exports = Techno4MIDI;
