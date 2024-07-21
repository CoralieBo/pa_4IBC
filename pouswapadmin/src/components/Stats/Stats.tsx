import Title from "../Title/Title";
import { twMerge } from "tailwind-merge";
import { MotionProps, motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../../@/components/ui/chart"
import { IUser } from "../../interfaces/Users";
import { useContext, useEffect, useState } from "react";
import User from "../../services/User";
import { BlockchainContext } from "../../asset/hooks/blockchain";
import StatssService from "../../services/Stats";

const Stats = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [banned, setBanned] = useState<IUser[]>([]);
    const [stakers, setStakers] = useState<string[]>([]);
    const [claimed, setClaimed] = useState<number[]>([0, 0, 0, 0, 0]);
    const [staked, setStaked] = useState<number[]>([0, 0, 0, 0, 0]);
    const [swap, setSwap] = useState<number[]>([0, 0, 0, 0, 0]);

    const [topCrypto, setTopCrypto] = useState<any[]>([]);

    const context = useContext(BlockchainContext);
    const { getClaimed, getStaked, getStakers } = context!;

    useEffect(() => {
        async function fetchDatas() {
            const users = await new User().getAll();
            setUsers(users);
            const banned = users.filter((user: IUser) => user.status === "ban");
            setBanned(banned);
            const stakers = await getStakers();
            setStakers(stakers);
            const staked = await getStaked();
            setStaked([12, 9, 14, 11, parseFloat(staked)]);
            const claimed = await getClaimed();
            setClaimed([7, 5, 8, 6, parseFloat(claimed)]);
            const swap = users.reduce((acc: number, user: IUser) => acc + user.swap, 0);
            setSwap([23, 16, 20, 21, swap]);
            const crypto = await new StatssService().getCryptoStats();
            console.log(crypto);

            setTopCrypto(crypto);
        }

        fetchDatas();
    }, []);

    const stakingData = [
        { month: "March", staked: staked[0], claimed: claimed[0] },
        { month: "April", staked: staked[1], claimed: claimed[1] },
        { month: "May", staked: staked[2], claimed: claimed[2] },
        { month: "June", staked: staked[3], claimed: claimed[3] },
        { month: "July", staked: staked[4], claimed: claimed[4] },
    ]

    const stakingConfig = {
        staked: {
            label: "Staked (ETH)",
            color: "#658864",
        },
        claimed: {
            label: "Claimed (ETH)",
            color: "#bc6c25",
        },
    } satisfies ChartConfig

    const swapsData = [
        { month: "March", transactions: swap[0] },
        { month: "April", transactions: swap[1] },
        { month: "May", transactions: swap[2] },
        { month: "June", transactions: swap[3] },
        { month: "July", transactions: swap[4] },
    ]

    const swapsConfig = {
        transactions: {
            label: "Transactions",
            color: "#658864",
        }
    } satisfies ChartConfig

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 text-colors-black1">
            <Title Text="Stats" />
            <div className="grid grid-cols-5 gap-4 mt-24">
                <Block className="col-span-2">
                    <h2 className="text-2xl font-semibold mb-10">Staking volume</h2>
                    <ChartContainer config={stakingConfig} className="h-[calc(100%-4rem)] w-full">
                        <BarChart accessibilityLayer data={stakingData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="staked" fill="var(--color-staked)" radius={4} />
                            <Bar dataKey="claimed" fill="var(--color-claimed)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </Block>
                <Block className="col-span-2">
                    <h2 className="text-2xl font-semibold mb-10">Monthly swaps</h2>
                    <ChartContainer config={swapsConfig} className="h-[calc(100%-4rem)] w-full">
                        <BarChart accessibilityLayer data={swapsData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="transactions" fill="var(--color-transactions)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </Block>
                <div className="space-y-4">
                    <Block>
                        <p className="text-xl">Total stakers</p>
                        <p className="text-5xl font-semibold">{stakers.length}</p>
                    </Block>
                    <Block>
                        <p className="text-xl">Total users</p>
                        <p className="text-5xl font-semibold">{users.length}</p>
                    </Block>
                    <Block>
                        <p className="text-xl">Users banned</p>
                        <p className="text-5xl font-semibold">{banned.length}</p>
                    </Block>
                </div>
            </div>
            <h2 className="text-2xl font-semibold mt-8">Top crypto</h2>
            <table className="min-w-full rounded-lg bg-colors-gray2 p-6 overflow-hidden mt-3">
                <thead>
                    <tr>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Rank
                        </th>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-gray-500">
                            Symbol
                        </th>

                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500 text-center">
                            Name
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 text-center">
                            Price
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 text-center">
                            Volume 24h
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-colors-white2 divide-y divide-gray-200">
                    {topCrypto.map((crypto, index) => (
                        <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                # {index + 1}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                {crypto.CoinInfo.Name}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap text-center">
                                {crypto.CoinInfo.FullName}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                {crypto.DISPLAY.USD.PRICE}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                                {crypto.DISPLAY.USD.VOLUME24HOUR}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

type BlockProps = {
    className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
    return (
        <motion.div
            variants={{
                initial: {
                    scale: 0.5,
                    y: 50,
                    opacity: 0,
                },
                animate: {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                },
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge(
                "rounded-lg border border-colors-black2 bg-colors-gray2 p-6",
                className
            )}
            {...rest}
        />
    );
};

export default Stats;