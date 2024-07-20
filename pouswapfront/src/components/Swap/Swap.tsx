import "./Swap.scss";
import React, { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { tokens } from "../../utils/asset/tokens";
import TokenPopup from "../Popup/TokenPopup";
import { TokenInterface } from "../../interfaces/Tokens";
import Token from "../../services/Tokens";
import { useLocation } from "react-router-dom";
import { SimpleTokensContext } from "../../utils/hooks/SimpleTokens";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { FactoryContext } from "../../utils/hooks/Factory";
import User from "../../services/User";

const Swap = () => {
    const [scope, animate] = useAnimate();

    const [size, setSize] = useState({ columns: 0, rows: 0 });

    const { address } = useWeb3ModalAccount();
    const { getBalance, approve } = useContext(SimpleTokensContext);
    const context = useContext(FactoryContext);
    const { getPairAddress, swapFrom, getExactToken } = context!;

    const [pairAddress, setPairAddress] = useState<string | null>(null);
    const [token1, setToken1] = useState<TokenInterface | null>(null);
    const [balance1, setBalance1] = useState<string>("0");
    const [amount1, setAmount1] = useState<number>(0);
    const [token2, setToken2] = useState<TokenInterface | null>(null);
    const [balance2, setBalance2] = useState<string>("0");
    const [amount2, setAmount2] = useState<number>(0);
    const [shows, setShows] = useState<boolean[]>([false, false]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        async function fetchData() {
            if (searchParams.get("tokenA")) {
                const tokenA = await new Token().getByAddress(searchParams.get("tokenA")!);
                setToken1(tokenA);
                const balanceA = await getBalance(token1?.address!, address!);
                setBalance1(ethers.formatEther(balanceA.toString()));
            }
            if (searchParams.get("tokenB")) {
                const tokenB = await new Token().getByAddress(searchParams.get("tokenB")!);
                setToken2(tokenB);
                const balanceB = await getBalance(token2?.address!, address!);

                setBalance2(ethers.formatEther(balanceB.toString()));
            }
            if (!searchParams.get("tokenA") && !searchParams.get("tokenB")) {
                const tokens = await new Token().getAll();
                setToken1(tokens[0]);
                setToken2(tokens[1]);
                const balanceA = await getBalance(tokens[0].address, address!);
                setBalance1(ethers.formatEther(balanceA.toString()));
                const balanceB = await getBalance(tokens[1].address, address!);
                setBalance2(ethers.formatEther(balanceB.toString()));
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (token1 && token2) {
                const pair = await getPairAddress(token1.address, token2.address);
                setPairAddress(pair);
            }
        }

        fetchData();
    }, [token1, token2]);

    async function swap() {
        if (!token1 || !token2) return;
        const tx = await approve(token1.address, ethers.parseEther(amount1.toString()), pairAddress!);
        if (!tx) return;
        const swap = await swapFrom({ pairAddress: pairAddress!, amount: ethers.parseEther(amount1.toString()), tokenAddress: token1.address });
        if (swap) {
            const user = await new User().getOneByPublicKey(address!);
            await new User().update(user.public_key, user.signature, user.swap+1, user.role, user.status);
        }
    }

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
            {shows[0] && <TokenPopup setToken={setToken1} close={() => setShows([false, false])} />}
            {shows[1] && <TokenPopup setToken={setToken2} close={() => setShows([false, false])} />}
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
                        <button
                            onClick={() => {
                                const token = token1;
                                setToken1(token2);
                                setToken2(token);
                                const balance = balance1;
                                setBalance1(balance2);
                                setBalance2(balance);
                                const amount = amount1;
                                setAmount1(amount2);
                                setAmount2(amount);
                            }}
                            className='mt-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-colors-green1 rounded-lg border-4 border-colors-white2 w-8 h-8 flex items-center justify-center'>
                            <svg className='w-4 h-4 rotate-90 text-colors-white1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" /></svg>
                        </button>
                        <div className='mt-2 bg-colors-gray2 rounded-lg flex items-start justify-between p-4 w-full h-24'>
                            <div className='flex flex-col items-start w-3/4'>
                                <input type="number" placeholder="0" value={amount1}
                                    onChange={async (e) => {
                                        setAmount1(parseFloat(e.target.value));
                                        if (!pairAddress || isNaN(parseFloat(e.target.value))) return;
                                        const amount = await getExactToken(pairAddress, ethers.parseEther(e.target.value), token1?.address!);
                                        if (amount) {
                                            setAmount2(parseFloat(amount.toFixed(2)));
                                        }
                                    }}
                                    className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                                {/* {ethPrice &&
                                <p className="text-white text-xs whitespace-nowrap">${ethToSwap * ethPrice}</p>
                            } */}
                            </div>
                            <div className='flex flex-col items-end'>
                                <button onClick={() => setShows([true, false])} className='flex items-center bg-colors-green1 text-colors-white1 rounded-full pl-1 pr-2 py-0.5'>
                                    <img src={`https://ipfs.io/ipfs/${token1?.logo}`} alt="" className="w-5 h-5" />
                                    <p className="pl-1 pr-2 font-semibold">{token1?.symbole}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </button>
                                <div className='flex mt-1'>
                                    <p className="text-white text-xs whitespace-nowrap pr-1">Balance: {balance1} {token1?.symbole}</p>
                                    <button onClick={async () => {
                                        setAmount1(parseFloat(balance1))
                                        if (!pairAddress || isNaN(parseFloat(balance1))) return;
                                        const amount = await getExactToken(pairAddress, ethers.parseEther(balance1), token1?.address!);
                                        if (amount) {
                                            setAmount2(parseFloat(amount.toFixed(2)));
                                        }
                                    }}
                                        className='font-bold text-colors-orange text-xs whitespace-nowrap'>Max</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 bg-colors-gray2 rounded-lg flex items-start justify-between p-4 w-full h-24'>
                            <div className='flex flex-col items-start w-3/4'>
                                <input type="number" placeholder="0" value={amount2}
                                    onChange={async (e) => {
                                        setAmount2(parseFloat(e.target.value))
                                        if (!pairAddress || isNaN(parseFloat(e.target.value))) return;
                                        const amount = await getExactToken(pairAddress, ethers.parseEther(e.target.value), token2?.address!);
                                        if (amount) {
                                            setAmount1(parseFloat(amount.toFixed(2)));
                                        }
                                    }}
                                    className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none' />
                            </div>
                            <div className='flex flex-col items-end'>
                                <button onClick={() => setShows([false, true])} className='flex items-center bg-colors-green1 text-colors-white1 rounded-full pl-1 pr-2 py-0.5'>
                                    <img src={`https://ipfs.io/ipfs/${token2?.logo}`} alt="" className="w-5 h-5 rounded-full" />
                                    <p className="text-white pl-1 font-semibold">{token2?.symbole}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </button>
                                <div className='flex mt-1'>
                                    <p className="text-white text-xs whitespace-nowrap pr-1">Balance: {balance2} {token2?.symbole}</p>
                                    <button
                                        onClick={async () => {
                                            setAmount2(parseFloat(balance2))
                                            if (!pairAddress || isNaN(parseFloat(balance2))) return;
                                            const amount = await getExactToken(pairAddress, ethers.parseEther(balance2), token2?.address!);
                                            if (amount) {
                                                setAmount1(parseFloat(amount.toFixed(2)));
                                            }
                                        }}
                                        className='font-bold text-colors-orange text-xs whitespace-nowrap'>Max</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={swap} disabled={!pairAddress} className='bg-colors-green1 rounded-lg w-full h-12 mt-4 text-white font-semibold'>
                        {pairAddress ?
                            "Swap" :
                            "No pair found"
                        }
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