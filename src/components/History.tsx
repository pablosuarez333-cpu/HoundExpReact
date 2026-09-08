import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import {
  clearHistory,
} from "../store/guideSlice";

function History() {
  const dispatch =
    useAppDispatch();

  const history =
    useAppSelector(
      (state) =>
        state.guides.history
    );

  const reversedHistory = [
    ...history,
  ].reverse();

  return (
    <section
      id="historial"
      className="historial-guias"
    >
      <div id="historial-contenido">
        <div className="history-header">
          <div>
            <h2>
              Historial de actividad
            </h2>

            <p>
              Registro de las
              operaciones realizadas
              sobre las guías.
            </p>
          </div>

          {history.length >
            0 && (
            <button
              type="button"
              className="history-clear-button"
              onClick={() =>
                dispatch(
                  clearHistory()
                )
              }
            >
              Limpiar historial
            </button>
          )}
        </div>

        {history.length ===
        0 ? (
          <p className="history-empty">
            No existen movimientos
            registrados.
          </p>
        ) : (
          <div className="history-list">
            {reversedHistory.map(
              (entry) => (
                <article
                  className="history-item"
                  key={
                    entry.id
                  }
                >
                  <strong>
                    {
                      entry.action
                    }
                  </strong>

                  <span>
                    Guía:{" "}
                    {
                      entry.guideId
                    }
                  </span>

                  <time>
                    {
                      entry.date
                    }
                  </time>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default History;