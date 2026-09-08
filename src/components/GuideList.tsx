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
    >
      <div className="guide-toolbar">
        <input
          type="search"
          className="guide-search"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Buscar guía, destinatario, origen o destino..."
          aria-label="Buscar guía"
        />
      </div>

      <div className="table-wrapper">
        <table className="tabla-guias">
          <thead>
            <tr>
              <th>
                Número de guía
              </th>

              <th>
                Destinatario
              </th>

              <th>
                Origen
              </th>

              <th>
                Destino
              </th>

              <th>
                Fecha
              </th>

              <th>
                Estado
              </th>

              <th>
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
                    key={
                      guide.id
                    }
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
                        aria-label={`Estado de la guía ${guide.guideNumber}`}
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