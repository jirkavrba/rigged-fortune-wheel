import {FC, useEffect, useState} from "react";

export interface EntrySubmission {
    title: string,
    description: string,
    color: string
}

interface ColorPickerProps {
    onSelect: (color: string) => void
}

const ColorPicker: FC<ColorPickerProps> = ({onSelect}: ColorPickerProps) => {
    const colors = ["#ef4444", "#fbbf24", "#84cc16", "#10b981", "#0ea5e9", "#6366f1", "#a855f7", "#f43f5e"];
    const [selected, setSelected]  = useState<string>(colors[0]);

    const select = (color: string) => {
        setSelected(color);
        onSelect(color);
    }

    useEffect(() => select(colors[0]), []);

    return (
        <div className="flex flex-col items-center group my-5">
            <h1 className="uppercase text-gray-500 font-bold text-xs tracking-widest mb-3">Barva</h1>
            <ul className="flex flex-row items-center justify-between p-5 rounded-full bg-gray-50">
                {colors.map((color, i) =>
                    <li key={i} className={`w-8 h-8 mx-2 rounded-full transform transition cursor-pointer ${selected === color ? 'opacity-100 scale-125' : 'group-hover:opacity-100 opacity-50 hover:scale-90' }`}
                        onClick={() => select(color)} style={{backgroundColor: color}}></li>
                )}
            </ul>
        </div>
    );
}

interface PriceModalProps {
    active?: boolean,
    onClose: () => void,
    onSubmit: (entry: EntrySubmission) => void
}

const PriceEditorModal: FC<PriceModalProps> = ({active = false, onClose, onSubmit}: PriceModalProps) => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const submit = () => {
        if (title.trim().length == 0 || description.trim().length == 0) {
            return;
        }

        const entry = {
            title,
            description,
            color
        }

        onSubmit(entry)
    }

    return (
        <div className={`z-10 transition w-screen h-screen fixed bg-black bg-opacity-50 top-0 left-0 flex flex-row items-center justify-center ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`relative transition duration-500 p-10 bg-white shadow-2xl rounded-2xl text-center w-1/3 transform ${active ? 'translate-y-0' : 'translate-y-20'}`}>

                <ColorPicker onSelect={color => setColor(color)}/>

                <h1 className="uppercase text-gray-500 font-bold text-xs tracking-widest mb-3">Název</h1>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="border outline-none focus:ring-4 focus:ring-gray-300 rounded-xl text-3xl font-black px-8 py-4 mb-10 w-full"/>

                <h1 className="uppercase text-gray-500 font-bold text-xs tracking-widest mb-3">Popis</h1>
                <textarea style={{resize: "none"}} rows={5} value={description} onChange={(event) => setDescription(event.target.value)} className="border outline-none focus:ring-4 focus:ring-gray-300 rounded-xl text-lg text-gray-500 font-bold px-8 py-4 mb-10 w-full"/>

                <div className="flex flex-row justify-center items-center">
                    <button onClick={submit} className="px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">Přidat</button>
                    <button onClick={onClose} className="ml-5 px-10 py-4 bg-gray-400 text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">Zrušit</button>
                </div>
            </div>
        </div>
    )
}

export default PriceEditorModal;