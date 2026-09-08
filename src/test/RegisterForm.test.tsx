import {
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RegisterForm from "../components/RegisterForm";

import {
  renderWithStore,
} from "./testUtils";

describe(
  "RegisterForm",
  () => {
    test(
      "registra una nueva guía correctamente",
      async () => {
        const user =
          userEvent.setup();

        const {
          store,
        } =
          renderWithStore(
            <RegisterForm />
          );

        await user.type(
          screen.getByLabelText(
            /número de guía/i
          ),
          "HE987654"
        );

        await user.type(
          screen.getByLabelText(
            /destinatario/i
          ),
          "María López"
        );

        await user.type(
          screen.getByLabelText(
            /origen/i
          ),
          "Toluca"
        );

        await user.type(
          screen.getByLabelText(
            /destino/i
          ),
          "Monterrey"
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /registrar guía/i,
            }
          )
        );

        const state =
          store
            .getState()
            .guides;

        expect(
          state.guides
        ).toHaveLength(1);

        expect(
          state.guides[0]
        ).toMatchObject({
          guideNumber:
            "HE987654",

          recipient:
            "María López",

          origin:
            "Toluca",

          destination:
            "Monterrey",

          status:
            "Pendiente",
        });

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
      "no registra una guía si faltan campos obligatorios",
      async () => {
        const user =
          userEvent.setup();

        const {
          store,
        } =
          renderWithStore(
            <RegisterForm />
          );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /registrar guía/i,
            }
          )
        );

        expect(
          screen.getByText(
            /todos los campos son obligatorios/i
          )
        ).toBeInTheDocument();

        expect(
          store
            .getState()
            .guides
            .guides
        ).toHaveLength(0);
      }
    );

    test(
      "limpia el formulario después de registrar una guía",
      async () => {
        const user =
          userEvent.setup();

        renderWithStore(
          <RegisterForm />
        );

        const guideInput =
          screen.getByLabelText(
            /número de guía/i
          );

        const recipientInput =
          screen.getByLabelText(
            /destinatario/i
          );

        const originInput =
          screen.getByLabelText(
            /origen/i
          );

        const destinationInput =
          screen.getByLabelText(
            /destino/i
          );

        await user.type(
          guideInput,
          "HE100"
        );

        await user.type(
          recipientInput,
          "Pedro"
        );

        await user.type(
          originInput,
          "Toluca"
        );

        await user.type(
          destinationInput,
          "Puebla"
        );

        await user.click(
          screen.getByRole(
            "button",
            {
              name:
                /registrar guía/i,
            }
          )
        );

        expect(
          guideInput
        ).toHaveValue("");

        expect(
          recipientInput
        ).toHaveValue("");

        expect(
          originInput
        ).toHaveValue("");

        expect(
          destinationInput
        ).toHaveValue("");
      }
    );
  }
);