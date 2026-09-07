export type LeadModalType = "trial" | "consultation";

export interface LeadModalPayload {
  type: LeadModalType;
  note?: string;
}

type Listener = (p: LeadModalPayload) => void;
let listener: Listener | null = null;

export function openLeadModal(payload: LeadModalPayload) {
  listener?.(payload);
}

export function subscribeLeadModal(fn: Listener) {
  listener = fn;
  return () => {
    if (listener === fn) listener = null;
  };
}
