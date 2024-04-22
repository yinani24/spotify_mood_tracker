import Link from "next/link";
import { navBar } from "../../components/constant";
import Image from "next/image";
import Spotify from "../../public/spotify.png";

export default function Navbar() {
    return (
        <div className="bg-[#212121] p-4 w-1/5 min-h-screen fixed flex flex-col items-center">
            <Image src={Spotify} alt="Spotify logo" className="pt-10"></Image>
            <nav className="flex flex-col min-h-screen justify-center inset-0 absolute items-center">
                <ul className="flex flex-col gap-10">
                    {navBar.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.Link}
                                className="text-[#ADADAD] group items-center text-lg font-normal font-[Inter] flex gap-2 hover:text-white"
                            >
                                <item.Icon className="w-6 h-6 group-hover:text-white" />
                                {item.Name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
