import { Suspense } from "react";

export default function Profile() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ComponentProfile />
        </Suspense>
    );
}

function ComponentProfile() {
    return (
        <section className="text-white">
            <h1>Profile Page</h1>
        </section>
    );
}
