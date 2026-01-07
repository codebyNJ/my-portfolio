---
title: "OffyAI: Bringing AI Offline"
date: "November 22, 2025"
category: "Technical Deep Dive"
excerpt: "Why I built an on-device AI system using Ollama & WebLLM. Privacy-first, zero API costs, runs entirely on your hardware."
headerImage: "/images/blog/5.jpg"
readTime: "10 min read"
---

ChatGPT is great. Until your internet dies. Or you're in a sensitive environment. Or you care about privacy. Or you don't want to pay API costs for every request.

The more I used AI tools, the more uncomfortable I became with the tradeoff: convenience in exchange for sending all my data to someone else's servers. Every code snippet, every document I analyze, every question I ask—all flowing through infrastructure I don't control.

**OffyAI** solves this: Run powerful AI models entirely offline, in your browser or on your machine. No internet. No subscriptions. No data leaving your device. Ever.

## The Privacy Problem

When you use ChatGPT or Claude, your data:

- Travels across the internet to remote servers
- Gets processed on infrastructure you don't control
- Might be used for training future models (even if you opt out, do you trust it?)
- Is subject to data breaches (OpenAI has had security incidents)
- Creates a permanent record of your queries

For casual questions, this is fine. But for sensitive use cases—medical records, legal documents, proprietary code, personal journaling—cloud AI is a non-starter.

> For sensitive use cases, cloud AI is unacceptable. The convenience isn't worth the privacy cost.

## Enter: Local AI

What if AI models ran on YOUR hardware? What changes?

- **Zero network requests** — Air-gapped security. Nothing leaves your machine.
- **Instant responses** — No network latency. No "ChatGPT is at capacity" messages.
- **Free forever** — No usage limits. No API costs accumulating.
- **100% private** — Data never leaves your device. Period.

The technology to make this real finally exists. Open-source models have gotten good enough. Hardware has gotten powerful enough. The only missing piece was making it accessible.

## The Tech: Ollama + WebLLM

OffyAI supports two backends, because different users have different needs:

### Option 1: Ollama (Desktop)

Ollama is brilliant in its simplicity. It makes running local AI models as easy as running a Docker container:

```bash
# Install Ollama (one command)
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3.1:8b

# Run inference
ollama run llama3.1:8b "Explain quantum computing"
```

That's it. No Python environments. No dependency hell. No GPU driver nightmares.

**Why Ollama?**

- One-command setup that actually works
- Supports 50+ open-source models
- OpenAI-compatible API (easy to integrate)
- GPU acceleration (CUDA, Metal, ROCm)

### Option 2: WebLLM (Browser)

WebLLM runs AI models entirely in the browser using WebGPU. This is wild—no backend needed at all:

```javascript
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const engine = await CreateWebWorkerMLCEngine({
  model: "Llama-3.1-8B-Instruct-q4f32_1",
});

const response = await engine.chat.completions.create({
  messages: [{ role: "user", content: "Hello!" }],
});
```

**Why WebLLM?**

- Completely serverless (no backend to deploy or maintain)
- Works on any device with a modern browser
- Progressive download (start using while model downloads)
- WebGPU provides near-native performance

## OffyAI Architecture

OffyAI supports BOTH backends. On startup, it detects what's available:

```javascript
async function detectBackend() {
  try {
    await fetch('http://localhost:11434/api/tags');
    return 'ollama'; // Desktop backend available
  } catch {
    return 'webllm'; // Fall back to browser
  }
}
```

If Ollama is running, use it (faster, more powerful). Otherwise, fall back to WebLLM (portable, no install required).

### Model Management

Users can switch models based on their needs:

- **Small models (1-3B params)** — Fast, good for simple tasks. Run on almost any hardware.
- **Medium models (7-8B params)** — Balanced performance. Need decent RAM.
- **Large models (13B+ params)** — Best quality. Require powerful GPU.

The UI shows estimated performance for each model based on detected hardware.

### Streaming Responses

Just like ChatGPT's typewriter effect, responses stream token by token:

```javascript
async function* streamChat(prompt) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model: 'llama3.1:8b',
      prompt,
      stream: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(Boolean);
    
    for (const line of lines) {
      const { response } = JSON.parse(line);
      yield response;
    }
  }
}
```

This makes the experience feel responsive even for slower models.

## Key Features

### Multi-Model Support

Switch between models instantly:

- Llama 3.1 (Meta's latest—excellent general purpose)
- Mistral (Fast, good for coding)
- Phi-3 (Microsoft's small but capable model)
- Gemma (Google's open model)
- CodeLlama (Specialized for programming)

### Context Management

Maintain conversation history for coherent multi-turn chats. The context window is configurable based on available memory.

### Custom System Prompts

Shape the AI's personality:

- **Coder mode:** Concise responses with code examples
- **Teacher mode:** Patient explanations with analogies
- **Creative mode:** Imaginative and exploratory

### RAG (Retrieval-Augmented Generation)

Upload documents and chat with them. The system chunks documents, creates embeddings, and retrieves relevant context for each query.

## Performance Benchmarks

Real numbers from testing on various hardware:

| Model | Backend | Tokens/sec | Latency |
|-------|---------|------------|---------|
| Llama 3.1 8B | Ollama (M1 Max) | ~50 | 20ms |
| Mistral 7B | Ollama (RTX 4090) | ~80 | 12ms |
| Phi-3 Mini | WebLLM (Browser) | ~30 | 35ms |
| GPT-4 | OpenAI API | ~40 | 500ms+ |

**Takeaway:** Local models are actually FASTER than cloud APIs once the model is loaded. No network latency makes a huge difference in perceived responsiveness.

## Challenges & Solutions

### Model Size

8B parameter models are 4-6GB. That's a lot to download on slow connections.

**Solutions:**

- Quantization (INT4 reduces size by 4x with minimal quality loss)
- Progressive loading (use model while rest downloads)
- Offer small models first (Phi-3 Mini is only 2.3GB)

### Hardware Requirements

Running 8B models comfortably needs 16GB+ RAM.

**Solutions:**

- Auto-detect hardware and suggest appropriate models
- Clear messaging about requirements
- WebLLM fallback works on less powerful devices

### Browser Compatibility

WebGPU only works on Chrome/Edge. Firefox and Safari support is limited.

**Solutions:**

- Feature detection with clear messaging
- Fallback to WebGL (slower but universal)
- Suggest desktop mode for unsupported browsers

## Use Cases

The people finding OffyAI most valuable:

- **Medical professionals** — Analyze patient notes without HIPAA concerns
- **Lawyers** — Draft documents without leaking client information
- **Developers** — Code assistance without exposing proprietary code
- **Students** — Learning without internet dependency
- **Journalists** — Research sensitive topics without leaving traces

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **State:** Zustand
- **Desktop Backend:** Ollama
- **Browser Backend:** WebLLM
- **Storage:** IndexedDB (conversation history)
- **Deployment:** Netlify (static site—no server needed)

## Future Plans

1. **Voice mode** — Speech-to-text input, text-to-speech output
2. **Multimodal** — Support for vision models (LLaVA)
3. **Fine-tuning UI** — Train models on your own data
4. **Plugin system** — Integrate tools (calculator, web search)
5. **Mobile app** — React Native version for phones

---

*AI doesn't need the cloud. Your data shouldn't either.*

*The future of AI is local, private, and in your control. Welcome to OffyAI.*

[Try Live Demo](https://offyai.netlify.app) | [View on GitHub](https://github.com/codebyNJ/OffyAI)
