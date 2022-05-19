import {FC, useContext} from "react";
import {AppContext, Entry} from "../App";

const PriceList: FC = () => {
    const {entries} = useContext(AppContext);

    return (
        <div className="bg-white p-5 rounded-2xl shadow-lg">
            <ul>
                { entries.map(
                    entry =>
                        <li className="flex flex-row items-center p-5 bg-gray-100 rounded-xl my-5">
                            <div className="w-5 h-5 rounded-full mr-5" style={{ backgroundColor: entry.color }}></div>
                            <div className="font-black">{entry.title}</div>
                        </li>
                ) }
            </ul>
        </div>
    );
}

export default PriceList;