import {Entry} from "../App";
import {FC, useEffect, useState} from "react";
import QueueEditorModal from "./QueueEditorModal";

interface QueueEditorProps {
    entries: Array<Entry>,
}

const QueueEditor: FC<QueueEditorProps> = ({entries}: QueueEditorProps) => {
    const entry = (id: string): Entry => entries.filter(e => e.id === id)[0];
    const [queue, setQueue] = useState<Array<string>>([]);
    const [dirty, setDirty] = useState<boolean>(false);
    const [modalShown, setModalShown] = useState<boolean>(false);

    const fetchQueue = () => {
        fetch("/api/v1/wheel/queue")
            .then(response => response.json())
            .then(entries => setQueue(entries.map((it: Entry) => it.id)))
    }

    const updateQueue = () => {
        fetch("/api/v1/wheel/queue/update", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"entries": queue})
        })
            .then(() => setDirty(false))
    }

    const removeQueueItem = (index: number) => {
        setDirty(true);
        setQueue(queue => {
            const copy = [...queue];

            copy.splice(index, 1);
            return copy;
        });
    }

    const addQueueItem = (id: string) => {
        setDirty(true);
        setQueue(queue => [...queue, id]);
        setModalShown(false);
    }

    const closeModal = () => {
        setModalShown(false);
    }

    useEffect(() => { fetchQueue(); }, []);

    return (
        <div className="bg-white shadow-lg rounded-xl p-5">
            <h1 className="text-center uppercase tracking-widest text-gray-500 font-black">Fronta</h1>
            <ul className="flex flex-col">
                { queue.map((item, i) =>
                    <li key={i} className="flex flex-row items-center my-3 p-3 border rounded-xl">
                        <div className="w-8 h-8 rounded-full mr-4" style={{backgroundColor: entry(item).color}}></div>
                        <div className="flex flex-col mr-3">
                            <div className="font-black">{entry(item).title}</div>
                            <div className="text-gray-500 text-xs">{entry(item).description}</div>
                        </div>
                        <button onClick={() => {removeQueueItem(i)}} className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-black uppercase ml-auto">Smazat</button>
                    </li>
                ) }

                <li className="flex flex-row items-center my-3 p-3 border border-dashed rounded-xl">
                    <div className="transition w-8 h-8 rounded-full mr-4 bg-gray-200"></div>
                    <div className="flex flex-col mr-3">
                        <div className="font-black text-gray-500">Náhodná položka</div>
                        <div className="text-gray-500 text-xs">Záloha, pokud nejsou ve frontě žádné položky</div>
                    </div>
                </li>

                <li className="flex flex-row justify-center items-center">
                    <button disabled={!dirty} onClick={() => updateQueue()} className={`mr-3 px-10 py-4 text-white uppercase font-black tracking-wide rounded-xl transition transform 
                        ${dirty ? 'hover:scale-95 bg-red-500 shadow-xl' : 'bg-gray-300 shadow-lg' }`}>
                        Uložit změny
                    </button>
                    <button onClick={() => setModalShown(true)} className="px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">
                        Přidat položku do fronty
                    </button>
                </li>
            </ul>
            <QueueEditorModal active={modalShown} onClose={() => closeModal()} onSubmit={(id) => addQueueItem(id)} />
        </div>
    );
};

export default QueueEditor;