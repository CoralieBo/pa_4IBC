import "./Tokens.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import shocked from "../../utils/asset/images/shocked.png";
import coin from "../../utils/asset/images/coin.png";
import { tokens as tokensLogo } from "../../utils/asset/tokens";

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
              <th className="text-start p-4 font-medium">Address</th>
              <th className="text-start p-4 font-medium">Price</th>
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

      <Animation index={1} classCss="coin1" tokenLogo={tokensLogo[2]} />
      <Animation index={2} classCss="coin2" tokenLogo={tokensLogo[1]} />
      <Animation index={3} classCss="coin3" tokenLogo={tokensLogo[4]} />
      <Animation index={4} classCss="coin4" tokenLogo={tokensLogo[7]} />
      <Animation index={5} classCss="coin5" tokenLogo={tokensLogo[10]} />
      <div className="absolute w-32 bottom-0 left-12 drop-shadow-lg">
        <img src={shocked} alt="money.png" />
      </div>
    </div>
  );
};

interface AnimationProps {
  index: number;
  classCss: string;
  tokenLogo: string;
}
const Animation = ({index, classCss, tokenLogo}: AnimationProps) => {
  return (
    <div key={index} className={`absolute z-10 ${classCss}`}>
      <div className="relative">
        <img className="w-14" src={coin} alt="coin" />
        <img className="w-6 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2" src={tokenLogo} alt="token" />
      </div>
    </div>
  );
}

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

      <td className="p-4">
        <span>
          {token.address.slice(0, 5)}...{token.address.slice(-5)}
        </span>
      </td>
      
      <td className="p-4 font-medium">
        <span>
          ${token.price.toLocaleString("en-US", {})}
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
  address: string;
  volume: number;
}

const tokenData: Token[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logoURL: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    price: 50000,
    address: "0xe0f5206bbd039e7b0592d8918820024e2a7437b9",
    volume: 100000000,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    logoURL: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 3000,
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    volume: 50000000,
  },
  {
    id: 3,
    name: "Binance Coin",
    symbol: "BNB",
    logoURL: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    price: 500,
    address: "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
    volume: 10000000,
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    logoURL: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    price: 2,
    address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
    volume: 5000000,
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    logoURL: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 200,
    address: "0x022e292b44b5a146f2e8ee36f4d4a5dd2b5c6444",
    volume: 1000000,
  },
  {
    id: 6,
    name: "Polkadot",
    symbol: "DOT",
    logoURL: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    price: 50,
    address: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
    volume: 500000,
  },
  {
    id: 7,
    name: "Chainlink",
    symbol: "LINK",
    logoURL: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    price: 30,
    address: "0x514910a225c877cf53a699ca1d0d6b88401f4e2d",
    volume: 100000,
  },
  {
    id: 8,
    name: "Litecoin",
    symbol: "LTC",
    logoURL: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    price: 150,
    address: "0x4338665cbb7b2485a8855a139b75d5e34ab0db94",
    volume: 50000,
  },
];