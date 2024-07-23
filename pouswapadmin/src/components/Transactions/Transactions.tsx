import Title from "../Title/Title";
import FactoryABI from "../../asset/utils/abi/FactoryContractABI.json";
import StakingABI from "../../asset/utils/abi/StakingContractABI.json";

const Transactions = () => {

    function copyToClipboard(text: string, buttonId: string) {
        navigator.clipboard.writeText(text);
        const button = document.getElementById(buttonId);
        if (button) {
            const before = button.innerHTML;
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => {
                button.innerHTML = before;
            }, 500);
        }
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 text-colors-black1">
            <Title Text="Transactions" />
            <p className="text-gray-800 text-lg">Here you can find the addresses and ABIs of the contracts used in the application.</p>
            <p className="text-gray-800 text-lg mb-4">Go to the <a href="https://app.safe.global/apps/open?safe=sep:0xF0743aF38F401F67E1b22B1339b86cd24D0B9C77&appUrl=https%3A%2F%2Fapps-portal.safe.global%2Ftx-builder" target="_blank" rel="noreferrer" className="text-colors-green1">Safe App</a> to interact with the contracts.</p>
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Contracts addresses</h1>
            <div className="grid grid-cols-2 gap-8 mx-4">
                <div className="w-full overflow-hidden rounded-xl border-2 border-zinc-900 bg-white md:grid-cols-12">
                    <div className="overflow-y-scroll h-full border-zinc-900 bg-zinc-100 shadow-inner shadow-zinc-500 md:col-span-5 rounded-lg p-5">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Factory Contract Address</h1>
                            <button id="FactoryAddress" onClick={() => copyToClipboard(process.env.REACT_APP_FACTORY_ADDRESS!, "FactoryAddress")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <p className="break-words whitespace-pre-wrap max-w-full">{process.env.REACT_APP_FACTORY_ADDRESS}</p>
                    </div>
                </div>
                <div className="w-full overflow-hidden rounded-xl border-2 border-zinc-900 bg-white md:grid-cols-12">
                    <div className="overflow-y-scroll h-full border-zinc-900 bg-zinc-100 shadow-inner shadow-zinc-500 md:col-span-5 rounded-lg p-5">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Staking Contract Address</h1>
                            <button id="StakingAddress" onClick={() => copyToClipboard(process.env.REACT_APP_STAKING_ADDRESS!, "StakingAddress")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <p className="break-words whitespace-pre-wrap max-w-full">{process.env.REACT_APP_STAKING_ADDRESS}</p>
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-3 mt-5">Contracts ABIs</h1>
            <div className="grid grid-cols-2 gap-8 mx-4">
                <div className="h-fit w-full overflow-hidden rounded-xl border-2 border-zinc-900 bg-white md:h-96 md:grid-cols-12">
                    <div className="overflow-y-scroll h-full border-zinc-900 bg-zinc-100 shadow-inner shadow-zinc-500 md:col-span-5 rounded-lg p-5">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Factory Contract ABI</h1>
                            <button id="factoryABI" onClick={() => copyToClipboard(JSON.stringify(FactoryABI), "factoryABI")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <p className="break-words whitespace-pre-wrap max-w-full">{JSON.stringify(FactoryABI)}</p>
                    </div>
                </div>
                <div className="h-fit w-full overflow-hidden rounded-xl border-2 border-zinc-900 bg-white md:h-96 md:grid-cols-12">
                    <div className="overflow-y-scroll h-full border-zinc-900 bg-zinc-100 shadow-inner shadow-zinc-500 md:col-span-5 rounded-lg p-5">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Staking Contract ABI</h1>
                            <button className="stakingABI" onClick={() => copyToClipboard(JSON.stringify(StakingABI), "stakingABI")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <p className="break-words whitespace-pre-wrap max-w-full">{JSON.stringify(StakingABI)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Transactions;