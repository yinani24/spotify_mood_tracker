import { Suspense } from "react";

export default function Dashboard() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ComponentDashboard />
        </Suspense>
    );
}

function ComponentDashboard(){
    return (
        <main className="text-white flex w-full max-h-screen min-h-0 items-center justify-center">
            <h1>Home</h1>
        </main>
    );
}
