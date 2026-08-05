import type { Guide } from "../interfaces/Guide";

interface GuideListProps {

    guides: Guide[];

    updateGuideStatus: (
        id: number,
        status: Guide["status"]
    ) => void;

    showHistory: (id: number) => void;

}

function GuideList({

    guides,
    updateGuideStatus,
    showHistory

}: GuideListProps) {

    const nextStatus = (status: Guide["status"]): Guide["status"] => {

        switch (status) {

            case "Pendiente":
                return "En tránsito";

            case "En tránsito":
                return "Entregado";

            default:
                return "Entregado";
        }

    };

    return (

        <section className="lista-guias" id="lista-guias">

            <h2>Lista de Guías</h2>

            <table className="tabla-guias">

                <thead>

                    <tr>
                        <th>Número</th>
                        <th>Estado</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Última actualización</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {

                        guides.length === 0

                            ? (

                                <tr>

                                    <td colSpan={6}>

                                        No existen guías registradas.

                                    </td>

                                </tr>

                            )

                            : (

                                guides.map((guide) => (

                                    <tr key={guide.id}>

                                        <td>{guide.guideNumber}</td>

                                        <td>{guide.status}</td>

                                        <td>{guide.origin}</td>

                                        <td>{guide.destination}</td>

                                        <td>{guide.lastUpdate}</td>

                                        <td>

                                            {

                                                guide.status !== "Entregado" && (

                                                    <button

                                                        onClick={() =>
                                                            updateGuideStatus(
                                                                guide.id,
                                                                nextStatus(
                                                                    guide.status
                                                                )
                                                            )
                                                        }

                                                    >

                                                        Actualizar

                                                    </button>

                                                )

                                            }

                                            <button

                                                onClick={() =>
                                                    showHistory(guide.id)
                                                }

                                            >

                                                Historial

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )

                    }

                </tbody>

            </table>

        </section>

    );

}

export default GuideList;