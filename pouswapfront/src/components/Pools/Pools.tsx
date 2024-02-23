import { motion } from "framer-motion";
import { useState } from "react";
// import { FiAward, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Pools = () => {
    const [pools] = useState(poolData);

    return (
        <div className="w-full min-h-screen pt-24">
            <div className="w-full max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold p-4 text-colors-green1">All pools</h1>
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="border-b-[1px] border-colors-gray1 text-colors-black2 text-sm uppercase">
                            <th className="pl-4 w-8">#</th>
                            <th className="text-start p-4 font-medium">Pool</th>
                            <th className="text-start p-4 font-medium">TVL</th>
                            <th className="text-start p-4 font-medium">Volume 24H</th>
                            <th className="text-start p-4 font-medium">Volume 7D</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pools.map((pool) => {
                            return (
                                <TableRows
                                    key={pool.id}
                                    pool={pool}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface TableRowsProps {
    pool: Pool;
}

const TableRows = ({ pool }: TableRowsProps) => {

    return (
        <motion.tr
            layoutId={`row-${pool.id}`}
            className="text-sm border-b border-colors-white2 hover:bg-colors-white2 transition-all ease-in-out duration-100"
        >
            <td className="pl-4 w-8 text-colors-black2">
                {pool.id}
            </td>

            <td className="p-4 flex items-center gap-3">
                <div className="grid grid-cols-2">
                    <img
                        src={pool.logoURL1}
                        alt="pool logo"
                        className="w-6 h-6 rounded-full object-cover object-top shrink-0 -mb-2"
                    />
                    <div />
                    <div />
                    <img
                        src={pool.logoURL2}
                        alt="pool logo"
                        className="w-6 h-6 rounded-full object-cover object-top shrink-0 -ml-2"
                    />
                </div>
                <div>
                    <span className="block mb-1 font-medium">{pool.token1} / {pool.token2}</span>
                </div>
            </td>

            <td className="p-4">
                <span>
                    ${pool.tvl.toLocaleString("en-US", {})}
                </span>
            </td>

            <td className="p-4">
                <span>
                    ${pool.volume24h.toLocaleString("en-US", {})}
                </span>
            </td>

            <td className="p-4">
                <span>
                    ${pool.volume7d.toLocaleString("en-US", {})}
                </span>
            </td>
        </motion.tr>
    );
};

export default Pools;

interface Pool {
    id: number;
    token1: string;
    token2: string;
    logoURL1: string;
    logoURL2: string;
    tvl: number;
    volume24h: number;
    volume7d: number;
}

const poolData: Pool[] = [
    {
        id: 1,
        token1: "BTC",
        token2: "ETH",
        logoURL1: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        logoURL2: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        tvl: 1000000000,
        volume24h: 100000000,
        volume7d: 500000000,
    },
    {
        id: 2,
        token1: "BTC",
        token2: "BNB",
        logoURL1: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        logoURL2: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        tvl: 500000000,
        volume24h: 50000000,
        volume7d: 250000000,
    },
    {
        id: 3,
        token1: "ETH",
        token2: "BNB",
        logoURL1: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        logoURL2: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        tvl: 100000000,
        volume24h: 10000000,
        volume7d: 50000000,
    },
];