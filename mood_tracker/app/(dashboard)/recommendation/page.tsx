import { Suspense } from "react";

export default function Recommendation() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ComponentRecommendation />
        </Suspense>
    );
}

function ComponentRecommendation() {
    return (
        <section className="text-white">
            <h1>Recommendation Page</h1>
        </section>
    );
}
