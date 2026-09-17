# Event Pipeline Simulator

A TypeScript mini-project that simulates a streaming event pipeline.

It validates incoming events, aggregates metrics by event type and user, and
prints a compact operational summary. It is deliberately small, but it mirrors
the kinds of contracts and edge cases that show up in backend and data systems.

## Run

```bash
npm install
npm test
npm run demo
```

## What It Shows

- typed event contracts
- validation and dead-letter handling
- streaming-style aggregation
- Node.js test runner
- clean CLI output

