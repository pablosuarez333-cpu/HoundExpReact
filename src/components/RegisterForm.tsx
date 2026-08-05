import { useState } from "react";
import type { Guide } from "../interfaces/Guide";

interface RegisterFormProps {
    addGuide: (guide: Guide) => void;
}

function RegisterForm({ addGuide }: RegisterFormProps) {

    const [guideNumber, setGuideNumber] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [recipient, setRecipient] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [status, setStatus] = useState<Guide["status"]>("Pendiente");

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const newGuide: Guide = {

            id: Date.now(),

            guideNumber,

            origin,

            destination,

            recipient,

            creationDate,

            status,

            lastUpdate: new Date().toLocaleString()

        };

        addGuide(newGuide);

        setGuideNumber("");
        setOrigin("");
        setDestination("");
        setRecipient("");
        setCreationDate("");
        setStatus("Pendiente");

    };

    return (

        <section className="registro" id="registro">

            <h2>Registro de Guías</h2>

            <form className="form-registro" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="guideNumber">Número de guía</label>
                    <input
                        id="guideNumber"
                        value={guideNumber}
                        onChange={(e) => setGuideNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="origin">Origen</label>
                    <input
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="destination">Destino</label>
                    <input
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recipient">Destinatario</label>
                    <input
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="creationDate">Fecha</label>
                    <input
                        id="creationDate"
                        type="date"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Estado</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as Guide["status"])
                        }
                    >
                        <option>Pendiente</option>
                        <option>En tránsito</option>
                        <option>Entregado</option>
                    </select>
                </div>

                <button className="btn-submit">
                    Registrar Guía
                </button>

            </form>

        </section>

    );

}

export default RegisterForm;