'use client'

import Link from "next/link";
import { navBar } from "../../components/constant";
import Image from "next/image";
import Spotify from "../../public/spotify.png";
import { useState } from "react";

export default function Navbar() {
    const [activemenu, setActivemenu] = useState("Dashboard");
    return (
        <div className="bg-[#212121] p-4 w-1/5 min-h-screen fixed flex flex-col items-center">
            <Image src={Spotify} alt="Spotify logo" className="pt-10"></Image>
            <nav className="flex flex-col min-h-screen justify-center inset-0 absolute items-center">
                <ul className="flex flex-col gap-10">
                    {navBar.map((item, index) => (
                        <li key={index} className="flex gap-2">
                            {item.Name === activemenu ? (
                                <div className="h-full w-1 bg-white" />
                            ) : <div className="h-full w-1 bg-transparent" />}
                            <Link
                                href={item.Link}
                                className={`text-[#ADADAD] group items-center font-normal font-[Inter] flex gap-2 hover:text-white 
                                ${item.Name === activemenu ? "text-white" : ""}`}
                                onClick={() => setActivemenu(item.Name)}
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
