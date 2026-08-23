

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

const initialState: GuidesState = {
  guides: [],
  history: [],
};

const createHistoryEntry = (
  guideId: string,
  action: string
): HistoryEntry => {
  return {
    id: crypto.randomUUID(),
    guideId,
    action,
    date: new Date().toLocaleString("es-MX"),
  };
};

const guidesSlice = createSlice({
  name: "guides",

  initialState,

  reducers: {
    addGuide: (
      state,
      action: PayloadAction<Guide>
    ) => {
      const guideExists = state.guides.some(
        (guide) =>
          guide.guideNumber.toLowerCase() ===
          action.payload.guideNumber.toLowerCase()
      );

      if (guideExists) {
        return;
      }

      state.guides.push(action.payload);

      state.history.push(
        createHistoryEntry(
          action.payload.id,
          "Guía registrada"
        )
      );
    },

    removeGuide: (
      state,
      action: PayloadAction<string>
    ) => {
      const guide = state.guides.find(
        (item) => item.id === action.payload
      );

      if (!guide) {
        return;
      }

      state.guides = state.guides.filter(
        (item) => item.id !== action.payload
      );

      state.history.push(
        createHistoryEntry(
          guide.id,
          "Guía eliminada"
        )
      );
    },

    updateGuideStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: GuideStatus;
      }>
    ) => {
      const guide = state.guides.find(
        (item) => item.id === action.payload.id
      );

      if (!guide) {
        return;
      }

      if (guide.status === action.payload.status) {
        return;
      }

      const previousStatus = guide.status;

      guide.status = action.payload.status;

      state.history.push(
        createHistoryEntry(
          guide.id,
          `Estado cambiado de ${previousStatus} a ${action.payload.status}`
        )
      );
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
  removeGuide,
  updateGuideStatus,
  clearHistory,
  clearGuides,
} = guidesSlice.actions;

export default guidesSlice.reducer;