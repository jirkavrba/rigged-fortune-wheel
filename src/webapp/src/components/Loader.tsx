import {FC} from "react";


const Loader: FC = () => (
    <div className="z-100 fixed w-screen h-screen left-0 top-0 bg-white">
        <div className="flex w-screen h-screen items-center justify-center">
            <span className="text-5xl font-black">Načítání...</span>
        </div>
    </div>
)


export default Loader;