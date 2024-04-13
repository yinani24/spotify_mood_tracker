'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import { useState } from 'react';

export default function Dashboard(){
    const searchParams = useSearchParams();
    const profile = searchParams.get('profile') || '';
    const parsedProfile = JSON.parse(profile);
    
    return (
        <section className='text-white'>
            <h1>Dashboard</h1>
            <p>{profile}</p>
        </section>
    )
}