'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
//import Dashboard from '../dashboard/page';

export default function Callback() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const api = `api?code=${code}`;
    const router = useRouter();
    const [fetched, setFetched] = useState(false); // State to track whether API has been fetched

    const fetchAPI = async () => {
        // Prevent fetching API multiple times
        if (!fetched) {
            const profile = await fetch(api);
            console.log("Profile: ", profile)
            setFetched(true); // Set fetched to true after fetching once
            if (profile.status === 200) {
                router.push('/dashboard');
            } else {
                router.push('/');
            }
        }
    };

    useEffect(() => {
        console.log('Fetching API...');
        fetchAPI();
    }, []); // Execute only on component mount

    return (
        <section className='flex justify-center items-center w-full min-h-screen'>
            <h1 className='text-2xl text-[#FFFFFF] font-[Inter] font-bold'>Logging You In...</h1>
        </section>
    );
}
