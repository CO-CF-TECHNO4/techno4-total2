// Techno4 Framework 2 - Tangular ESM Module
import './tangular.js';

const _Ta = (typeof globalThis !== 'undefined' ? (globalThis.Tangular || globalThis.Ta) : null) ||
            (typeof window !== 'undefined' ? (window.Tangular || window.Ta) : null) ||
            (typeof global !== 'undefined' ? (global.Tangular || global.Ta) : null);

const _Thelpers = (typeof globalThis !== 'undefined' ? globalThis.Thelpers : null) ||
                  (typeof window !== 'undefined' ? window.Thelpers : null) ||
                  (typeof global !== 'undefined' ? global.Thelpers : null);

export const Tangular = _Ta;
export const Ta = _Ta;
export const Thelpers = _Thelpers;

export default _Ta;
