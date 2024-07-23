import "./Tokens.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import shocked from "../../utils/asset/images/shocked.png";
import coin from "../../utils/asset/images/coin.png";
import { tokens as tokensLogo } from "../../utils/asset/tokens";
import Token from "../../services/Tokens";
import { TokenInterface } from "../../interfaces/Tokens";

const Tokens = () => {
  const [tokens, setTokens] = useState<TokenInterface[]>([]);

  useEffect(() => {
    async function fetchDatas() {
      const tokens = await new Token().getAll();
      console.log(tokens);
      setTokens(tokens);
    }

    fetchDatas();
  }, []);

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold p-4 text-colors-green1">All tokens</h1>
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="border-b-[1px] border-colors-gray1 text-colors-black2 text-sm uppercase">
              <th className="pl-4 w-8">#</th>
              <th className="text-center p-4 font-medium">Token name</th>
              <th className="text-center p-4 font-medium">Address</th>
              <th className="text-center p-4 font-medium">Trades</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => {
              return (
                <TableRows
                  key={token.ID}
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
  token: TokenInterface;
}

const TableRows = ({ token }: TableRowsProps) => {

  return (
    <motion.tr
      layoutId={`row-${token.ID}`}
      className="text-sm border-b border-colors-white2 hover:bg-colors-white2 transition-all ease-in-out duration-100"
    >
      <td className="pl-4 w-8 text-colors-black2">
        {token.ID}
      </td>

      <td className="p-4 flex items-center justify-center gap-3">
        <img
          src={`https://ipfs.io/ipfs/${token.logo}`}
          alt="token logo"
          className="w-10 h-10 rounded-full object-cover object-top shrink-0"
        />
        <div>
          <span className="block mb-1 font-medium">{token.name}</span>
          <span className="block text-xs text-slate-500">{token.symbole}</span>
        </div>
      </td>

      <td className="p-4 text-center">
        <span>
          {token.address.slice(0, 5)}...{token.address.slice(-5)}
        </span>
      </td>
      
      <td className="p-4 font-medium text-center">
        <span>
          {token.trades}
        </span>
      </td>
    </motion.tr>
  );
};

export default Tokens;