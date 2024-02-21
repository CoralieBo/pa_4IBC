import "./Header.scss";
import logo from "../../utils/asset/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="fixed w-full z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="flex items-end text-xl font-light text-colors-black1" href="/">
                            <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
                            <label className="pb-0.5 -ml-1">Pouswap</label>
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link to={"/Swap"} className="text-gray-500 transition hover:text-gray-500/75"> Swap </Link>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Tokens </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Pools </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Profile </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4 hidden md:block text-xs">
                            <button className="connectButton">
                                <span className="button_top"> Connect Wallet
                                </span>
                            </button>
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;