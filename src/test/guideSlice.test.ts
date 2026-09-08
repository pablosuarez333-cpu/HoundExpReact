import reducer, {
  addGuide,
  updateGuideStatus,
} from "../store/guideSlice";

import type {
  Guide,
} from "../interfaces/Guide";

const createGuide = (
  overrides:
    Partial<Guide> = {}
): Guide => {
  return {
    id: "guide-1",

    guideNumber:
      "HE123456",

    recipient:
      "Juan Pérez",

    origin:
      "Toluca",

    destination:
      "Ciudad de México",

    status:
      "Pendiente",

    date:
      "07/09/2026",

    ...overrides,
  };
};

describe(
  "guideSlice",
  () => {
    test(
      "retorna el estado inicial correctamente",
      () => {
        const state =
          reducer(
            undefined,
            {
              type:
                "unknown",
            }
          );

        expect(
          state.guides
        ).toEqual([]);

        expect(
          state.history
        ).toEqual([]);
      }
    );

    test(
      "addGuide añade una nueva guía",
      () => {
        const guide =
          createGuide();

        const state =
          reducer(
            undefined,
            addGuide(
              guide
            )
          );

        expect(
          state.guides
        ).toHaveLength(1);

        expect(
          state.guides[0]
        ).toEqual(
          guide
        );

        expect(
          state.history
        ).toHaveLength(1);

        expect(
          state.history[0]
            .action
        ).toBe(
          "Guía registrada"
        );
      }
    );

    test(
      "addGuide no permite duplicar el número de guía",
      () => {
        const first =
          createGuide();

        const duplicate =
          createGuide({
            id:
              "guide-2",

            guideNumber:
              "he123456",
          });

        let state =
          reducer(
            undefined,
            addGuide(
              first
            )
          );

        state =
          reducer(
            state,
            addGuide(
              duplicate
            )
          );

        expect(
          state.guides
        ).toHaveLength(1);
      }
    );

    test(
      "updateGuideStatus permite Pendiente a En tránsito",
      () => {
        const guide =
          createGuide();

        let state =
          reducer(
            undefined,
            addGuide(
              guide
            )
          );

        state =
          reducer(
            state,

            updateGuideStatus({
              id:
                guide.id,

              status:
                "En tránsito",

              previousStatus:
                "Pendiente",
            })
          );

        expect(
          state.guides[0]
            .status
        ).toBe(
          "En tránsito"
        );
      }
    );

    test(
      "updateGuideStatus permite En tránsito a Entregada",
      () => {
        const guide =
          createGuide({
            status:
              "En tránsito",
          });

        let state =
          reducer(
            undefined,
            addGuide(
              guide
            )
          );

        state =
          reducer(
            state,

            updateGuideStatus({
              id:
                guide.id,

              status:
                "Entregada",

              previousStatus:
                "En tránsito",
            })
          );

        expect(
          state.guides[0]
            .status
        ).toBe(
          "Entregada"
        );
      }
    );

    test(
      "rechaza el salto directo de Pendiente a Entregada",
      () => {
        const guide =
          createGuide();

        let state =
          reducer(
            undefined,
            addGuide(
              guide
            )
          );

        const previousHistoryLength =
          state.history.length;

        state =
          reducer(
            state,

            updateGuideStatus({
              id:
                guide.id,

              status:
                "Entregada",

              previousStatus:
                "Pendiente",
            })
          );

        expect(
          state.guides[0]
            .status
        ).toBe(
          "Pendiente"
        );

        expect(
          state.history
        ).toHaveLength(
          previousHistoryLength
        );
      }
    );

    test(
      "una guía entregada no puede regresar a En tránsito",
      () => {
        const guide =
          createGuide({
            status:
              "Entregada",
          });

        let state =
          reducer(
            undefined,
            addGuide(
              guide
            )
          );

        state =
          reducer(
            state,

            updateGuideStatus({
              id:
                guide.id,

              status:
                "En tránsito",

              previousStatus:
                "Entregada",
            })
          );

        expect(
          state.guides[0]
            .status
        ).toBe(
          "Entregada"
        );
      }
    );
  }
);