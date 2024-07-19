import { useContext } from "react";
import { StakingContext } from "../../utils/hooks/Staking";
import { ethers } from "ethers";

enum Options {
    Hiden,
    Stake,
    Unstake,
}

const Modal = ({ option, setOption }: { option: Options, setOption: (option: Options) => void }) => {
    if (option === Options.Hiden) {
        return null;
    }

    const context = useContext(StakingContext);
    const { stake, unstake } = context!;

    async function submit() {
        const value = (document.getElementById("value") as HTMLInputElement).value;
        if (option === Options.Stake) {
            const tx = await stake({ value: ethers.parseEther(value) });
            if (tx) {
                setOption(Options.Hiden);
            }
        } else {
            const tx = await unstake({ value: ethers.parseEther(value) });
            if (tx) {
                setOption(Options.Hiden);
            }
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/20 z-50">
            <div className="rounded-2xl flex flex-col items-center border w-1/3 border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                <div className="flex items-center gap-4">
                    <span className="shrink-0 rounded-full bg-colors-green1 p-2 text-white">
                        <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </span>

                    <p className="font-medium sm:text-lg">Add an amount to {option === Options.Stake ? "stake" : "unstake"}</p>
                </div>

                <div className="relative mt-4 w-11/12">
                    <input id="value" type="number" className="w-full p-3 border border-gray-200 rounded-lg" />
                    <p className="text-gray-500 absolute top-1/2 right-4 -translate-y-1/2">ETH</p>
                </div>

                <div className="mt-6 sm:flex sm:gap-4">
                    <button onClick={submit} className="inline-block w-full rounded-lg bg-colors-green1 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto">
                        {option === Options.Stake ? "Stake" : "Unstake"}
                    </button>

                    <button
                        onClick={() => setOption(Options.Hiden)}
                        className="mt-2 inline-block w-full rounded-lg bg-colors-white2 px-5 py-3 text-center text-sm font-semibold text-colors-green1 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;