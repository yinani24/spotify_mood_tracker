import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {redirect} from 'next/navigation';

const clientId = process.env.CLIENT_ID || '';
// const code = undefined;

export async function GET(req: NextRequest){
    const code = req.nextUrl.searchParams.get("code");
    //console.log(code)
    if (!code) {
        const values = await redirectToAuthCodeFlow(clientId);
        const res = NextResponse.next()
        // res.cookies.set("verifier", values['verifier']);
        return NextResponse.redirect(values.redirect_url);
    } else {
        try{
            const verifier = req.cookies.get("verifier");
            const verifierValue = verifier ? verifier.value : '';
            const accessToken = await getAccessToken(verifierValue, clientId, code);
            return await fetchProfile(accessToken);
        }catch(error){
            console.error(error);
        }
    }
}

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    // req.cookies.set("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    //NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
    return {'verifier': verifier, 'redirect_url': `https://accounts.spotify.com/authorize?${params.toString()}`}
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    //const data = new TextEncoder().encode(codeVerifier);
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(codeVerifier);
    let digest = hash.digest();
    //const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(verifierValue: string, clientId: string, code: string) {

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/dashboard");
    params.append("code_verifier", verifierValue!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token: string){
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

// function populateUI(profile: any) {
//     // TODO: Update UI with profile data
// }