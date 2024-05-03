import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const code = req.nextUrl.searchParams.get("code");
    if(code){
        try{
            const accessToken = req.cookies.get("accessToken") || '';
            const accessTokenValue = accessToken ? accessToken.value : "";
            const profile = await getRecentTracks(accessTokenValue);
            return NextResponse.json({profile: profile}, {status: 200});
        }catch(error){
            console.error(error);
            return NextResponse.json({error: error}, {status: 404});
        }
    }
}

async function getRecentTracks(accessToken: string){
    const response = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played',
        {
            method: 'GET',
            headers: {
                Authroization: `Bearer ${accessToken}`
            }
        }
    )
}