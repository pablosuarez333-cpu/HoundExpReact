

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import { addGuide } from "../store/guideSlice";
import { useAppDispatch } from "../store/hooks";

import type { Guide } from "../interfaces/Guide";

function RegisterForm() {
  const dispatch = useAppDispatch();

  const [guideNumber, setGuideNumber] =
    useState("");

  const [recipient, setRecipient] =
    useState("");

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [
    guideNumber,
    recipient,
    origin,
    destination,
  ]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanGuideNumber =
      guideNumber.trim();

    const cleanRecipient =
      recipient.trim();

    const cleanOrigin =
      origin.trim();

    const cleanDestination =
      destination.trim();

    if (
      !cleanGuideNumber ||
      !cleanRecipient ||
      !cleanOrigin ||
      !cleanDestination
    ) {
      setError(
        "Todos los campos son obligatorios."
      );

      return;
    }

    const newGuide: Guide = {
      id: crypto.randomUUID(),
      guideNumber: cleanGuideNumber,
      recipient: cleanRecipient,
      origin: cleanOrigin,
      destination: cleanDestination,
      status: "Pendiente",
      date: new Date().toLocaleDateString(
        "es-MX"
      ),
    };

    dispatch(addGuide(newGuide));

    setGuideNumber("");
    setRecipient("");
    setOrigin("");
    setDestination("");
  };

  return (
    <section
      id="registro"
      className="registro"
    >
      <form
        className="form-registro"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="guideNumber">
            Número de guía
          </label>

          <input
            id="guideNumber"
            type="text"
            value={guideNumber}
            onChange={(event) =>
              setGuideNumber(
                event.target.value
              )
            }
            placeholder="Ej. HE123456789"
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipient">
            Destinatario
          </label>

          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(event) =>
              setRecipient(
                event.target.value
              )
            }
            placeholder="Nombre del destinatario"
          />
        </div>

        <div className="form-group">
          <label htmlFor="origin">
            Origen
          </label>

          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(event) =>
              setOrigin(
                event.target.value
              )
            }
            placeholder="Ciudad de origen"
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">
            Destino
          </label>

          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
            placeholder="Ciudad de destino"
          />
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-submit"
        >
          Registrar guía
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;