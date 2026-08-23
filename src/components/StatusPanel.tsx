

import { useAppSelector } from "../store/hooks";

function StatusPanel() {
  const guides = useAppSelector(
    (state) => state.guides.guides
  );

  const statistics = guides.reduce(
    (result: { total: number; pending: number; inTransit: number; delivered: number; cancelled: number; }, guide: { status: any; }) => {
      result.total += 1;

      switch (guide.status) {
        case "Pendiente":
          result.pending += 1;
          break;

        case "En tránsito":
          result.inTransit += 1;
          break;

        case "Entregada":
          result.delivered += 1;
          break;

        case "Cancelada":
          result.cancelled += 1;
          break;

        default:
          break;
      }

      return result;
    },
    {
      total: 0,
      pending: 0,
      inTransit: 0,
      delivered: 0,
      cancelled: 0,
    }
  );

  return (
    <section
      id="estado"
      className="estado-general"
    >
      <div className="panel-estadisticas">
        <article className="stat-card">
          <h3>Total de guías</h3>

          <p>{statistics.total}</p>
        </article>

        <article className="stat-card">
          <h3>Pendientes</h3>

          <p>{statistics.pending}</p>
        </article>

        <article className="stat-card">
          <h3>En tránsito</h3>

          <p>{statistics.inTransit}</p>
        </article>

        <article className="stat-card">
          <h3>Entregadas</h3>

          <p>{statistics.delivered}</p>
        </article>

        <article className="stat-card">
          <h3>Canceladas</h3>

          <p>{statistics.cancelled}</p>
        </article>
      </div>
    </section>
  );
}

export default StatusPanel;