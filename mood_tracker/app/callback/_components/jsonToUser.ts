'use server';

import sha256 from "@/components/sha256";

export default async function jsonToUser(json: string) {
    const parsedJson = JSON.parse(json);
    const user = {
        id: sha256(parsedJson.id),
        display_name: parsedJson.display_name,
        email: parsedJson.email,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        spotifyId: parsedJson.id,
        spotifyURL: parsedJson.external_urls.spotify,
    };
    return user;
}