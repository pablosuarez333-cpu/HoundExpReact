import {
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import GuideList from "../components/GuideList";

import {
  addGuide,
} from "../store/guideSlice";

import type {
  Guide,
} from "../interfaces/Guide";

import {
  createTestStore,
  renderWithStore,
} from "./testUtils";

const createGuide = (
  overrides:
    Partial<Guide> = {}
): Guide => {
  return {
    id:
      "guide-test-1",

    guideNumber:
      "HE100001",

    recipient:
      "Carlos Ruiz",

    origin:
      "Toluca",

    destination:
      "Guadalajara",

    status:
      "Pendiente",

    date:
      "07/09/2026",

    ...overrides,
  };
};

describe(
  "GuideList",
  () => {
    test(
      "muestra una guía almacenada en Redux",
      () => {
        const store =
          createTestStore();

        store.dispatch(
          addGuide(
            createGuide()
          )
        );

        renderWithStore(
          <GuideList />,
          store
        );

        expect(
          screen.getByText(
            "HE100001"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Carlos Ruiz"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "actualiza Pendiente a En tránsito y después a Entregada",
      async () => {
        const user =
          userEvent.setup();

        const store =
          createTestStore();

        store.dispatch(
          addGuide(
            createGuide()
          )
        );

        renderWithStore(
          <GuideList />,
          store
        );

        const statusSelect =
          screen.getByRole(
            "combobox",
            {
              name:
                /estado de la guía HE100001/i,
            }
          );

        expect(
          statusSelect
        ).toHaveValue(
          "Pendiente"
        );

        await user.selectOptions(
          statusSelect,
          "En tránsito"
        );

        expect(
          store
            .getState()
            .guides
            .guides[0]
            .status
        ).toBe(
          "En tránsito"
        );

        expect(
          statusSelect
        ).toHaveValue(
          "En tránsito"
        );

        await user.selectOptions(
          statusSelect,
          "Entregada"
        );

        expect(
          store
            .getState()
            .guides
            .guides[0]
            .status
        ).toBe(
          "Entregada"
        );

        expect(
          statusSelect
        ).toHaveValue(
          "Entregada"
        );
      }
    );

    test(
      "no permite seleccionar Entregada directamente desde Pendiente",
      () => {
        const store =
          createTestStore();

        store.dispatch(
          addGuide(
            createGuide()
          )
        );

        renderWithStore(
          <GuideList />,
          store
        );

        const deliveredOption =
          screen.getByRole(
            "option",
            {
              name:
                "Entregada",
            }
          );

        expect(
          deliveredOption
        ).toBeDisabled();
      }
    );

    test(
      "permite cancelar una guía pendiente",
      async () => {
        const user =
          userEvent.setup();

        const store =
          createTestStore();

        store.dispatch(
          addGuide(
            createGuide()
          )
        );

        renderWithStore(
          <GuideList />,
          store
        );

        const statusSelect =
          screen.getByRole(
            "combobox",
            {
              name:
                /estado de la guía HE100001/i,
            }
          );

        await user.selectOptions(
          statusSelect,
          "Cancelada"
        );

        expect(
          store
            .getState()
            .guides
            .guides[0]
            .status
        ).toBe(
          "Cancelada"
        );
      }
    );
  }
);