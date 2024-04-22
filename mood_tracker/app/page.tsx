import Image from "next/image";
import Spotify from '../public/spotify.png'
import Link from "next/link";

export default function Home() {

  return (
  <main className='flex flex-col justify-center items-center gap-10 min-h-screen w-full'>
      <div className='flex w-full justify-center gap-2'>
        <Image src={Spotify} alt='spotify logo' width={150} height={150} />
        <h1 className='text-5xl text-[#FFFFFF] font-[Inter] font-bold'>Mood Tracker</h1>
      </div>
      <Link href='/api' className='border font-[Inter] text-[#1DB954] font-semibold rounded-xl p-2 shadow-md shadow-[#1DB954]'>
          {'Connect your spotify ->'}
      </Link>
  </main>
  );
}
