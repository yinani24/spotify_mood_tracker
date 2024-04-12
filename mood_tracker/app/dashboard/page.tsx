import {useRouter, useSearchParams} from 'next/navigation'

export default function Dashboard(){
    const searchParams = useSearchParams();
    return (
        <section>
            <h1>Dashboard</h1>
        </section>
    )
}