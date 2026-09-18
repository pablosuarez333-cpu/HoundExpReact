import {
  type ChangeEvent,
  useState,
} from "react";

import {
  isValidStatusTransition,
  removeGuide,
  updateGuideStatus,
} from "../store/guideSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import type {
  GuideStatus,
} from "../interfaces/Guide";

const GUIDE_STATUSES:
  GuideStatus[] = [
    "Pendiente",
    "En tránsito",
    "Entregada",
    "Cancelada",
  ];

function GuideList() {
  const dispatch =
    useAppDispatch();

  const guides =
    useAppSelector(
      (state) =>
        state.guides.guides
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const normalizedSearch =
    search
      .trim()
      .toLowerCase();

  const filteredGuides =
    normalizedSearch.length === 0
      ? guides
      : guides.filter(
          (guide) =>
            guide.guideNumber
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            guide.recipient
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            guide.origin
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            guide.destination
              .toLowerCase()
              .includes(
                normalizedSearch
              )
        );

  const handleStatusChange = (
    id: string,
    currentStatus:
      GuideStatus,
    event:
      ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus =
      event.target
        .value as GuideStatus;

    dispatch(
      updateGuideStatus({
        id,
        status: newStatus,
        previousStatus:
          currentStatus,
      })
    );
  };

  const handleRemove = (
    id: string
  ) => {
    dispatch(
      removeGuide(id)
    );
  };

  return (
    <section
      id="guias"
      className="lista-guias"
      aria-labelledby="guias-title"
    >
      <h2
        id="guias-title"
        className="section-title"
      >
        Guías registradas
      </h2>

      <div className="guide-toolbar">
        <label
          htmlFor="guide-search"
          className="sr-only"
        >
          Buscar guía por número,
          destinatario, origen o destino
        </label>

        <input
          id="guide-search"
          type="search"
          className="guide-search"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Buscar guía, destinatario, origen o destino..."
        />
      </div>

      <div
        className="table-wrapper"
        tabIndex={0}
        aria-label="Tabla desplazable de guías registradas"
      >
        <table className="tabla-guias">
          <caption className="sr-only">
            Listado de guías registradas,
            destinatarios, rutas, fechas y
            estados de los envíos.
          </caption>

          <thead>
            <tr>
              <th scope="col">
                Número de guía
              </th>

              <th scope="col">
                Destinatario
              </th>

              <th scope="col">
                Origen
              </th>

              <th scope="col">
                Destino
              </th>

              <th scope="col">
                Fecha
              </th>

              <th scope="col">
                Estado
              </th>

              <th scope="col">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredGuides.length ===
            0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="empty-state"
                  aria-live="polite"
                >
                  {normalizedSearch
                    ? "No se encontraron guías."
                    : "No hay guías registradas."}
                </td>
              </tr>
            ) : (
              filteredGuides.map(
                (guide) => (
                  <tr
                    key={guide.id}
                  >
                    <td>
                      {
                        guide.guideNumber
                      }
                    </td>

                    <td>
                      {
                        guide.recipient
                      }
                    </td>

                    <td>
                      {
                        guide.origin
                      }
                    </td>

                    <td>
                      {
                        guide.destination
                      }
                    </td>

                    <td>
                      {
                        guide.date
                      }
                    </td>

                    <td>
                      <select
                        value={
                          guide.status
                        }
                        onChange={(
                          event
                        ) =>
                          handleStatusChange(
                            guide.id,
                            guide.status,
                            event
                          )
                        }
                        aria-label={`Cambiar estado de la guía ${guide.guideNumber}. Estado actual: ${guide.status}`}
                      >
                        {GUIDE_STATUSES.map(
                          (
                            status
                          ) => (
                            <option
                              key={
                                status
                              }
                              value={
                                status
                              }
                              disabled={
                                status !==
                                  guide.status &&
                                !isValidStatusTransition(
                                  guide.status,
                                  status
                                )
                              }
                            >
                              {
                                status
                              }
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(
                            guide.id
                          )
                        }
                        aria-label={`Eliminar guía ${guide.guideNumber}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GuideList;