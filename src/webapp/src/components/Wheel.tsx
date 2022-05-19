import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {AppContext, Entry} from "../App";

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
    context.arc(center, center, center * 0.6, 0, 2 * Math.PI);
    context.fillStyle = "#ffffff";
    context.fill();
}

const Wheel: FC = () => {
    const state = useContext(AppContext);
    const [angle, setAngle] = useState<number>(0.0);
    const [selected, setSelected] = useState<Entry | null>(null);
    const [spinning, setSpinning] = useState<boolean>(false);

    const canvas = React.createRef<HTMLCanvasElement>();
    const spin = async () => {
        const price: Entry = await fetch("/api/v1/wheel/spin", {method: "POST"}).then(response => response.json());

        const index =  state.entries.findIndex(e => e.id == price.id);
        const spins = Math.abs(angle) > 360 ? 0 : 5;

        const step = 360 / state.entries.length;
        const rotation = -(index * step + (step / 2) + 360 * spins);

        setAngle(rotation);
        setSelected(price);
        setSpinning(true);

        if (canvas.current != null) {
            canvas.current.style.transition = "all 1.5s";
            canvas.current.style.transform = `rotate(${rotation}deg)`;
        }

        setTimeout(() => { setSpinning(false) }, 1500);
    }

    useEffect(() => { renderWheel(canvas.current!, state.entries); }, []);

    return (
        <>
            { (selected && !spinning) && <h1 className="text-6xl font-black">{ selected.title }</h1> }
            { (selected && !spinning) && <h2 className="text-3xl font-bold">{ selected.description }</h2> }
            <div className="flex flex-row items-center justify-center">
                <canvas ref={canvas} />
                <div className="text-6xl">👈</div>
            </div>
            <button onClick={spin}>Spin</button>
        </>
    );
}

export default Wheel;