import { Suspense } from "react";
import CreateGraph from "./graph/main";

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
            <CreateGraph/>
        </main>
    );
}
