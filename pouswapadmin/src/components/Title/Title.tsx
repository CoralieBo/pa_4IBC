import { motion } from "framer-motion";

const Title = ({ Text }: { Text: string }) => {
    return (
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
            <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
                {Text}
            </h2>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="whitespace-nowrap inline-flex items-center gap-1 rounded-lg bg-colors-black1 px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-colors-green1"
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                Account
            </motion.button>
        </div>
    );
}

export default Title;