import Link from "next/link"
import { navBar } from '../../../components/constant'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center bg-gray-800 p-4'>
            <h1 className='text-white'>Mood Tracker</h1>
            <ul className='flex'>
                {navBar.map((item, index) => (
                    <li key={index} className='ml-4'>
                        <Link href={item.Link} className='text-white'>
                            {item.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}