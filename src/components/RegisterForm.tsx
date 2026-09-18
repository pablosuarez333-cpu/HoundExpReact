import {
  type FormEvent,
  useState,
} from "react";

import {
  addGuide,
} from "../store/guideSlice";

import {
  useAppDispatch,
} from "../store/hooks";

import type {
  Guide,
} from "../interfaces/Guide";

function RegisterForm() {
  const dispatch =
    useAppDispatch();

  const [
    guideNumber,
    setGuideNumber,
  ] = useState("");

  const [
    recipient,
    setRecipient,
  ] = useState("");

  const [
    origin,
    setOrigin,
  ] = useState("");

  const [
    destination,
    setDestination,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

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

      guideNumber:
        cleanGuideNumber,

      recipient:
        cleanRecipient,

      origin:
        cleanOrigin,

      destination:
        cleanDestination,

      status: "Pendiente",

      date:
        new Date()
          .toLocaleDateString(
            "es-MX"
          ),
    };

    dispatch(
      addGuide(newGuide)
    );

    setGuideNumber("");
    setRecipient("");
    setOrigin("");
    setDestination("");
    setError("");
  };

  return (
    <section
      id="registro"
      className="registro"
      aria-labelledby="registro-title"
    >
      <h2
        id="registro-title"
        className="section-title"
      >
        Registrar nueva guía
      </h2>

      <p
        id="registro-description"
        className="section-description"
      >
        Ingresa los datos necesarios
        para registrar y comenzar el
        seguimiento de un envío.
      </p>

      <form
        className="form-registro"
        onSubmit={handleSubmit}
        aria-describedby="registro-description"
        noValidate
      >
        <div className="form-group">
          <label
            htmlFor="guideNumber"
          >
            Número de guía
          </label>

          <input
            id="guideNumber"
            name="guideNumber"
            type="text"
            value={guideNumber}
            onChange={(event) =>
              setGuideNumber(
                event.target.value
              )
            }
            placeholder="Ej. HE123456789"
            autoComplete="off"
            required
            aria-required="true"
            aria-invalid={
              Boolean(error) &&
              !guideNumber.trim()
            }
            aria-describedby={
              error
                ? "form-error"
                : undefined
            }
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="recipient"
          >
            Destinatario
          </label>

          <input
            id="recipient"
            name="recipient"
            type="text"
            value={recipient}
            onChange={(event) =>
              setRecipient(
                event.target.value
              )
            }
            placeholder="Nombre del destinatario"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={
              Boolean(error) &&
              !recipient.trim()
            }
            aria-describedby={
              error
                ? "form-error"
                : undefined
            }
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="origin"
          >
            Origen
          </label>

          <input
            id="origin"
            name="origin"
            type="text"
            value={origin}
            onChange={(event) =>
              setOrigin(
                event.target.value
              )
            }
            placeholder="Ciudad de origen"
            required
            aria-required="true"
            aria-invalid={
              Boolean(error) &&
              !origin.trim()
            }
            aria-describedby={
              error
                ? "form-error"
                : undefined
            }
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="destination"
          >
            Destino
          </label>

          <input
            id="destination"
            name="destination"
            type="text"
            value={destination}
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
            placeholder="Ciudad de destino"
            required
            aria-required="true"
            aria-invalid={
              Boolean(error) &&
              !destination.trim()
            }
            aria-describedby={
              error
                ? "form-error"
                : undefined
            }
          />
        </div>

        {error && (
          <p
            id="form-error"
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
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