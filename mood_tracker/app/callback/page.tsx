'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Dashboard from '../dashboard/page';
// import Link from 'next/link';
// import {cookies} from 'next/headers';

export default function Callback(){
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const api = `api?code=${code}`
    const router = useRouter()
    const fetchAPI = async () => {
        // const cookie = cookieStore.get('verifier')
        // console.log(cookie)
        // const code = searchParams.get('code')            
        const profile = await fetch(`${api}`)
        if(profile.status === 200){
            router.push('/dashboard')
        }
        else{
            router.push('/')
        }
    }
    useEffect(() => {
        fetchAPI()
    },[])

    return (
        <section className='flex justify-center items-center w-full min-h-screen'>
            <h1 className='text-2xl text-[#FFFFFF] font-[Inter] font-bold'>Logging You In...</h1>
            {/* <Link href={`${api}`}></Link> */}
        </section>
    )
}