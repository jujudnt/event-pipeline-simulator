export type RawEvent = {
  id?: unknown;
  type?: unknown;
  userId?: unknown;
  timestamp?: unknown;
  value?: unknown;
};

export type Event = {
  id: string;
  type: string;
  userId: string;
  timestamp: string;
  value: number;
};

export type PipelineReport = {
  accepted: number;
  rejected: number;
  totalsByType: Record<string, number>;
  totalsByUser: Record<string, number>;
};

export function validateEvent(raw: RawEvent): Event | null {
  if (
    typeof raw.id !== "string" ||
    typeof raw.type !== "string" ||
    typeof raw.userId !== "string" ||
    typeof raw.timestamp !== "string" ||
    typeof raw.value !== "number" ||
    Number.isNaN(Date.parse(raw.timestamp))
  ) {
    return null;
  }

  return {
    id: raw.id,
    type: raw.type,
    userId: raw.userId,
    timestamp: raw.timestamp,
    value: raw.value,
  };
}

export function processEvents(events: RawEvent[]): PipelineReport {
  const report: PipelineReport = {
    accepted: 0,
    rejected: 0,
    totalsByType: {},
    totalsByUser: {},
  };

  for (const raw of events) {
    const event = validateEvent(raw);
    if (!event) {
      report.rejected += 1;
      continue;
    }

    report.accepted += 1;
    report.totalsByType[event.type] = (report.totalsByType[event.type] ?? 0) + event.value;
    report.totalsByUser[event.userId] = (report.totalsByUser[event.userId] ?? 0) + event.value;
  }

  return report;
}

