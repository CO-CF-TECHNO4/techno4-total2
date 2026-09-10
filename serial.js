// ===================================================
// Techno4 Framework 2 - Serial Port Subsystem
// ===================================================

let SerialPort = null;
let ReadlineParser = null;
let ByteLengthParser = null;
let DelimiterParser = null;
let MockBinding = null;
let isLoaded = false;
let loadError = null;

try {
  const spModule = require('serialport');
  SerialPort = spModule.SerialPort;
  ReadlineParser = spModule.ReadlineParser;
  ByteLengthParser = spModule.ByteLengthParser;
  DelimiterParser = spModule.DelimiterParser;
  try {
    MockBinding = require('@serialport/binding-mock').MockBinding;
  } catch {
    MockBinding = spModule.MockBinding || null;
  }
  isLoaded = true;
} catch (err) {
  loadError = err;
}

const Techno4Serial = {
  isSupported: isLoaded,
  loadError,
  SerialPort,
  ReadlineParser,
  ByteLengthParser,
  DelimiterParser,
  MockBinding,

  /**
   * List available physical and virtual serial ports.
   * @returns {Promise<Array>} List of ports
   */
  async list() {
    if (!isLoaded || !SerialPort) {
      return [];
    }
    return SerialPort.list();
  },

  /**
   * Create and open a serial port connection.
   * @param {Object} options - { path, baudRate, parser, ... }
   * @returns {SerialPort}
   */
  create(options = {}) {
    if (!isLoaded || !SerialPort) {
      throw new Error('SerialPort is not available in current environment: ' + (loadError ? loadError.message : 'Module not loaded'));
    }

    const {
      path,
      baudRate = 9600,
      parser = 'readline',
      delimiter = '\r\n',
      ...rest
    } = options;

    if (!path) {
      throw new Error('SerialPort path (e.g. COM1 or /dev/ttyUSB0) is required');
    }

    const port = new SerialPort({
      path,
      baudRate,
      ...rest,
    });

    if (parser === 'readline' && ReadlineParser) {
      port.parser = port.pipe(new ReadlineParser({ delimiter }));
    } else if (parser === 'delimiter' && DelimiterParser) {
      port.parser = port.pipe(new DelimiterParser({ delimiter }));
    } else if (parser === 'bytelength' && ByteLengthParser && options.length) {
      port.parser = port.pipe(new ByteLengthParser({ length: options.length }));
    }

    port.on('error', (err) => {
      // Prevents unhandled error crashes if no listener attached
      if (port.listenerCount('error') <= 1) {
        console.warn('[Techno4Serial Error]', err.message);
      }
    });

    return port;
  },

  /**
   * Create a simulated / mock serial port for automated testing.
   * @param {string} mockPath - e.g. '/dev/ROBOT' or 'COM_MOCK'
   * @param {Object} options
   */
  createMock(mockPath = '/dev/TEST_SERIAL', options = {}) {
    if (!MockBinding) {
      throw new Error('MockBinding is not available');
    }

    const echo = options.echo !== false;
    MockBinding.createPort(mockPath, { echo, record: true });

    const port = new SerialPort({
      path: mockPath,
      baudRate: options.baudRate || 9600,
      binding: MockBinding,
    });

    if (options.parser === 'readline' && ReadlineParser) {
      port.parser = port.pipe(new ReadlineParser({ delimiter: options.delimiter || '\r\n' }));
    }

    return port;
  },
};

module.exports = Techno4Serial;
