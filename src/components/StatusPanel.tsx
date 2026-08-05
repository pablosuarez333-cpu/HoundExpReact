import type { Guide } from "../interfaces/Guide";

interface StatusPanelProps {

    guides: Guide[];

}

function StatusPanel({ guides }: StatusPanelProps) {

    const active = guides.length;

    const transit =
        guides.filter(g => g.status === "En tránsito").length;

    const delivered =
        guides.filter(g => g.status === "Entregado").length;

    return (

        <section className="estado-general" id="estado-general">

            <h2>Estado General</h2>

            <div className="panel-estadisticas">

                <div className="stat-card">
                    <h3>Total de guías activas</h3>
                    <p>{active}</p>
                </div>

                <div className="stat-card">
                    <h3>En tránsito</h3>
                    <p>{transit}</p>
                </div>

                <div className="stat-card">
                    <h3>Entregadas</h3>
                    <p>{delivered}</p>
                </div>

            </div>

        </section>

    );

}

export default StatusPanel;