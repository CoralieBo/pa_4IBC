import { tokens } from "../../../utils/asset/tokens";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";

const NewPool = () => {
    const [scope, animate] = useAnimate();

    const [size, setSize] = useState({ columns: 0, rows: 0 });

    // const [token1, setToken1] = useState<string>("ETH");
    // const [token2, setToken2] = useState<string>("POU");

    useEffect(() => {
        generateGridCount();
        window.addEventListener("resize", generateGridCount);

        return () => window.removeEventListener("resize", generateGridCount);
    }, []);

    const generateGridCount = () => {
        const columns = Math.floor(document.body.clientWidth / 75);
        const rows = Math.floor(document.body.clientHeight / 75);

        setSize({
            columns,
            rows,
        });
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
        // @ts-ignore
        const id = `#${e.target.id}`;
        animate(id, { background: "#DDDDDD" }, { duration: 1.5 });
    };

    const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
        // @ts-ignore
        const id = `#${e.target.id}`;
        animate(id, { background: "#B7B78A" }, { duration: 0.15 });
    };


    return (
        <div className="bg-colors-gray1">
            <div
                ref={scope}
                className="grid h-screen w-full grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
            >
                {[...Array(size.rows * size.columns)].map((_, i) => (
                    <div
                        key={i}
                        id={`square-${i}`}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        className="h-full w-full border-[1px] border-colors-gray2"
                    />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-12">
                <div className="pointer-events-auto w-full md:w-1/3 bg-colors-white2/70 border border-colors-gray2 p-4 rounded-lg relative z-20">
                    <h1 className="text-2xl font-bold mb-4 text-center text-colors-green1">Create a new pool</h1>
                    <div className='grid grid-cols-2 gap-2 mb-4'>
                        <div>
                            <label className="text-colors-black2 text-sm font-medium">Token 1</label>
                            <select className="w-full p-2 rounded-lg border border-colors-gray2">
                                <option disabled selected>Select token</option>
                                <option value="ETH">ETH</option>
                                <option value="POU">POU</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-colors-black2 text-sm font-medium">Token 2</label>
                            <select className="w-full p-2 rounded-lg border border-colors-gray2">
                                <option disabled selected>Select token</option>
                                <option value="ETH">ETH</option>
                                <option value="POU">POU</option>
                            </select>
                        </div>
                    </div>
                    <label className="text-colors-black2 font-medium">Deposit amount</label>
                    <div className='mt-2 bg-colors-white2 border-colors-gray2 border rounded-lg flex items-start justify-between p-4 w-full'>
                        <div className='flex flex-col items-start w-3/4'>
                            <input type="number" placeholder="0" className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                            {/* {ethPrice &&
                                <p className="text-white text-xs whitespace-nowrap">${ethToSwap * ethPrice}</p>
                            } */}
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className='flex items-center bg-white text-colors-black1 border border-colors-gray2 rounded-2xl pl-1 pr-2 py-0.5'>
                                <img src={tokens[4]} alt="" className="w-8 h-8" />
                                <p className="font-semibold text-lg">ETH</p>
                            </div>
                            <div className='flex items-center gap-1 mt-2'>
                                {/* {signer && */}
                                <p className="text-colors-black2 text-xs whitespace-nowrap">Balance: {1} ETH</p>
                                {/* } */}
                                <button className='font-medium text-colors-white2 bg-colors-green1 rounded-xl px-2 py-1 text-xs whitespace-nowrap'>Max</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 bg-colors-white2 border-colors-gray2 border rounded-lg flex items-start justify-between p-4 w-full'>
                        <div className='flex flex-col items-start w-3/4'>
                            <input type="number" placeholder="0" className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                            {/* {ethPrice &&
                                <p className="text-white text-xs whitespace-nowrap">${ethToSwap * ethPrice}</p>
                            } */}
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className='flex items-center bg-white text-colors-black1 border border-colors-gray2 rounded-2xl pl-1 pr-2 py-0.5'>
                                <img src={tokens[7]} alt="" className="w-8 h-8" />
                                <p className="font-semibold text-lg">POU</p>
                            </div>
                            <div className='flex items-center gap-1 mt-2'>
                                {/* {signer && */}
                                <p className="text-colors-black2 text-xs whitespace-nowrap">Balance: {77} POU</p>
                                {/* } */}
                                <button className='font-medium text-colors-white2 bg-colors-green1 rounded-xl px-2 py-1 text-xs whitespace-nowrap'>Max</button>
                            </div>
                        </div>
                    </div>
                    <p className="text-colors-black1 font-semibold mt-1 ml-2">0</p>
                    <p className="text-colors-black2 text-sm font-medium ml-2">POU per ETH</p>
                </div>
            </div>
        </div>
    );
}

export default NewPool;