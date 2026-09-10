// ===================================================
// Techno4 Framework 2 - Hardware MIDI Subsystem (ESM)
// ===================================================

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Techno4MIDI = require('./midi.js');

export const getInputs = () => Techno4MIDI.getInputs();
export const getOutputs = () => Techno4MIDI.getOutputs();
export const createInput = (name, v) => Techno4MIDI.createInput(name, v);
export const createOutput = (name, v) => Techno4MIDI.createOutput(name, v);
export const createVirtualPair = (name) => Techno4MIDI.createVirtualPair(name);
export const Input = Techno4MIDI.Input;
export const Output = Techno4MIDI.Output;

export default Techno4MIDI;
