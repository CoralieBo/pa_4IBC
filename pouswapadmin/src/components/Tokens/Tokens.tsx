import { Link } from "react-router-dom";
import { cropAddress } from "../../asset/utils/cropAddress";
import Title from "../Title/Title";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/Tokens";
import Token from "../../services/Token";
import { pinFileToIPFS } from "../../asset/utils/files";
import StackedNotifications from "../Notifications/Notifications";
import { deploy } from "../../asset/utils/SimpleERC20/deployContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

const Tokens = () => {
    const [tokens, setTokens] = useState<IToken[] | null>(null);
    const [tokenSelected, setTokenSelected] = useState<IToken | null>(null);
    const [notification, setNotification] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { walletProvider } = useWeb3ModalProvider();

    async function fetchDatas() {
        try {
            const tokens: IToken[] = await new Token().getAll();
            console.log(tokens);

            setTokens(tokens);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, []);

    async function create() {
        try {
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const symbol = (document.getElementById("symbole") as HTMLInputElement).value;
            let address = (document.getElementById("address") as HTMLInputElement).value;
            const logo = (document.getElementById("logo") as HTMLInputElement).files?.[0];
            if (!name || !symbol || !logo) {
                setMessage("Name, symbol and logo are required");
                setNotification(true);
                return;
            }
            if (!address) {
                address = await deploy({ name, symbol, setMessage, setNotification, walletProvider }) as string;
            }
            setMessage("Adding token to list...");
            setNotification(true);
            const deployedLogo = await pinFileToIPFS(logo!);
            if (!deployedLogo) {
                return;
            }
            await new Token().create(name, symbol, address, deployedLogo.IpfsHash, 0);
            setMessage("Token added successfully");
            setNotification(true);
            fetchDatas();
        } catch (e) {
            console.error(e);
            setMessage("Error while adding token");
            setNotification(true);
        }
    }

    async function remove(id: number) {
        try {
            // ADD POOLS TX
            await new Token().delete(id);
            setTokenSelected(null);
            setMessage("Token removed successfully");
            setNotification(true);
            fetchDatas();
        } catch (e) {
            console.error(e);
            setMessage("Error while removing token");
            setNotification(true);
        }
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 text-colors-black1">
            <Title Text="Tokens" />
            <div className="w-full flex justify-end px-8">
                <div className="relative w-full max-w-xs">
                    <input type="text" placeholder="Search" className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-none" />
                    <svg className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-gray-500">
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>#ID</span>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500 text-center">
                                            Name
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 text-center">
                                            Symbol
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 text-center">
                                            Address
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500 text-center">
                                            Logo
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                            <input type="text" id="name" placeholder="Name" className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-none" />
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                            <input type="text" id="symbole" placeholder="Symbole" className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-none" />
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                            <input type="text" id="address" placeholder="Address" className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-none" />
                                        </td>
                                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap flex justify-center">
                                            <input type="file" id="logo" accept="image/*" className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-none" />
                                        </td>

                                        <td className="px-4 py-4 space-x-2 text-sm text-center whitespace-nowrap">
                                            <button disabled={notification} onClick={create} className="px-3 py-2 text-white transition-colors duration-200 rounded-lg bg-blue-400 hover:bg-blue-500 focus:outline-none">
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                    {tokens && tokens.map((token, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800">{token.ID}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                                <div>
                                                    <h4 className="text-gray-700">{token.name}</h4>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                                <div>
                                                    <h4 className="text-gray-700">{token.symbole}</h4>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                                <div>
                                                    <h4 className="text-gray-700">{cropAddress(token.address)}</h4>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap flex justify-center">
                                                <img src={`https://ipfs.io/ipfs/${token.logo}`} alt="logo" className="w-10 h-10" />
                                            </td>

                                            <td className="px-4 py-4 space-x-2 text-sm text-right whitespace-nowrap">
                                                <button onClick={() => setTokenSelected(token)} className="px-2 py-1 text-white transition-colors duration-200 rounded-lg bg-red-400 hover:bg-red-500 focus:outline-none">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {tokenSelected &&
                <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                    <p className="font-medium sm:text-lg">Are you sure you want to delete this token ?</p>

                    <p className="mt-4 text-gray-500">
                        Token name : {tokenSelected?.name} ({tokenSelected?.symbole})
                    </p>
                    <p className="mt-4 text-gray-500">
                        Token address : {tokenSelected?.address}
                    </p>

                    <div className="mt-6 sm:flex sm:gap-4">
                        <button
                            className="inline-block w-full rounded-lg bg-colors-black1 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                            onClick={() => remove(tokenSelected?.ID!)}
                        >
                            Validate
                        </button>

                        <button
                            className="mt-2 inline-block w-full rounded-lg bg-gray-100 px-5 py-3 text-center text-sm font-semibold text-gray-600 sm:mt-0 sm:w-auto"
                            onClick={() => setTokenSelected(null)}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            }
            {notification && <StackedNotifications text={message} id={1} setShow={setNotification} />}
        </section>
    );
}

export default Tokens;