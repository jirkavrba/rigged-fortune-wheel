import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {AppContext, Entry} from "../App";
import PriceList from "./PriceList";
import PriceModal from "./PriceModal";

const renderWheel = (canvas: HTMLCanvasElement, entries: Array<Entry>): void => {
    const size = 512;
    const center = size / 2;

    canvas.width = size;
    canvas.height = size;

    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
    const step = (2 * Math.PI / entries.length);

        // Draw segments
    entries.map((entry, i) => {
        context.beginPath();
        context.moveTo(center, center);
        context.arc(center, center, center, i * step, (i + 1) * step);
        context.fillStyle = entry.color;
        context.fill();
    });

    // Draw the inner circle (to make the wheel look hollow)
    context.beginPath();
    context.arc(center, center, center * 0.3, 0, 2 * Math.PI);
    context.fillStyle = "#ffffff";
    context.fill();
}

const Wheel: FC = () => {
    const state = useContext(AppContext);
    const [angle, setAngle] = useState<number>(0);
    const [selected, setSelected] = useState<Entry | null>(null);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [modalShown, setModalShown] = useState<boolean>(false);

    const canvas = React.createRef<HTMLCanvasElement>();
    const spin = async () => {
        const price: Entry = await fetch("/api/v1/wheel/spin", {method: "POST"}).then(response => response.json());

        const index =  state.entries.findIndex(e => e.id == price.id);
        const spins = angle > 0 ? 10 : -10;

        const step = 360 / state.entries.length;
        const rotation = -(index * step + (step / 2) + 360 * spins);

        setAngle(rotation);
        setSelected(price);
        setSpinning(true);

        if (canvas.current != null) {
            canvas.current.style.transition = "all 5s cubic-bezier(0.5, 0, 0.75, 1)";
            canvas.current.style.transform = `rotate(${rotation}deg)`;
        }

        setTimeout(() => { setSpinning(false); }, 5000);
        setTimeout(() => { setModalShown(true); }, 5500);
    }

    useEffect(() => {
        renderWheel(canvas.current!, state.entries);
        canvas.current!.style.transform = `rotate(${angle}deg)`;
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-between transition filter">
                <div className="flex flex-row items-center justify-around">
                    <PriceList />

                    <div className={`ml-20 relative transition transform ${spinning ? 'scale-75' : 'scale-100'}`}>
                        <canvas ref={canvas} className="transform transition w-128 h-128"/>
                        <button onClick={spin} className={`absolute w-full h-full lack left-0 top-0 text-gray-500 uppercase tracking-wide font-black transition transform
                        ring-8 ring-white shadow-2xl rounded-full ${spinning ? 'text-gray-400' : 'hover:text-black'}`} disabled={spinning}>
                            {spinning ? '...' : 'Zatočit'}
                        </button>
                    </div>

                    <div className="text-6xl ml-5 animate-pulse">👈</div>
                </div>
            </div>
            <PriceModal active={modalShown} title={selected?.title} description={selected?.description} onClose={() => setModalShown(false)} />
        </>
    );
}

export default Wheel;