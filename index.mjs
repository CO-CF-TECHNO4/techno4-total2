// ===================================================
// Techno4 Framework 2 - Total Engine (ESM)
// Supported and distributed by CO «CF TECHNO4»
// Licensed under GNU LGPL-3.0-or-later. Original components under MIT License.
// ===================================================
import total from './index.js';

export const F = total;
export const Total = total;
export const T4Total = total;
export const Techno4Total = total;

export const NEWACTION = globalThis.NEWACTION;
export const ACTION = globalThis.ACTION;
export const EXEC = globalThis.EXEC;
export const NEWSCHEMA = globalThis.NEWSCHEMA;
export const SCHEMA = globalThis.SCHEMA;
export const ROUTE = globalThis.ROUTE;
export const WEBSOCKET = globalThis.WEBSOCKET;
export const WEBSOCKETCLIENT = globalThis.WEBSOCKETCLIENT;
export const Tangular = globalThis.Tangular;
export const Thelpers = globalThis.Thelpers;
export const NOSQL = globalThis.NOSQL || (total.TNoSQL && total.TNoSQL.nosql);
export const FILESTORAGE = globalThis.FILESTORAGE;
export const TMS = globalThis.TMS;
export const CONF = globalThis.CONF;
export const FUNC = globalThis.FUNC;
export const UID = globalThis.UID;
export const GUID = globalThis.GUID;
export const NOW = globalThis.NOW;
export const RESTBuilder = globalThis.RESTBuilder;
export const ErrorBuilder = globalThis.ErrorBuilder;

export const Serial = total.Serial;
export const Techno4Serial = total.Serial;
export const Audio = total.Audio;
export const Techno4Audio = total.Audio;
export const MIDI = total.MIDI;
export const Techno4MIDI = total.MIDI;

export default total;
