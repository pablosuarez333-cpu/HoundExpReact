

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import {
  clearHistory,
} from "../store/guideSlice";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

function History() {
  const dispatch = useAppDispatch();

  const history = useAppSelector(
    (state) => state.guides.history
  );

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <section
      id="historial"
      className="historial-guias"
    >
      <div
        id="historial-contenido"
      >
        <div className="history-header">
          <div>
            <h2>
              Historial de actividad
            </h2>

            <p>
              Registro de las operaciones
              realizadas sobre las guías.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              className="history-clear-button"
              onClick={
                handleClearHistory
              }
            >
              Limpiar historial
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="history-empty">
            No existen movimientos registrados.
          </p>
        ) : (
          <div className="history-list">
            {history
              .slice()
              .reverse()
              .map((entry: { id: Key | null | undefined; action: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; guideId: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <article
                  className="history-item"
                  key={entry.id}
                >
                  <strong>
                    {entry.action}
                  </strong>

                  <span>
                    Guía: {entry.guideId}
                  </span>

                  <time>
                    {entry.date}
                  </time>
                </article>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default History;