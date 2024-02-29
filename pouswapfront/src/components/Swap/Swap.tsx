import "./Swap.scss";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { tokens } from "../../utils/asset/tokens";

const Swap = () => {
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
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="pointer-events-auto w-full md:w-1/3 bg-colors-white2/70 border border-colors-gray2 p-4 rounded-lg relative z-20">
                    <h1 className="text-colors-green1 text-xl font-bold">Swap</h1>
                    <div className='flex relative flex-col'>
                        <button className='mt-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-colors-green1 rounded-lg border-4 border-colors-white2 w-8 h-8 flex items-center justify-center'>
                            <svg className='w-4 h-4 rotate-90 text-colors-white1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" /></svg>
                        </button>
                        <div className='mt-2 bg-colors-gray2 rounded-lg flex items-start justify-between p-4 w-full h-24'>
                            <div className='flex flex-col items-start w-3/4'>
                                <input type="number" placeholder="0" className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                                {/* {ethPrice &&
                                <p className="text-white text-xs whitespace-nowrap">${ethToSwap * ethPrice}</p>
                            } */}
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center bg-colors-green1 text-colors-white1 rounded-full pl-1 pr-2 py-0.5'>
                                    <img src={tokens[0]} alt="" className="w-5 h-5" />
                                    <p className="pl-1 pr-2 font-semibold">ETH</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </div>
                                <div className='flex mt-1'>
                                    {/* {signer &&
                                    <p className="text-white text-xs whitespace-nowrap">Balance: {ethBalance} ETH</p>
                                } */}
                                    <button className='font-bold text-colors-orange text-xs whitespace-nowrap'>Max</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 bg-colors-gray2 rounded-lg flex items-start justify-between p-4 w-full h-24'>
                            <div className='flex flex-col items-start w-3/4'>
                                <input type="number" placeholder="0" className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center bg-colors-green1 text-colors-white1 rounded-full pl-1 pr-2 py-0.5'>
                                    <img src={tokens[1]} alt="" className="w-5 h-5 rounded-full" />
                                    <p className="text-white pl-1 font-semibold">POU</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </div>
                                <div className='flex mt-1'>
                                    {/* {signer &&
                                    <p className="text-white text-xs whitespace-nowrap">Balance: {pouBalance} {pouSymbol}</p>
                                } */}
                                    <button className='font-bold text-colors-orange text-xs whitespace-nowrap'>Max</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-colors-green1 rounded-lg w-full h-12 mt-4 text-white font-semibold'>
                        Swap
                    </button>
                    {/* {haveInvested && ( */}
                    <p className='w-full text-center text-colors-black2 underline hover:no-underline'>
                        <a target="_blank" rel="noreferrer" href={`https://sepolia.etherscan.io/tx/`}> Check your transaction on-Chain </a>
                    </p>
                    {/* )} */}
                </div>
            </div>

        </div>
    );
}

export default Swap;