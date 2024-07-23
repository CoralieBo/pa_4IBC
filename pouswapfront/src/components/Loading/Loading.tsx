import React, { useEffect, useState } from "react";
import {
    AnimationProps,
    DynamicAnimationOptions,
    motion,
    useAnimate,
} from "framer-motion";

const NUM_BLOCKS = 5;
const BLOCK_SIZE = 35;

const DURATION_IN_MS = 175;
const DURATION_IN_SECS = DURATION_IN_MS * 0.001;

const TRANSITION: DynamicAnimationOptions = {
    ease: "easeInOut",
    duration: DURATION_IN_SECS,
};

const Loader = () => {
    const [blocks, setBlocks] = useState(
        Array.from(Array(NUM_BLOCKS).keys()).map((n) => ({ id: n }))
    );
    const [scope, animate] = useAnimate();

    useEffect(() => {
        shuffle();
    }, []);

    const shuffle = async () => {
        while (scope.current) {
            const [first, second] = pickTwoRandom();

            if(!scope.current) return;
            animate(`[data-block-id="${first.id}"]`, { y: -BLOCK_SIZE }, TRANSITION);

            if(!scope.current) return;
            await animate(
                `[data-block-id="${second.id}"]`,
                { y: BLOCK_SIZE },
                TRANSITION
            );

            await delay(DURATION_IN_MS);

            setBlocks((pv) => {
                const copy = [...pv];

                const indexForFirst = copy.indexOf(first);
                const indexForSecond = copy.indexOf(second);

                copy[indexForFirst] = second;
                copy[indexForSecond] = first;

                return copy;
            });

            await delay(DURATION_IN_MS * 2);

            if(!scope.current) return;
            animate(`[data-block-id="${first.id}"]`, { y: 0 }, TRANSITION);
            
            if(!scope.current) return;
            await animate(`[data-block-id="${second.id}"]`, { y: 0 }, TRANSITION);
            
            await delay(DURATION_IN_MS);
        }
    };

    const pickTwoRandom = () => {
        const index1 = Math.floor(Math.random() * blocks.length);
        let index2 = Math.floor(Math.random() * blocks.length);

        while (index2 === index1) {
            index2 = Math.floor(Math.random() * blocks.length);
        }

        return [blocks[index1], blocks[index2]];
    };

    const delay = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    return (
        <div className="fixed top-0 left-0 bg-black/30 w-screen h-screen z-50">
            <div ref={scope} className="flex justify-center items-center w-screen h-screen">
                {blocks.map((b) => {
                    return (
                        <motion.div
                            layout
                            data-block-id={b.id}
                            key={b.id}
                            transition={TRANSITION as AnimationProps["transition"]}
                            style={{
                                width: BLOCK_SIZE,
                                height: BLOCK_SIZE,
                            }}
                            className="bg-colors-white2 border border-colors-black2"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Loader;