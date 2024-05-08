import { useContext, useEffect } from "react";
import { SafeContext } from "../../asset/hooks/safe";
import Title from "../Title/Title";

const PendingTx = () => {
    const { getPendingTransactions } = useContext(SafeContext);

    useEffect(() => {
        async function fetchDatas() {
            const pendingTransactions = await getPendingTransactions();
            console.log(pendingTransactions);
        }

        fetchDatas();
    }, []);


    return (
        <section className="mx-auto max-w-7xl px-4 py-8 text-colors-black1">
            <Title Text="Pending transactions" />
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
                                            Public key
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 text-center">
                                            Signature
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* {admins && admins.map((user, index) => ( */}
                                        <tr key={"index"}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    {/* <h2 className="font-medium text-gray-800">{user.ID}</h2> */}
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                {/* <h4 className="text-gray-700">{cropAddress(user.public_key)}</h4> */}
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                                <div>
                                                    {/* <h4 className="text-gray-700">{cropAddress(user.signature)}</h4> */}
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 space-x-2 text-sm text-right whitespace-nowrap">
                                                {/* <button onClick={() => action(user)} className="px-2 py-1 text-white transition-colors duration-200 rounded-lg bg-blue-400 hover:bg-blue-500 focus:outline-none">
                                                    Downgrade to User
                                                </button> */}
                                            </td>
                                        </tr>
                                    {/* ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* {actionActive && */}
                {/* <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
                    <p className="font-medium sm:text-lg">Are you sure you want to downgrade this admin ?</p>

                    <p className="mt-4 text-gray-500">
                        Admin's public key : {userSelected?.public_key}
                    </p>

                    <div className="mt-6 sm:flex sm:gap-4">
                        <button
                            className="inline-block w-full rounded-lg bg-colors-black1 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                            onClick={submit}
                        >
                            Validate
                        </button>

                        <button
                            className="mt-2 inline-block w-full rounded-lg bg-gray-100 px-5 py-3 text-center text-sm font-semibold text-gray-600 sm:mt-0 sm:w-auto"
                            onClick={() => setActionActive(false)}
                        >
                            Go back
                        </button>
                    </div>
                </div> */}
            {/* } */}
            {/* {notification && <StackedNotifications text={`Admin ${cropAddress(userSelected?.public_key)} downgrade to user`} id={1} setShow={setNotification} />} */}
        </section>
    );
}

export default PendingTx;