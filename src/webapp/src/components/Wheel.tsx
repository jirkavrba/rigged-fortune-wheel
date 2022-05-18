import React, {FC, useContext, useState} from "react";
import {AppContext, AppContextState} from "../App";

const Wheel: FC = () => {
    const state = useContext(AppContext);
    const [spinning, setSpinning] = useState<boolean>(false);

    return (
        <h1>
            { JSON.stringify(state) }
        </h1>
    );
}

export default Wheel;