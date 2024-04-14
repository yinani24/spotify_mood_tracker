"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "./components/navbar";
import { Suspense } from "react";

export default function Dashboard() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ComponentDashboard />
        </Suspense>
    );
}

function ComponentDashboard() {
    const searchParams = useSearchParams();
    const profile = searchParams.get("profile") || "";
    const parsedProfile = JSON.parse(profile);

    return (
        <section className="text-white">
            <h1>Dashboard</h1>
            <Navbar />
            <p>{profile}</p>
        </section>
    );
}
