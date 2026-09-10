// ===================================================
// Techno4 Framework 2 - Serial Port Subsystem (ESM)
// ===================================================

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Techno4Serial = require('./serial.js');

export const SerialPort = Techno4Serial.SerialPort;
export const ReadlineParser = Techno4Serial.ReadlineParser;
export const ByteLengthParser = Techno4Serial.ByteLengthParser;
export const DelimiterParser = Techno4Serial.DelimiterParser;
export const MockBinding = Techno4Serial.MockBinding;

export default Techno4Serial;
