import {FC, useState} from "react";
import {Entry} from "../App";
import PriceEditorModal, {EntrySubmission} from "./PriceEditorModal";

interface PriceEditorProps {
    entries: Array<Entry>,
    onChange: () => void,
}

const PriceEditor: FC<PriceEditorProps> = ({entries, onChange}: PriceEditorProps) => {
    const [modalShown, setModalShown] = useState<boolean>(false);

    const addEntry = (entry: EntrySubmission) => {
        fetch('/api/v1/wheel/entries/add', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        })
            .then(() => onChange())
    }

    const deleteEntry = (id: string) => {
        fetch(`/api/v1/wheel/entries/${id}/remove`, {method: "POST"})
            .then(() => onChange());
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-5">
            <h1 className="text-center uppercase tracking-widest text-gray-500 font-black">Položky</h1>
            <ul className="flex flex-col">
                { entries.map((entry, i) =>
                    <li key={i} className="flex flex-row items-center my-3 p-3 border rounded-xl">
                        <div className="w-8 h-8 rounded-full mr-4" style={{backgroundColor: entry.color}}></div>
                        <div className="flex flex-col mr-3">
                            <div className="font-black">{entry.title}</div>
                            <div className="text-gray-500 text-xs">{entry.description}</div>
                        </div>
                        <button onClick={() => deleteEntry(entry.id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-black uppercase ml-auto">Smazat</button>
                    </li>
                ) }
                <li className="flex flex-col items-center">
                    <button onClick={() => setModalShown(true)} className="mt-3 px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">
                        Přidat novou položku
                    </button>
                </li>
            </ul>

            <PriceEditorModal active={modalShown} onClose={() => setModalShown(false)} onSubmit={(entry) => addEntry(entry)}/>
        </div>
    )
}

export default PriceEditor;