import Image from "next/image";
import Spotify from '../public/spotify.png'

export default function Home() {

  const handleWindow = async () => {
    const endpoint = 'api'
    const response = await fetch(endpoint)
    const data = await response.json()
  }

  return (
  <main className='flex flex-col justify-center items-center gap-10 min-h-screen w-full'>
      <div className='flex w-full justify-center gap-2'>
        <Image src={Spotify} alt='spotify logo' width={150} height={150} />
        <h1 className='text-5xl text-[#FFFFFF] font-[Inter] font-bold'>Mood Tracker</h1>
      </div>
      <button onClick={handleWindow} className='border font-[Inter] text-[#1DB954] font-semibold rounded-xl p-2 shadow-md shadow-[#1DB954]'>{'Connect your spotify ->'}</button>
  </main>
  );
}
