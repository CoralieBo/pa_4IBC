import logo from '../../asset/logo.png';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  const linkClass = "flex items-center justify-start py-2 px-4 text-lg font-light text-colors-white1 rounded-lg hover:text-colors-black1 hover:bg-colors-gray1 hover:scale-105 duration-200 ease-in-out";
  const activeLinkClass = "flex items-center justify-start py-2 px-4 text-lg font-light text-colors-black1 rounded-lg bg-colors-gray1 hover:scale-105 duration-200 ease-in-out";

  return (
    <div className='w-1/6 px-4'>
      <Link to="/" className="flex items-end justify-center py-8 border-b border-colors-gray1 text-xl font-light text-colors-black1">
        <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
        <label className="pb-0.5 -ml-1 text-colors-white1">Pouswap Admin</label>
      </Link>
      <nav className="flex flex-col space-y-4 mt-6">
        <Link to="/" className={pathname === '/' ? activeLinkClass : linkClass}>
          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <label className="pl-4 cursor-pointer">Dashboard</label>
        </Link>
        <Link to="/Users" className={pathname === '/Users' ? activeLinkClass : linkClass}>
          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <label className="pl-4 cursor-pointer">Users</label>
        </Link>
        <Link to="/Tokens" className={`group ${pathname === '/Tokens' ? activeLinkClass : linkClass}`}>
          <svg className='w-5 h-5 border group-hover:border-colors-black1 rounded-full p-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          <label className="pl-4 cursor-pointer">Tokens</label>
        </Link>
        <Link to="/Stats" className={pathname === '/Stats' ? activeLinkClass : linkClass}>
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
          <label className="pl-4 cursor-pointer">Stats</label>
        </Link>
        <Link to="/Admins" className={pathname === '/Admins' ? activeLinkClass : linkClass}>
          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <label className="pl-4 cursor-pointer">Admins</label>
        </Link>
        <Link to="/Pending" className={pathname === '/Pending' ? activeLinkClass : linkClass}>
          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M2.5 2v6h6M21.5 22v-6h-6" /><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" /></svg>
          <label className="pl-4 cursor-pointer">Pending txs</label>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;