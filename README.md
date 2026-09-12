# TECHNO4 Total Engine (`techno4-total`)

<div align="center">

**Headless бекенд-рушій та серверна платформа для TECHNO4 FRAMEWORK2**  
*Headless backend engine and server runtime for TECHNO4 FRAMEWORK2*

[![License: LGPL-3.0-or-later](https://img.shields.io/badge/License-LGPL--3.0--or--later-blue.svg)](LICENSE)
[![Organization](https://img.shields.io/badge/Organization-CO%20%C2%ABCF%20TECHNO4%C2%BB-green.svg)](https://techno4.online)

---

### [uk_UA](#uk_ua) &nbsp;|&nbsp; [en_GB](#en_gb)

---

</div>

<br>

---

## uk_UA

### 🎯 Мета проєкту
> **Вільна ініціатива розвитку сучасних інструментів розробника за підтримки благодійної організації «БЛАГОДІЙНИЙ ФОНД ТЕХНО4» (CO «CF TECHNO4»).**

`techno4-total` — це високоефективний, модульний серверний JavaScript-рушій та headless-платформа у складі екосистеми **TECHNO4 FRAMEWORK2**. Рушій оптимізовано для створення REST API, WebSocket-сервісів, систем потокової обробки даних (ThreadsStream), мікросервісів та прямої взаємодії з апаратними інтерфейсами (Serial COM, Web Audio, MIDI).

### ⚡ Ключові можливості

- **Апаратні інтерфейси**: вбудовані субмодулі для роботи з серійними портами (`techno4-total/serial`), Web Audio API (`techno4-total/audio`) та MIDI-контролерами (`techno4-total/midi`).
- **Швидкісний HTTP/WebSocket стек**: оптимізований маршрутизатор запитів, підтримка кластеризації, стримінгу файлів та двостороннього зв'язку в реальному часі.
- **Вбудована NoSQL база даних**: файлова документоорієнтована NoSQL база даних без необхідності підняття зовнішніх СУБД.
- **Tangular шаблонізатор**: надшвидкий компілятор шаблонів (`techno4-total/tangular`).
- **Схеми та Дії (Schemas & Actions)**: декларативний механізм опису бізнес-логіки та валідації вхідних даних.
- **Фундамент для Threads Studio**: слугує ядром запуску візуального редактора потоків `techno4-threads`.

### 📦 Встановлення

```bash
npm install techno4-total
```

### 🚀 Швидкий старт

#### Запуск простого HTTP-сервера:

```javascript
// index.js (CommonJS)
require('techno4-total');

ROUTE('GET /', function() {
    this.json({ status: 'ok', framework: 'TECHNO4 FRAMEWORK2' });
});

HTTP('8008');
```

Або з використанням ES Modules (`index.mjs`):

```javascript
import 'techno4-total';

ROUTE('GET /api/status', function() {
    this.json({ uptime: process.uptime(), memory: process.memoryUsage() });
});

HTTP('8008');
```

#### Робота з апаратними інтерфейсами:

```javascript
// Serial COM порт
import { SerialPort } from 'techno4-total/serial';

// Web Audio API
import { AudioContext } from 'techno4-total/audio';

// MIDI контролери
import easymidi from 'techno4-total/midi';
```

### 🛠 Утиліти командного рядка (CLI)

Пакунок надає консольні команди:
```bash
techno4-total [options]
t4-total [options]
```

### 📚 Офіційна документація
Повна документація та інструкції з розробки:  
👉 **[https://techno4.online/надбання/фреймворк](https://techno4.online/%D0%BD%D0%B0%D0%B4%D0%B1%D0%B0%D0%BD%D0%BD%D1%8F/%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)**

### ⚖️ Ліцензія та права
Вихідний код розповсюджується за ліцензією **LGPL-3.0-or-later**.  
Підтримується: **благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»** (`CO «CF TECHNO4»`).  
Автор: **Mykola Zghurskyi** (`mykola@techno4.online`).  
Містить адаптовані компоненти платформи Total.js (MIT License).

<br>

---

## en_GB

### 🎯 Project Mission
> **A free initiative fostering modern developer tools, supported by the charitable organization "CO «CF TECHNO4»" (благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»).**

`techno4-total` is a high-performance, modular headless JavaScript engine and backend runtime for the **TECHNO4 FRAMEWORK2** ecosystem. Optimized for building REST APIs, real-time WebSocket communication, event-driven ThreadsStream pipelines, microservices, and direct hardware interfacing (Serial COM, Web Audio, MIDI).

### ⚡ Key Features

- **Hardware Interfacing**: Built-in submodules for Serial COM ports (`techno4-total/serial`), Web Audio API (`techno4-total/audio`), and MIDI controllers (`techno4-total/midi`).
- **High-Throughput HTTP & WebSocket Stack**: Optimized router, clustering support, streaming file transfers, and duplex real-time events.
- **Embedded NoSQL Database**: Zero-config document-based embedded NoSQL engine requiring no external database servers.
- **Tangular Template Engine**: Ultra-fast template compiler (`techno4-total/tangular`).
- **Schemas & Actions**: Declarative business logic and request payload validation.
- **Core Engine for Threads Studio**: Powers the `techno4-threads` visual programming environment.

### 📦 Installation

```bash
npm install techno4-total
```

### 🚀 Quick Start

#### Basic HTTP Server:

```javascript
// index.js (CommonJS)
require('techno4-total');

ROUTE('GET /', function() {
    this.json({ status: 'ok', framework: 'TECHNO4 FRAMEWORK2' });
});

HTTP('8008');
```

Or using ES Modules (`index.mjs`):

```javascript
import 'techno4-total';

ROUTE('GET /api/status', function() {
    this.json({ uptime: process.uptime(), memory: process.memoryUsage() });
});

HTTP('8008');
```

#### Hardware Interfacing Example:

```javascript
// Serial COM Port
import { SerialPort } from 'techno4-total/serial';

// Web Audio API
import { AudioContext } from 'techno4-total/audio';

// MIDI Controllers
import easymidi from 'techno4-total/midi';
```

### 🛠 Command-Line Interface (CLI)

Available terminal binaries:
```bash
techno4-total [options]
t4-total [options]
```

### 📚 Official Documentation
Full guides and framework documentation:  
👉 **[https://techno4.online/надбання/фреймворк](https://techno4.online/%D0%BD%D0%B0%D0%B4%D0%B1%D0%B0%D0%BD%D0%BD%D1%8F/%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)**

### ⚖️ License & Attribution
Distributed under the **LGPL-3.0-or-later** license.  
Published and supported by **CO «CF TECHNO4»** (`благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»`).  
Author: **Mykola Zghurskyi** (`mykola@techno4.online`).  
Contains derivatives of Total.js platform (MIT License).
