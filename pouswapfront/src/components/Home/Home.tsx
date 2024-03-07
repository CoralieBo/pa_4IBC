import "./Home.scss";
import { tokens } from "../../utils/asset/tokens";

const Home = () => {
    return (
        <div className="flex flex-col md:flex-row justify-around md:justify-end w-full h-screen overflow-hidden">
            <div className="z-10 mt-20 md:mt-0 md:absolute md:left-5 md:top-[40%] w-full md:w-1/2">
                <h1 className="font-bold text-6xl md:text-7xl mb-4 text-center md:text-left text-colors-black1">
                    Welcome to
                    <label className="text-colors-green1"> Pouswap</label>
                </h1>
                <p className="text-colors-black2 text-3xl px-4 md:px-0 md:text-4xl md:w-10/12 italic text-center md:text-left">Empowering the future, one decentralized exchange at a time.</p>
                <div className="md:w-2/3 flex justify-center">
                    <div className="sm:flex sm:gap-4 hidden mt-3 md:block text-xs">
                        <button className="connectButton">
                            <w3m-button balance="hide" size="sm" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden -mt-20 rotate-12 h-[125vh] w-2/5 overflow-hidden md:grid grid-cols-4 gap-2 content z-0">
                <div>
                    <div className="grid gap-2 left pb-2">
                        <img src={tokens[0]} className="" alt="NFT" />
                        <img src={tokens[1]} className="" alt="NFT" />
                        <img src={tokens[2]} className="" alt="NFT" />
                        <img src={tokens[3]} className="" alt="NFT" />
                        <img src={tokens[4]} className="" alt="NFT" />
                    </div>
                    <div className="grid gap-2 left">
                        <img src={tokens[0]} className="" alt="NFT" />
                        <img src={tokens[1]} className="" alt="NFT" />
                        <img src={tokens[2]} className="" alt="NFT" />
                        <img src={tokens[3]} className="" alt="NFT" />
                        <img src={tokens[4]} className="" alt="NFT" />
                    </div>
                </div>
                <div>
                    <div className="grid gap-2 right pb-2">
                        <img src={tokens[5]} className="" alt="NFT" />
                        <img src={tokens[6]} className="" alt="NFT" />
                        <img src={tokens[7]} className="" alt="NFT" />
                        <img src={tokens[8]} className="" alt="NFT" />
                        <img src={tokens[9]} className="" alt="NFT" />
                    </div>
                    <div className="grid gap-2 right">
                        <img src={tokens[5]} className="" alt="NFT" />
                        <img src={tokens[6]} className="" alt="NFT" />
                        <img src={tokens[7]} className="" alt="NFT" />
                        <img src={tokens[8]} className="" alt="NFT" />
                        <img src={tokens[9]} className="" alt="NFT" />
                    </div>
                </div>
                <div>
                    <div className="grid gap-2 left pb-2">
                        <img src={tokens[0]} className="" alt="NFT" />
                        <img src={tokens[1]} className="" alt="NFT" />
                        <img src={tokens[2]} className="" alt="NFT" />
                        <img src={tokens[3]} className="" alt="NFT" />
                        <img src={tokens[4]} className="" alt="NFT" />
                    </div>
                    <div className="grid gap-2 left">
                        <img src={tokens[0]} className="" alt="NFT" />
                        <img src={tokens[1]} className="" alt="NFT" />
                        <img src={tokens[2]} className="" alt="NFT" />
                        <img src={tokens[3]} className="" alt="NFT" />
                        <img src={tokens[4]} className="" alt="NFT" />
                    </div>
                </div>
                <div>
                    <div className="grid gap-2 right pb-2">
                        <img src={tokens[6]} className="" alt="NFT" />
                        <img src={tokens[7]} className="" alt="NFT" />
                        <img src={tokens[8]} className="" alt="NFT" />
                        <img src={tokens[9]} className="" alt="NFT" />
                        <img src={tokens[10]} className="" alt="NFT" />
                    </div>
                    <div className="grid gap-2 right">
                        <img src={tokens[6]} className="" alt="NFT" />
                        <img src={tokens[7]} className="" alt="NFT" />
                        <img src={tokens[8]} className="" alt="NFT" />
                        <img src={tokens[9]} className="" alt="NFT" />
                        <img src={tokens[10]} className="" alt="NFT" />
                    </div>
                </div>
            </div>

            <div className="pb-4">
                <div className="flex gap-2 top mb-2 md:hidden">
                    <img src={tokens[0]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[1]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[2]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[3]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[4]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[0]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[1]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[2]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[3]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[4]} className="w-32 h-32" alt="NFT" />
                </div>

                <div className="flex justify-end gap-2 bottom md:hidden">
                    <img src={tokens[0]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[1]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[2]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[3]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[4]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[0]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[1]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[2]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[3]} className="w-32 h-32" alt="NFT" />
                    <img src={tokens[4]} className="w-32 h-32" alt="NFT" />
                </div>
            </div>

        </div>
    );
}

export default Home;