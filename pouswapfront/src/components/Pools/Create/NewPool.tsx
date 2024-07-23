import { tokens } from "../../../utils/asset/tokens";
import React, { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import TokenPopup from "../../Popup/TokenPopup";
import { TokenInterface } from "../../../interfaces/Tokens";
import { FactoryContext } from "../../../utils/hooks/Factory";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { SimpleTokensContext } from "../../../utils/hooks/SimpleTokens";
import { ethers } from "ethers";
import Token from "../../../services/Tokens";
import { useLocation } from "react-router-dom";
import Loader from "../../Loading/Loading";

const NewPool = () => {
    const [scope, animate] = useAnimate();
    const [loading, setLoading] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);

    const [size, setSize] = useState({ columns: 0, rows: 0 });

    const [pairAddress, setPairAddress] = useState<string | null>(null);
    const [token1, setToken1] = useState<TokenInterface | null>(null);
    const [amount1, setAmount1] = useState<number>(0);
    const [token2, setToken2] = useState<TokenInterface | null>(null);
    const [amount2, setAmount2] = useState<number>(0);
    const [shows, setShows] = useState<boolean[]>([false, false]);

    const { isConnected, address } = useWeb3ModalAccount();
    const { getBalance, approve } = useContext(SimpleTokensContext);
    const [balance1, setBalance1] = useState<string>("0");
    const [balance2, setBalance2] = useState<string>("0");

    const context = useContext(FactoryContext);
    const { createPool, addLiquidity, removeLiquidity, getAllPools, getPairAddress, bToDeposite } = context!;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        async function fetchData() {
            if (searchParams.get("tokenA")) {
                const tokenA = await new Token().getByAddress(searchParams.get("tokenA")!);
                setToken1(tokenA);
            }
            if (searchParams.get("tokenB")) {
                const tokenB = await new Token().getByAddress(searchParams.get("tokenB")!);
                setToken2(tokenB);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (token1) {
                const balanceToken1 = await getBalance(token1?.address!, address!);
                setBalance1(parseFloat(ethers.formatEther(balanceToken1.toString())).toFixed(2));
            }
            if (token2) {
                const balanceToken2 = await getBalance(token2?.address!, address!);
                setBalance2(parseFloat(ethers.formatEther(balanceToken2.toString())).toFixed(2));
            }
            if (token1 && token2) {
                const pairAddress = await getPairAddress(token1?.address!, token2?.address!);
                setPairAddress(pairAddress);
            }
        }
        if (isConnected) {
            fetchData();
        }
    }, [token1, token2, isConnected]);

    async function calculateAmoutB(amountA: number) {
        if (pairAddress) {
            const amountB = await bToDeposite(amountA, pairAddress);
            setAmount2(amountB);
        }
    }

    async function addPool() {
        if (amount1 === 0 || amount2 === 0) return;
        setLoading(true);
        let tx = await approve(token1?.address!, ethers.parseEther(amount1.toString()), process.env.REACT_APP_FACTORY_ADDRESS!);
        if (!tx) { setLoading(false); return }
        tx = await approve(token2?.address!, ethers.parseEther(amount2.toString()), process.env.REACT_APP_FACTORY_ADDRESS!);
        if (!tx) { setLoading(false); return }
        const poolTx = await createPool({ token1: token1?.address!, token2: token2?.address!, amount1: ethers.parseEther(amount1.toString()), amount2: ethers.parseEther(amount2.toString()) });
        if (!poolTx) { setLoading(false); return }
        const pools = await getAllPools();
        const length = pools[0].length - 1;
        new Token().update(token1?.ID!, token1?.name!, token1?.symbole!, token1?.address!, token1?.logo!, token1?.price!, pools[0][length], token1?.trades!);
        new Token().update(token2?.ID!, token2?.name!, token2?.symbole!, token2?.address!, token2?.logo!, token2?.price!, pools[0][length], token2?.trades!);
        setLoading(false);
    }

    async function addLiq() {
        if (amount1 === 0 || amount2 === 0) return;
        setLoading(true);
        let tx = await approve(token1?.address!, ethers.parseEther(amount1.toString()), pairAddress!);
        if (!tx) { setLoading(false); return }
        tx = await approve(token2?.address!, ethers.parseEther(amount2.toString()), pairAddress!);
        if (!tx) { setLoading(false); return }
        await addLiquidity({ poolAddress: pairAddress!, amount1: ethers.parseEther(amount1.toString()), amount2: ethers.parseEther(amount2.toString()) });
        setLoading(false);
    }

    async function removeLiq() {
        if (amount1 === 0 || amount2 === 0) return;
        setLoading(true);
        await removeLiquidity({ poolAddress: pairAddress!, amount1: ethers.parseEther(amount1.toString()), amount2: ethers.parseEther(amount2.toString()) });
        setLoading(false);
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
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-12">
                <div className="pointer-events-auto w-full md:w-1/3 bg-colors-white2/70 border border-colors-gray2 p-4 rounded-lg relative z-20">
                    <h1 className="text-2xl font-bold mb-4 text-center text-colors-green1">Add liquidity to a pool</h1>
                    <div className='grid grid-cols-2 gap-2 mb-4'>
                        <div>
                            <label className="text-colors-black2 text-sm font-medium">Token 1</label>
                            <button className="w-full p-2 rounded-lg border border-colors-gray2 bg-white text-left flex items-center justify-between" onClick={() => setShows([true, false])}>
                                {token1 ? `${token1.name} (${token1.symbole})` : "Select token"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                            </button>
                        </div>
                        <div>
                            <label className="text-colors-black2 text-sm font-medium">Token 2</label>
                            <button className="w-full p-2 rounded-lg border border-colors-gray2 bg-white text-left flex items-center justify-between" onClick={() => setShows([false, true])}>
                                {token2 ? `${token2.name} (${token2.symbole})` : "Select token"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                            </button>
                        </div>
                    </div>
                    <label className="text-colors-black2 font-medium">Deposit amount</label>
                    <div className='mt-2 bg-colors-white2 border-colors-gray2 border rounded-lg flex items-start justify-between p-4 w-full'>
                        <div>
                            <input type="number" placeholder="0"
                                className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none'
                                onChange={(e) => {
                                    if (pairAddress && !isNaN(parseFloat(e.target.value))) {
                                        calculateAmoutB(parseFloat(e.target.value));
                                    }
                                    setAmount1(parseFloat(e.target.value))
                                }}
                                value={amount1}
                            />
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className='flex items-center justify-around min-w-20 bg-white text-colors-black1 border border-colors-gray2 rounded-2xl pl-1 pr-2 py-0.5'>
                                <img src={`https://ipfs.io/ipfs/${token1?.logo}`} alt="" className="w-8 h-8 rounded-full" />
                                <p className="font-semibold text-lg">{token1?.symbole}</p>
                            </div>
                            <div className='flex items-center gap-1 mt-2'>
                                <p className="text-colors-black2 text-xs whitespace-nowrap">Balance: {balance1} {token1?.symbole}</p>
                                <button
                                    onClick={() => { setAmount1(parseFloat(balance1)) }}
                                    className='font-medium text-colors-white2 bg-colors-green1 rounded-xl px-2 py-1 text-xs whitespace-nowrap'
                                >Max</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 bg-colors-white2 border-colors-gray2 border rounded-lg flex items-start justify-between p-4 w-full'>
                        <div>
                            <input disabled={pairAddress !== null} type="number" placeholder="0" className='bg-transparent w-full focus:outline-none focus:ring-0 text-colors-black2 text-4xl appearance-none'
                                onChange={(e) => {
                                    setAmount2(parseFloat(e.target.value))
                                }}
                                value={amount2}
                            />
                        </div>
                        <div className='flex flex-col items-end'>
                            <div className='flex items-center justify-around min-w-20 bg-white text-colors-black1 border border-colors-gray2 rounded-2xl pl-1 pr-2 py-0.5'>
                                <img src={`https://ipfs.io/ipfs/${token2?.logo}`} alt="" className="w-8 h-8 rounded-full" />
                                <p className="font-semibold text-lg">{token2?.symbole}</p>
                            </div>
                            <div className='flex items-center gap-1 mt-2'>
                                <p className="text-colors-black2 text-xs whitespace-nowrap">Balance: {balance2} {token2?.symbole}</p>
                                <button
                                    onClick={() => setAmount2(parseFloat(balance2))}
                                    className='font-medium text-colors-white2 bg-colors-green1 rounded-xl px-2 py-1 text-xs whitespace-nowrap'
                                >Max</button>
                            </div>
                        </div>
                    </div>
                    <p className="text-colors-black1 font-semibold mt-1 ml-2">
                        {
                            isNaN(amount1 / amount2) || amount1 / amount2 === Infinity ? "0" : (amount1 / amount2).toFixed(2)
                        }
                    </p>
                    <p className="text-colors-black2 text-sm font-medium ml-2">{token1?.symbole} per {token2?.symbole}</p>
                    <input type="checkbox" disabled={!pairAddress} className="mt-2 cursor-pointer" id="checkbox" onChange={() => setRemove(!remove)} />
                    <label className="text-colors-black2 text-sm font-medium pl-1 cursor-pointer" htmlFor="checkbox">Remove liquidity</label>
                    <button
                        onClick={pairAddress ? (remove ? removeLiq : addLiq) : addPool}
                        disabled={token1?.address === token2?.address || !token1 || !token2 || !isConnected || amount1 === 0 || amount2 === 0}
                        className="w-full bg-colors-green1 text-colors-white2 rounded-lg p-2 mt-4">
                        {
                            loading ?
                                "Loading..." :
                                pairAddress ?
                                    remove ?
                                        "Remove liquidity"
                                        :
                                        "Add liquidity"
                                    :
                                    "Create pool"
                        }
                    </button>
                </div>
            </div>
            {loading && <Loader />}
        </div >
    );
}

export default NewPool;