import logo from "../../assets/movix-logo.svg"
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Navbar() {
    return (
        <>
            <div className="bg-[rgba(0,0,0,0.51)] fixed w-full h-[60px] flex z-[9999999999] px-5">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/">
                        <img src={logo} alt="logo" loading="lazy" />
                    </Link>
                    <ul className="text-[#fff] flex gap-5 items-center">
                        <li className="hover:text-[#f05]"><Link to="movies">Movies</Link></li>
                        <li className="hover:text-[#f05]"><Link to="TV_Shows">TV Shows</Link></li>
                    </ul>
                </div>
            </div>
            <Outlet />
            <Footer />
        </>
    )
}