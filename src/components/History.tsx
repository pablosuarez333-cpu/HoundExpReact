import type { HistoryEntry } from "../interfaces/HistoryEntry";

interface HistoryProps {

    history: HistoryEntry[];

    selectedGuide: number | null;

}

function History({

    history,
    selectedGuide

}: HistoryProps) {

    const filteredHistory = history.filter(

        entry => entry.guideId === selectedGuide

    );

    return (

        <section
            className="historial-guias"
            id="historial"
        >

            <h2>Historial de Guías</h2>

            {

                selectedGuide === null

                    ? (

                        <p>

                            Selecciona una guía para visualizar su historial.

                        </p>

                    )

                    : (

                        filteredHistory.length === 0

                            ? (

                                <p>

                                    La guía aún no tiene movimientos registrados.

                                </p>

                            )

                            : (

                                <ul>

                                    {

                                        filteredHistory.map((entry) => (

                                            <li key={entry.id}>

                                                <strong>

                                                    {entry.date}

                                                </strong>

                                                <br />

                                                {entry.previousStatus}

                                                {" → "}

                                                {entry.newStatus}

                                            </li>

                                        ))

                                    }

                                </ul>

                            )

                    )

            }

        </section>

    );

}

export default History;