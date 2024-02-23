import { motion } from "framer-motion";
import { useState } from "react";
// import { FiAward, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Tokens = () => {
  const [tokens] = useState(tokenData);

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold p-4 text-colors-green1">All tokens</h1>
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="border-b-[1px] border-colors-gray1 text-colors-black2 text-sm uppercase">
              <th className="pl-4 w-8">#</th>
              <th className="text-start p-4 font-medium">Token name</th>
              <th className="text-start p-4 font-medium">Price</th>
              <th className="text-start p-4 font-medium">TVL</th>
              <th className="text-start p-4 font-medium">Volume</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map((token) => {
              return (
                <TableRows
                  key={token.id}
                  token={token}
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
  token: Token;
}

const TableRows = ({ token }: TableRowsProps) => {

  return (
    <motion.tr
      layoutId={`row-${token.id}`}
      className="text-sm border-b border-colors-white2 hover:bg-colors-white2 transition-all ease-in-out duration-100"
    >
      <td className="pl-4 w-8 text-colors-black2">
        {token.id}
      </td>

      <td className="p-4 flex items-center gap-3">
        <img
          src={token.logoURL}
          alt="token logo"
          className="w-10 h-10 rounded-full object-cover object-top shrink-0"
        />
        <div>
          <span className="block mb-1 font-medium">{token.name}</span>
          <span className="block text-xs text-slate-500">{token.symbol}</span>
        </div>
      </td>

      <td className="p-4 font-medium">
        <span>
          ${token.price.toLocaleString("en-US", {})}
        </span>
      </td>

      <td className="p-4">
        <span>
          ${token.tvl.toLocaleString("en-US", {})}
        </span>
      </td>

      <td className="p-4">
        <span>
          ${token.volume.toLocaleString("en-US", {})}
        </span>
      </td>
    </motion.tr>
  );
};

export default Tokens;

interface Token {
  id: number;
  name: string;
  symbol: string;
  logoURL: string;
  price: number;
  tvl: number;
  volume: number;
}

const tokenData: Token[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logoURL: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    price: 50000,
    tvl: 1000000000,
    volume: 100000000,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    logoURL: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 3000,
    tvl: 500000000,
    volume: 50000000,
  },
  {
    id: 3,
    name: "Binance Coin",
    symbol: "BNB",
    logoURL: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    price: 500,
    tvl: 100000000,
    volume: 10000000,
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    logoURL: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    price: 2,
    tvl: 50000000,
    volume: 5000000,
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    logoURL: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 200,
    tvl: 10000000,
    volume: 1000000,
  },
  {
    id: 6,
    name: "Polkadot",
    symbol: "DOT",
    logoURL: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    price: 50,
    tvl: 5000000,
    volume: 500000,
  },
  {
    id: 7,
    name: "Chainlink",
    symbol: "LINK",
    logoURL: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    price: 30,
    tvl: 1000000,
    volume: 100000,
  },
  {
    id: 8,
    name: "Litecoin",
    symbol: "LTC",
    logoURL: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    price: 150,
    tvl: 500000,
    volume: 50000,
  },
];