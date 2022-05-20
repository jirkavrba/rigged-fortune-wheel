import {FC, useContext} from "react";
import {AppContext} from "../App";

interface PriceListProps {
    onSelect?: (id: string) => void,
    selected?: string
}

const PriceList: FC<PriceListProps> = ({onSelect, selected}) => {
    const {entries} = useContext(AppContext);
    const select = (id: string) => {
        if (onSelect != null) {
            onSelect(id);
        }
    }

    return (
        <div className="p-5">
            <ul>
                { entries.map(
                    (entry, i) =>
                        <li className={`flex flex-row items-center p-5 bg-white rounded-xl my-5 border cursor-pointer transition transform ${selected === entry.id ? 'text-black ring-4 ring-black text-black scale-105 shadow-xl' : 'text-gray-600'}`} key={i} onClick={() => select(entry.id)}>
                            <div className="w-8 h-8 rounded-full mr-5" style={{ backgroundColor: entry.color }}></div>
                            <div className="font-black">{entry.title}</div>
                        </li>
                ) }
            </ul>
        </div>
    );
}

export default PriceList;