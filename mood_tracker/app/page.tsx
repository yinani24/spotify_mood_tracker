import Image from "next/image";
import Spotify from '../public/spotify.png'

export default function Home() {
  return (
  <main className='flex flex-col justify-center items-center gap-2 min-h-screen w-full'>
      <div className='flex w-full justify-center'>
        <Image className='' src={Spotify} alt='spotify logo' width={200} height={100} />
        <h1 className='text-5xl text-[#FFFFFF] font-[Inter] font-bold'>Mood Tracker</h1>
      </div>
      <button className='border font-[Inter] text-[#1DB954] font-semibold rounded-xl p-2 shadow-md shadow-[#1DB954]'>{'Connect your spotify ->'}</button>
  </main>
  );
}
