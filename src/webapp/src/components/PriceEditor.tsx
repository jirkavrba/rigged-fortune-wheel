import {FC} from "react";
import {Entry} from "../App";

interface PriceEditorProps {
    entries: Array<Entry>,
    onChange?: () => void,
}

const PriceEditor: FC<PriceEditorProps> = ({entries, onChange}: PriceEditorProps) => {

    const deleteEntry = (id: string) => {
        fetch(`/api/v1/wheel/entries/${id}/remove`, {method: "POST"})
            .then(() => {
                if (typeof onChange !== "undefined") {
                    onChange();
                }
            })
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-5 max-w-1/2">
            <ul className="flex flex-col">
                { entries.map((entry, i) =>
                    <li key={i} className="flex flex-row items-center my-3 p-3 rounded shadow">
                        <div className="w-8 h-8 rounded-full mr-4" style={{backgroundColor: entry.color}}></div>
                        <div className="flex flex-col mr-3">
                            <div className="font-black">{entry.title}</div>
                            <div className="text-gray-500 text-xs">{entry.description}</div>
                        </div>
                        <button onClick={() => deleteEntry(entry.id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-black uppercase ml-auto">Smazat</button>
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default PriceEditor;