export type GuideStatus = "Pendiente" | "En tránsito" | "Entregado";

export interface Guide {
    id: number;
    guideNumber: string;
    origin: string;
    destination: string;
    recipient: string;
    creationDate: string;
    status: GuideStatus;
    lastUpdate: string;
}