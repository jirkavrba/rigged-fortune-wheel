import {FC} from "react";

interface PriceProps {
    title: string,
    color: string,
    selected?: boolean,
    onClick?: () => void
}

const Price: FC<PriceProps> = ({title, color, selected = false, onClick = undefined}: PriceProps) => {
    return (
        <li className={`flex flex-row items-center p-5 bg-white rounded-xl my-5 border cursor-pointer transition transform ${selected ? 'text-black ring-4 ring-black text-black scale-105 shadow-xl' : 'text-gray-600'}`}
            onClick={onClick}>
            <div className="w-8 h-8 rounded-full mr-5" style={{backgroundColor: color}}></div>
            <div className="font-black">{title}</div>
        </li>
    )
}

export default Price;