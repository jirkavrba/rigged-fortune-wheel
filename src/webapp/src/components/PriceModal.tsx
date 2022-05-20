import {FC} from "react";

interface PriceModalProps {
    active?: boolean,
    title: string | undefined,
    description: string | undefined,
    onClose: () => void
}

const PriceModal: FC<PriceModalProps> = ({active = false, title, description, onClose}: PriceModalProps) => {

    return (
        <div
            className={`transition w-screen h-screen fixed bg-black bg-opacity-50 top-0 left-0 flex flex-row items-center justify-center ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div
                className={`relative transition duration-500 p-10 bg-white shadow-2xl rounded-2xl text-center w-1/3 transform ${active ? 'translate-y-0' : 'translate-y-20'}`}>
                <h1 className="text-5xl font-black mt-10 mb-2">{title}</h1>
                <h2 className="text-2xl font-bold text-stone-500 mb-10">{description}</h2>

                <button onClick={onClose}
                        className="px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">Zavřít
                </button>
            </div>
        </div>
    )

}

export default PriceModal;