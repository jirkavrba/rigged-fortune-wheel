import {FC, useContext} from "react";
import {Link} from "react-router-dom";
import PriceEditor from "../components/PriceEditor";
import {AppContext} from "../App";
import QueueEditor from "../components/QueueEditor";

interface SettingsProps {
    onChange: () => void
}

const Settings: FC<SettingsProps> = ({onChange}: SettingsProps) => {
    const context = useContext(AppContext);

    return (
        <div className="flex flex-col items-stretch justify-center">
            <div className="flex flex-row items-start justify-around">
                <div className="flex-1 p-5">
                    <PriceEditor entries={context.entries} onChange={onChange}/>
                </div>
                <div className="flex-1 p-5">
                    <QueueEditor entries={context.entries}/>
                </div>
            </div>

            <Link to="/"
                  className="block self-center mt-10 px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">
                Zavřít
            </Link>
        </div>
    )
}

export default Settings;