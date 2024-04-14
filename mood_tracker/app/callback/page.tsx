"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { createUser, getUser } from "../_aws/_database/userModels";
import jsonToUser from "./_components/jsonToUser";

export default function Callback() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const api = `api?code=${code}`;
    const router = useRouter();

    const fetchAPI = async () => {
        // Prevent fetching API multiple times
        try {
            const profile = await fetch(api);
            const responseprofile = await profile.json();
            //console.log("Profile: ", responseprofile)
            if (profile.status === 200) {
                const userProfile = await getUser(responseprofile.profile.id);
                console.log("User Profile: ", userProfile);
                if (!userProfile) {
                    const userProfile = await jsonToUser(
                        JSON.stringify(responseprofile.profile)
                    );
                    await createUser(userProfile);
                }
                const searchParams = new URLSearchParams();
                searchParams.set(
                    "profile",
                    JSON.stringify(responseprofile.profile)
                );
                router.push(`/dashboard?${searchParams.toString()}`);
            }
        } catch (error) {
            router.push("/");
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <section className="flex justify-center items-center w-full min-h-screen">
            <h1 className="text-2xl text-[#FFFFFF] font-[Inter] font-bold">
                Logging You In...{" "}
            </h1>
        </section>
    );
}
