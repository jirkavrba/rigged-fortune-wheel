import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import Wheel from "./views/Wheel";
import Loader from "./components/Loader";
import Settings from "./views/Settings";

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

    const updateEntries = () => {
        setLoading(true);

        fetch("/api/v1/wheel/entries")
            .then(response => response.json())
            .then(entries => setState(current => ({...current, entries})))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        updateEntries();
    }, []);

    return (
        <div className="App">
            <h1 className="text-4xl font-black text-center mt-10 mb-20">Kolo štěstí</h1>
            {
                loading
                    ? <Loader/>
                    : (
                        <AppContext.Provider value={state}>
                            <HashRouter>
                                <Routes>
                                    <Route index element={<Wheel/>}/>
                                    <Route path="/settings" element={<Settings onChange={updateEntries}/>}/>
                                </Routes>
                            </HashRouter>
                        </AppContext.Provider>
                    )
            }
        </div>
    );
}

export default App;
