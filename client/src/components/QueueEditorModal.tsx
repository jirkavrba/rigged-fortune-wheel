import {FC, useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import PriceList from "./PriceList";

interface PriceModalProps {
    active?: boolean,
    onClose: () => void,
    onSubmit: (id: string) => void
}

const QueueEditorModal: FC<PriceModalProps> = ({active = false, onClose, onSubmit}: PriceModalProps) => {
    const entries = useContext(AppContext).entries;
    const [selected, setSelected] = useState<string | undefined>();

    const submit = () => {
        if (selected == undefined) {
            return;
        }

        onSubmit(selected);
    }

    useEffect(() => setSelected(undefined), [active]);

    return (
        <div
            className={`z-10 transition w-screen h-screen fixed bg-black bg-opacity-50 top-0 left-0 flex flex-row items-center justify-center ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`relative transition duration-500 p-10 bg-white shadow-2xl rounded-2xl text-center w-1/3 transform ${active ? 'translate-y-0' : 'translate-y-20'}`}>

                <PriceList selected={selected} onSelect={(id) => setSelected(id)}/>

                <div className="flex flex-row justify-center items-center">
                    <button onClick={submit}
                            className="px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">Vybrat
                    </button>
                    <button onClick={onClose}
                            className="ml-5 px-10 py-4 bg-gray-400 text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">Zrušit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QueueEditorModal;
