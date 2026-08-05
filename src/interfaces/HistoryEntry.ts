import type { GuideStatus } from "./Guide";

export interface HistoryEntry {
    id: number;
    guideId: number;
    date: string;
    previousStatus: GuideStatus;
    newStatus: GuideStatus;
}