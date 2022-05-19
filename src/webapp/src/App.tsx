import React, {useEffect, useState} from 'react';
import Wheel from "./components/Wheel";
import Loader from "./components/Loader";

export interface Entry {
    id: string,
    title: string,
    description: string,
    color: string
}

export interface AppContextState {
    entries: Array<Entry>,
}

const initialState = {
    entries: [],
};

export const AppContext = React.createContext<AppContextState>(initialState);

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<AppContextState>(initialState);

    const fetchEntries = async (): Promise<Array<Entry>> => {
        return await fetch("/api/v1/wheel/entries").then(response => response.json());
    }

    useEffect(() => {
        fetchEntries().then(entries => {
            setState(current => ({...current, entries}));
            setLoading(false);
        });
    },[]);

    return (
        <div className="App">
            <h1 className="text-4xl font-black text-center mt-10 mb-20">Kolo štěstí</h1>
            {
                loading
                ? <Loader/>
                : (
                    <AppContext.Provider value={state}>
                        <Wheel/>
                    </AppContext.Provider>
                )
            }
        </div>
    );
}

export default App;
