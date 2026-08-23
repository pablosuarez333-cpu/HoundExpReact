

export type GuideStatus =
  | "Pendiente"
  | "En tránsito"
  | "Entregada"
  | "Cancelada";

export interface Guide {
  id: string;
  guideNumber: string;
  recipient: string;
  origin: string;
  destination: string;
  status: GuideStatus;
  date: string;
}