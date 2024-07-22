import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import "./Pools.scss";
import { PoolInterface } from "../../interfaces/Pools";
import { Link } from "react-router-dom";
import PoolService from "../../services/Pools";
import { FactoryContext } from "../../utils/hooks/Factory";
import Token from "../../services/Tokens";
// import money from "../../utils/asset/images/money.png";

const Pools = () => {
    const [pools, setPools] = useState<PoolInterface[]>([]);

    const context = useContext(FactoryContext);
    const { getAllPools, getSupplyA, getSupplyB } = context!;

    useEffect(() => {
        const fetchPools = async () => {
            const datas = await getAllPools();
            const pools: PoolInterface[] = [];
            for (let i = 0; i < datas[0].length; i++) {
                const token1 = await new Token().getByAddress(datas[1][i][0]);
                const token2 = await new Token().getByAddress(datas[1][i][1]);
                const supply1 = await getSupplyA(datas[0][i]);
                const supply2 = await getSupplyB(datas[0][i]);
                pools.push({
                    address: datas[0][i],
                    token1: token1,
                    token2: token2,
                    supply1: supply1,
                    supply2: supply2
                });
            }
            setPools(pools);
        };

        fetchPools();
    }, []);

    return (
        <div className="w-full min-h-screen pt-24">
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold p-4 text-colors-green1">All pools</h1>
                    <Link to={"/Create"} className="bg-colors-green1 text-white font-medium text-sm px-3 py-2 mr-4 rounded-lg">+ New position</Link>
                </div>
                <table className="w-full bg-colors-white2 overflow-hidden shadow-lg rounded-lg">
                    <thead className="bg-colors-gray2">
                        <tr className="border-b-[1px] border-colors-gray1 text-colors-black2 text-sm uppercase">
                            <th className="pl-4 w-8">#</th>
                            <th className="text-start p-4 font-medium">Pool</th>
                            <th className="text-start p-4 font-medium">Address</th>
                            <th className="text-start p-4 font-medium">Supply_A</th>
                            <th className="text-start p-4 font-medium">Supply_B</th>
                            <th className="text-start p-4 font-medium"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {pools.map((pool, index) => {
                            return (
                                <>
                                    <TableRows
                                        key={index}
                                        pool={pool}
                                    />
                                    <motion.tr
                                        layoutId={`row-${pool.address}`}
                                        className="text-sm bg-colors-gray1 hidden relative "
                                        id={`details${pool.address}`}>
                                        <td></td>
                                        <td className="font-medium text-center absolute left-48 py-4">
                                            Rewards: <br />
                                            <span className="font-normal">0.01 tst1 / 0.032 tst2</span>
                                        </td>
                                        <td className="text-center py-4">
                                            <button className="bg-colors-green1 text-white font-medium text-sm px-3 py-2 mr-4 rounded-lg">
                                                Claim
                                            </button>
                                        </td>
                                        <td className="font-medium text-center absolute right-72 py-4">
                                            Liquidity : <br />
                                            <span className="font-normal">0.01 tst1 / 0.032 tst2</span>
                                        </td>
                                        <td className="text-center py-4">
                                            <Link to={`/Create?tokenA=${pool.token1.address}&tokenB=${pool.token2.address}`}
                                                className="bg-colors-green1 text-white font-medium text-sm px-3 py-2 mr-4 rounded-lg">
                                                Add liq
                                            </Link>
                                        </td>
                                        <td></td>
                                    </motion.tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* <div className="absolute w-44 rotate-12 top-28 right-44 drop-shadow-lg">
                <img src={money} alt="money.png" />
            </div> */}
        </div>
    );
};

interface TableRowsProps {
    pool: PoolInterface;
}

const TableRows = ({ pool }: TableRowsProps) => {

    return (
        <motion.tr
            id={`row-${pool.address}`}
            className="text-sm cursor-pointer hover:bg-colors-gray1"
            onClick={() => {
                const details = document.getElementById(`details${pool.address}`);
                if (details) details.classList.toggle("hidden");
                const row = document.getElementById(`row-${pool.address}`);
                if (row) row.classList.toggle("bg-colors-gray1");
                const action = document.getElementById(`action${pool.address}`);
                if (action) action.classList.toggle("rotate-180");
            }}
        >
            <td className="pl-4 w-8 text-colors-black2">
                {/* {pool.id} */}
            </td>

            <td className="p-4 flex items-center gap-3">
                <div className="grid grid-cols-2">
                    <img
                        src={`https://ipfs.io/ipfs/${pool.token1.logo}`}
                        alt="pool logo"
                        className="w-6 h-6 rounded-full object-cover object-top shrink-0 -mb-2"
                    />
                    <div />
                    <div />
                    <img
                        src={`https://ipfs.io/ipfs/${pool.token2.logo}`}
                        alt="pool logo"
                        className="w-6 h-6 rounded-full object-cover object-top shrink-0 -ml-2"
                    />
                </div>
                <div>
                    {/* <Link to={`/Pools/${pool.address}`} className="block mb-1 font-medium hover:underline"> */}
                    <p className="mb-1 font-medium">
                        {pool.token1.symbole} / {pool.token2.symbole}
                    </p>
                    {/* </Link> */}
                </div>
            </td>

            <td className="p-4">
                <span>
                    {pool.address.slice(0, 5)}...{pool.address.slice(-5)}
                </span>
            </td>

            <td className="p-4">
                <span>
                    {pool.supply1?.toFixed(2)} {pool.token1.symbole.toUpperCase()}
                </span>
            </td>

            <td className="p-4">
                <span>
                    {pool.supply2?.toFixed(2)} {pool.token2.symbole.toUpperCase()}
                </span>
            </td>

            <td className="text-center">
                <svg className="mx-5" id={`action${pool.address}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
            </td>
        </motion.tr>
    );
};

export default Pools;