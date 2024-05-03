import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.CLIENT_ID || '';
// const code = undefined;

export async function GET(req: NextRequest){
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
        const values = await redirectToAuthCodeFlow(clientId);
        const res = NextResponse.redirect(values.redirect_url);
        res.cookies.set("verifier", values.verifier);
        return res;
    } else {
        try{
            const verifier = req.cookies.get("verifier")
            const verifierValue = verifier? verifier.value : '';
            const accessToken = await getAccessToken(verifierValue, clientId, code);
            const profile = await fetchProfile(accessToken);
            const res = NextResponse.json({profile: profile}, {status: 200});
            res.cookies.set("accessToken", accessToken);
            return res;
        }catch(error){
            console.error(error);
            return NextResponse.json({error: error}, {status: 404});
        }
    }
}

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

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
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(codeVerifier);
    let digest = hash.digest();
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
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifierValue);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });

    const access_token = await result.json();
    console.log("Access Token", access_token)
    return access_token.access_token;
}

async function fetchProfile(token: string){
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    const final = await result.json();
    console.log("Profile", final)
    return final;
}