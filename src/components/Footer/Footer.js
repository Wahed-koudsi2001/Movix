import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { AiFillLinkedin } from "react-icons/ai";
export default function Footer() {
    return (
        <footer className="bg-[#020c1b] text-center py-[40px]">
            <ul className="text-[#fff] sm:flex gap-5 justify-center hidden">
                <li>Terms of Use</li>
                <li>Privacy-Policy</li>
                <li>About</li>
                <li>Blog</li>
                <li>FAQ</li>
            </ul>
            <p className="w-[80%] md:w-1/2 mx-auto mt-5 opacity-[0.5] text-[14px] mb-[14px] text-[#fff]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <div className="flex justify-center gap-4 mt-5">
                <div className="w-[3rem] h-[3rem]  rounded-full bg-[#04152d] text-[#fff] flex items-center justify-center">
                    <BiLogoFacebook size={22} />
                </div>
                <div className="w-[3rem] h-[3rem]  rounded-full bg-[#04152d] text-[#fff] flex items-center justify-center">
                    <BiLogoInstagram size={22} />
                </div>
                <div className="w-[3rem] h-[3rem]  rounded-full bg-[#04152d] text-[#fff] flex items-center justify-center">
                    <BiLogoTwitter size={22} />
                </div>
                <div className="w-[3rem] h-[3rem]  rounded-full bg-[#04152d] text-[#fff] flex items-center justify-center">
                    <AiFillLinkedin size={22} />
                </div>
            </div>
        </footer>
    )
}
