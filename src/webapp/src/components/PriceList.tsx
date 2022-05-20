import {FC, useContext} from "react";
import {AppContext} from "../App";
import Price from "./Price";

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
            {entries.map(entry =>
                <Price key={entry.id} selected={selected === entry.id} title={entry.title} color={entry.color} onClick={() => select(entry.id)} />
            )}
        </div>
    );
}

export default PriceList;