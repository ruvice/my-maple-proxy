import { MapleServer } from "@ruvice/my-maple-models";
import { toMapleServer } from "./utils/constants";
import { getNext2amSGTEpoch } from "./utils/network/helper";

export default async function handler(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url, `http://localhost`) || req.headers.get("referer");;
  
    const path = searchParams.get("path");
    const serverParam = searchParams.get("server") ?? 'SEA';
    const server = toMapleServer(serverParam);
    const apiKey = server === MapleServer.KMS ? process.env.KMS_OPEN_API_KEY : process.env.SEA_OPEN_API_KEY;
    const serverPath = server === MapleServer.KMS ? 'maplestory/' : 'maplestorysea/'
    const domain = 'https://open.api.nexon.com'
    const allowedOrigins = [
        "https://localhost:8080",
        "https://extension-files.twitch.tv",
        "https://vgxcnnkl2o4t2k8fbdrqszhbphh9pc.ext-twitch.tv"
    ];
      
    const origin = req.headers.get("origin") || req.headers.get("referer");
      
    if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "null" // block
            }
        });
    }
  
    if (!path || !apiKey || !domain) {
        return new Response(JSON.stringify({ error: "Missing path or env vars" }), {
            status: 400,
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": origin 
            },
        });
    }
  
    const url = new URL(`${domain}/${serverPath + path}`);
    console.log(searchParams)
    for (const [key, value] of searchParams.entries()) {
        if (key !== "path" && key !== "server") {
            url.searchParams.append(key, value);
        }
    }
    console.log(url.toString())
    const response = await fetch(url.toString(), {
      headers: { "x-nxopen-api-key": apiKey },
    });
  
    const body = await response.text(); // Forward raw response
    const targetEpoch = getNext2amSGTEpoch(); // your desired expiry
    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(0, targetEpoch - now);

    return new Response(body, {
        status: response.status,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
            'Cache-Control': `s-maxage=${ttl}, stale-while-revalidate=60`
        },
    });
}

export const config = {
    runtime: "edge",
};