---
title: "Building Aruvi: Healthcare for the Underserved"
date: "December 10, 2025"
category: "Technical Deep Dive"
excerpt: "How I built an offline-first PWA for rural healthcare workers. IndexedDB, Service Workers, and making tech work without internet."
headerImage: "/images/blog/2.jpg"
readTime: "12 min read"
---

In rural India, healthcare workers still carry paper registers. A patient's entire medical history fits on torn, faded pages. Lab results get lost. Prescriptions are illegible. Lives hang in the balance of outdated record-keeping.

I spent two weeks shadowing these workers in Tamil Nadu, and what I saw changed how I think about technology. We build apps assuming stable internet, powerful devices, and tech-savvy users. That's not the world for most people on this planet.

**Aruvi** started with a simple question: Why can't healthcare workers digitize records as easily as they take notes?

## The Problem Space

Most Electronic Health Record (EHR) systems assume:

- High-speed internet (not available in rural areas—we're talking 2G that drops constantly)
- Expensive hardware (clinics can't afford iPads; workers use $50 Android phones)
- Tech-savvy users (healthcare workers aren't developers; many are barely computer literate)
- English interfaces (India has 22 official languages; these workers speak Tamil, Telugu, Hindi)

The gap between what exists and what's needed is enormous. Commercial EHR systems cost thousands of dollars and require training that takes weeks. For a Primary Health Centre serving 30,000 people with two nurses and one doctor, that's not an option.

> The reality on the ground: intermittent connectivity, underpowered devices, workers who prefer vernacular languages, and zero tolerance for complexity.

## The Vision

Create an EHR system that:

1. **Works offline-first** — Internet is a bonus, not a requirement. The app should function perfectly with zero connectivity.

2. **Runs on anything** — From basic Android phones to tablets. If it can run a browser, it should run Aruvi.

3. **Speaks their language** — Literally, in regional languages with voice input support.

4. **Feels natural** — Mimic paper workflows digitally. Don't make them learn a new way of working; improve their existing way.

## Technical Architecture

### Progressive Web App (PWA)

Why PWA over native app? The math was simple:

- **No app store friction** — Just share a link. In areas with limited data, downloading a 50MB app is a non-starter.

- **Auto-updates** — No manual downloads. The app updates silently when connectivity is available.

- **Works everywhere** — Android, iOS, desktop. One codebase, multiple platforms.

- **Offline-capable** — Service Workers make this possible.

The Service Worker intercepts every network request and decides whether to serve from cache or network:

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
```

This simple pattern means the entire application shell loads instantly, even offline.

### IndexedDB for Local Storage

We needed to store megabytes of patient data locally. localStorage has a 5MB limit and synchronous API that blocks the UI. IndexedDB was the only option.

The advantages:

- Stores MBs of structured patient data
- Async operations that don't block the UI
- ACID transactions (crucial for medical data—we can't afford partial writes)
- Query capabilities for searching patients

We use Dexie.js as a wrapper because raw IndexedDB is painful to work with:

```javascript
const db = await openDB('aruvi-db', 1);
await db.put('patients', {
  id: uuid(),
  name: 'Patient Name',
  records: [...],
  lastSync: Date.now()
});
```

### Background Sync

When internet returns, sync happens automatically without user intervention:

```javascript
navigator.serviceWorker.ready.then((registration) => {
  registration.sync.register('sync-patient-data');
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-patient-data') {
    event.waitUntil(syncDataToServer());
  }
});
```

The user doesn't need to think about whether they're online or offline. They just use the app. Data syncs when possible.

### Conflict Resolution

Two healthcare workers editing the same record offline. Who wins when they sync?

This is genuinely hard. We use a timestamp-based approach with field-level merging:

```javascript
function mergeRecords(local, remote) {
  // Compare field by field
  // Most recent change wins for each field
  // Medical priority overrides for critical fields
}
```

For critical fields like allergies or current medications, we're more conservative—we alert the user rather than auto-merge.

## Key Features

### Voice-to-Text Input

Healthcare workers can dictate notes in Tamil, Hindi, or English. This was huge—typing on small keyboards is slow and error-prone.

We use the Web Speech API, which works surprisingly well for Indian languages:

```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ta-IN'; // Tamil
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  addToPatientNotes(transcript);
};
```

### Smart Templates

Common cases (fever, diabetes checkup, prenatal visit) have pre-filled templates. This reduced data entry time by 70% in our field tests.

The templates are contextual—if you're seeing a pregnant woman, you get prenatal templates. If you're following up on a diabetic patient, you get blood sugar tracking templates.

### Offline PDF Generation

Generate printable prescriptions without internet using jsPDF. This was critical—patients need physical prescriptions for pharmacies that don't have computers.

## Challenges Faced

### Slow 2G Networks

We optimized aggressively:

- Gzip compression for everything
- Delta sync (only send changes, not full records)
- Request queuing with retry logic
- Progressive loading (show something useful immediately)

### Device Fragmentation

Testing on 50+ devices revealed bizarre issues. Old Android versions don't support IndexedDB properly. iOS Safari has quirks with Service Workers.

Our solution: graceful degradation. If a feature isn't supported, we fall back to simpler approaches. localStorage as a fallback for IndexedDB. Cache API fallback for Service Workers.

### Data Security

Medical records are sensitive. We encrypt everything at rest using AES:

```javascript
const encrypted = CryptoJS.AES.encrypt(
  JSON.stringify(patientData),
  secretKey
).toString();
```

The encryption key is derived from the user's PIN, so even if the device is stolen, data remains protected.

## Impact So Far

- **150+ healthcare workers** using Aruvi daily
- **10,000+ patient records** digitized
- **95% offline success rate** (the app works even without internet)
- **40% faster** record-keeping compared to paper

But the numbers don't capture the real impact. A nurse told me she could finally track which diabetic patients hadn't come for checkups in over a month. Before Aruvi, that information was buried in paper registers that nobody had time to review.

## Lessons Learned

**Offline-First Is Hard But Worth It** — Building for offline forces you to think about edge cases early. It's harder than assuming constant connectivity, but the result is more robust software.

**User Research Is Everything** — Those two weeks shadowing healthcare workers taught me more than six months of coding would have. Build with people, not for people.

**Performance Matters More Than You Think** — On a $50 phone, every KB and every millisecond counts. What feels fine on your MacBook Pro is unusable on their devices.

**Simplicity Wins** — We removed 30% of features after launch. Complexity confused users. Every button should earn its place.

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **State:** Zustand (lighter than Redux, perfect for PWAs)
- **Storage:** IndexedDB via Dexie.js
- **Backend:** Node.js, Express, MongoDB
- **Sync:** WebSockets for real-time updates
- **Deployment:** Vercel (frontend), Railway (backend)

---

*Technology should bridge gaps, not widen them. Aruvi is a small step toward accessible healthcare for all.*

*If you're building for the underserved, remember: offline-first isn't a feature. It's a necessity.*

[View on GitHub](https://github.com/codebyNJ/Aruvi)
