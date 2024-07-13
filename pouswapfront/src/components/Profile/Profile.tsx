import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { MotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";
import money from "../../utils/asset/images/money.png";
import coin from "../../utils/asset/images/coin.png";

export const Profile = () => {
    return (
        <div className="min-h-screen px-4 flex items-center pt-12">
            {/* <Logo /> */}
            <motion.div
                initial="initial"
                animate="animate"
                transition={{
                    staggerChildren: 0.05,
                }}
                className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
            >
                <Block className="col-span-12 row-span-2 md:col-span-6">
                    <img
                        src={coin}
                        alt="coin"
                        className="mb-4 size-14 rounded-full"
                    />
                    <h1 className="mb-12 text-4xl font-medium leading-tight">
                        Stake your tokens {" "}
                        <span className="text-zinc-400">
                            to earn rewards and support us !
                        </span>
                    </h1>
                    <p className="flex items-center gap-1 text-colors-green1 hover:underline">
                        0.1% of tokens staked are distributed every day
                    </p>
                </Block>
                <Block
                    className="col-span-6 p-0 bg-transparent border-0 relative"
                >
                    <img src={money} alt="money" className="w-[70%] object-contain mx-auto" />
                    <div className="flex gap-5 justify-center mt-5">
                        <button className="px-6 py-2 font-medium bg-colors-green1 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                            Stake :D
                        </button>
                        <button className="px-6 py-2 font-medium bg-colors-green1 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                            Claim !
                        </button>
                        <button className="px-6 py-2 font-medium bg-colors-green1 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                            Unstake :(
                        </button>
                    </div>
                </Block>
                <Block className="col-span-12 text-3xl leading-snug">
                    <div className="mx-auto max-w-3xl px-4">
                        <div className="flex flex-col items-center justify-center sm:flex-row">
                            <Stat
                                num={15.5}
                                decimals={1}
                                suffix="POU"
                                subheading="Staked in the pool"
                            />
                            <Stat
                                num={12}
                                suffix="Days"
                                subheading="Time staked"
                            />
                            <Stat
                                num={2}
                                decimals={2}
                                suffix="POU"
                                subheading="Total rewards earned"
                            />
                        </div>
                    </div>
                </Block>
            </motion.div>
        </div >
    );
};

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
                "col-span-4 rounded-lg border border-colors-black2 bg-colors-gray2 p-6",
                className
            )}
            {...rest}
        />
    );
};

interface Props {
    num: number;
    suffix: string;
    decimals?: number;
    subheading: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading }: Props) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!isInView) return;

        animate(0, num, {
            duration: 1,
            onUpdate(value) {
                if (!ref.current) return;

                ref.current.textContent = value.toFixed(decimals);
            },
        });
    }, [num, decimals, isInView]);

    return (
        <div className="flex min-w-72 flex-col items-center py-8 sm:py-0">
            <p className="mb-2 text-center text-7xl font-semibold sm:text-6xl">
                <span ref={ref}></span>
                <span className="text-xl">
                    {suffix}
                </span>
            </p>
            <p className="max-w-48 text-center text-base text-neutral-600">{subheading}</p>
        </div>
    );
};

export default Profile;