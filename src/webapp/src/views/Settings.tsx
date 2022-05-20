import {FC, useContext} from "react";
import {Link} from "react-router-dom";
import PriceEditor from "../components/PriceEditor";
import {AppContext} from "../App";

interface SettingsProps {
    onChange?: () => void
}

const Settings: FC<SettingsProps> = ({onChange}: SettingsProps) => {
    const context = useContext(AppContext);

    return (
        <div className="flex flex-col items-stretch justify-center">
            <h1 className="text-6xl font-black text-zinc-500 text-center mb-10">Nastavení</h1>

            <div className="flex flex-col items-center justify-around">
                <PriceEditor entries={context.entries} onChange={onChange}/>
            </div>

            <Link to="/" className="self-center mt-10 px-10 py-4 bg-black text-white uppercase font-black tracking-wide rounded-xl shadow-xl transition transform hover:scale-95">
                Zavřít
            </Link>
        </div>
    )
}

export default Settings;