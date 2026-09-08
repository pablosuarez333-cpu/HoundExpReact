
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  Guide,
  GuideStatus,
} from "../interfaces/Guide";

import type {
  HistoryEntry,
} from "../interfaces/HistoryEntry";

interface GuidesState {
  guides: Guide[];
  history: HistoryEntry[];
}

interface AddGuidePayload {
  guide: Guide;
  historyEntry: HistoryEntry;
}

interface UpdateGuideStatusPayload {
  id: string;
  status: GuideStatus;
  historyEntry: HistoryEntry;
}

interface RemoveGuidePayload {
  id: string;
  historyEntry: HistoryEntry;
}

const initialState: GuidesState = {
  guides: [],
  history: [],
};

export const STATUS_FLOW: Record<
  GuideStatus,
  GuideStatus[]
> = {
  Pendiente: [
    "En tránsito",
    "Cancelada",
  ],

  "En tránsito": [
    "Entregada",
    "Cancelada",
  ],

  Entregada: [],

  Cancelada: [],
};

export const isValidStatusTransition = (
  currentStatus: GuideStatus,
  nextStatus: GuideStatus
): boolean => {
  return STATUS_FLOW[currentStatus].includes(
    nextStatus
  );
};

const createHistoryEntry = (
  guideId: string,
  action: string
): HistoryEntry => {
  return {
    id: crypto.randomUUID(),
    guideId,
    action,
    date: new Date().toLocaleString(
      "es-MX"
    ),
  };
};

const guideSlice = createSlice({
  name: "guides",

  initialState,

  reducers: {
    addGuide: {
      reducer: (
        state,
        action: PayloadAction<AddGuidePayload>
      ) => {
        const {
          guide,
          historyEntry,
        } = action.payload;

        const guideExists =
          state.guides.some(
            (currentGuide) =>
              currentGuide.guideNumber
                .toLowerCase() ===
              guide.guideNumber
                .toLowerCase()
          );

        if (guideExists) {
          return;
        }

        state.guides.push(guide);

        state.history.push(
          historyEntry
        );
      },

      prepare: (guide: Guide) => {
        return {
          payload: {
            guide,

            historyEntry:
              createHistoryEntry(
                guide.id,
                "Guía registrada"
              ),
          },
        };
      },
    },

    updateGuideStatus: {
      reducer: (
        state,
        action: PayloadAction<UpdateGuideStatusPayload>
      ) => {
        const {
          id,
          status,
          historyEntry,
        } = action.payload;

        const guide =
          state.guides.find(
            (item) =>
              item.id === id
          );

        if (!guide) {
          return;
        }

        if (
          guide.status === status
        ) {
          return;
        }

        if (
          !isValidStatusTransition(
            guide.status,
            status
          )
        ) {
          return;
        }

        guide.status = status;

        state.history.push(
          historyEntry
        );
      },

      prepare: ({
        id,
        status,
        previousStatus,
      }: {
        id: string;
        status: GuideStatus;
        previousStatus: GuideStatus;
      }) => {
        return {
          payload: {
            id,
            status,

            historyEntry:
              createHistoryEntry(
                id,
                `Estado cambiado de ${previousStatus} a ${status}`
              ),
          },
        };
      },
    },

    removeGuide: {
      reducer: (
        state,
        action: PayloadAction<RemoveGuidePayload>
      ) => {
        const {
          id,
          historyEntry,
        } = action.payload;

        const guideExists =
          state.guides.some(
            (guide) =>
              guide.id === id
          );

        if (!guideExists) {
          return;
        }

        state.guides =
          state.guides.filter(
            (guide) =>
              guide.id !== id
          );

        state.history.push(
          historyEntry
        );
      },

      prepare: (id: string) => {
        return {
          payload: {
            id,

            historyEntry:
              createHistoryEntry(
                id,
                "Guía eliminada"
              ),
          },
        };
      },
    },

    clearHistory: (state) => {
      state.history = [];
    },

    clearGuides: (state) => {
      state.guides = [];
      state.history = [];
    },
  },
});

export const {
  addGuide,
  updateGuideStatus,
  removeGuide,
  clearHistory,
  clearGuides,
} = guideSlice.actions;

export default guideSlice.reducer;