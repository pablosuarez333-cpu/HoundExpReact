import { useEffect, useState } from "react";

import Header from "./components/Header";
import Banner from "./components/Banner";
import RegisterForm from "./components/RegisterForm";
import StatusPanel from "./components/StatusPanel";
import GuideList from "./components/GuideList";
import History from "./components/History";
import Footer from "./components/Footer";

import type { Guide, GuideStatus } from "./interfaces/Guide";
import type { HistoryEntry } from "./interfaces/HistoryEntry";

function App() {

    const [guides, setGuides] = useState<Guide[]>([]);

    const [history, setHistory] = useState<HistoryEntry[]>([]);

    const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

    useEffect(() => {

        console.log("Guías actualizadas:", guides);

    }, [guides]);

    const addGuide = (guide: Guide) => {

        setGuides(previous => [...previous, guide]);

    };

    const updateGuideStatus = (

        id: number,

        newStatus: GuideStatus

    ) => {

        const currentGuide = guides.find(g => g.id === id);

        if (!currentGuide) return;

        const historyEntry: HistoryEntry = {

            id: Date.now(),

            guideId: id,

            date: new Date().toLocaleString(),

            previousStatus: currentGuide.status,

            newStatus

        };

        setHistory(previous => [...previous, historyEntry]);

        setGuides(previous =>

            previous.map(guide =>

                guide.id === id

                    ? {

                        ...guide,

                        status: newStatus,

                        lastUpdate: new Date().toLocaleString()

                    }

                    : guide

            )

        );

    };

    const showHistory = (guideId: number) => {

        setSelectedGuide(guideId);

    };

    return (

        <>

            <Header />

            <Banner />

            <RegisterForm

                addGuide={addGuide}

            />

            <StatusPanel

                guides={guides}

            />

            <GuideList

                guides={guides}

                updateGuideStatus={updateGuideStatus}

                showHistory={showHistory}

            />

            <History

                history={history}

                selectedGuide={selectedGuide}

            />

            <Footer />

        </>

    );

}

export default App;