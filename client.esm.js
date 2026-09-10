// Techno4 Framework 2 - Total.js Client Bridge (ESM)
import './client.js';

const _client = typeof window !== 'undefined' ? window.Techno4TotalClient : (typeof globalThis !== 'undefined' ? globalThis.Techno4TotalClient : null);
const _plugin = typeof window !== 'undefined' ? window.Techno4TotalPlugin : (typeof globalThis !== 'undefined' ? globalThis.Techno4TotalPlugin : null);

export const Techno4TotalClient = _client;
export const Techno4TotalPlugin = _plugin;
export default _plugin;
