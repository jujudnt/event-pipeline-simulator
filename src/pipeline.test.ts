import assert from "node:assert/strict";
import test from "node:test";

import { processEvents, validateEvent } from "./pipeline.js";

test("validates required event fields", () => {
  assert.equal(validateEvent({ id: "1", type: "click" }), null);
  assert.deepEqual(
    validateEvent({
      id: "1",
      type: "click",
      userId: "u1",
      timestamp: "2026-09-17T10:00:00Z",
      value: 1,
    }),
    {
      id: "1",
      type: "click",
      userId: "u1",
      timestamp: "2026-09-17T10:00:00Z",
      value: 1,
    },
  );
});

test("aggregates accepted events and counts rejected ones", () => {
  const report = processEvents([
    { id: "1", type: "purchase", userId: "u1", timestamp: "2026-09-17T10:00:00Z", value: 10 },
    { id: "2", type: "purchase", userId: "u1", timestamp: "2026-09-17T10:01:00Z", value: 5 },
    { id: "bad", type: "purchase", userId: "u2", timestamp: "bad-date", value: 20 },
  ]);

  assert.equal(report.accepted, 2);
  assert.equal(report.rejected, 1);
  assert.equal(report.totalsByType.purchase, 15);
  assert.equal(report.totalsByUser.u1, 15);
});

