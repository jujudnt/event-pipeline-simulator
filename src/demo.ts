import { processEvents, type RawEvent } from "./pipeline.js";

const events: RawEvent[] = [
  {
    id: "evt_001",
    type: "signup",
    userId: "user_1",
    timestamp: "2026-09-17T10:00:00Z",
    value: 1,
  },
  {
    id: "evt_002",
    type: "purchase",
    userId: "user_1",
    timestamp: "2026-09-17T10:05:00Z",
    value: 49,
  },
  {
    id: "evt_003",
    type: "purchase",
    userId: "user_2",
    timestamp: "2026-09-17T10:07:00Z",
    value: 19,
  },
  {
    id: "broken",
    type: "purchase",
    userId: "user_3",
    timestamp: "not-a-date",
    value: 99,
  },
];

console.log(JSON.stringify(processEvents(events), null, 2));

