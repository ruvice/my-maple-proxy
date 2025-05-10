export default async function handler(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url, `http://localhost`);
  
    const path = searchParams.get("path");
    const apiKey = process.env.OPEN_API_KEY2;
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
  
    const url = new URL(`${domain}/${path}`);
    for (const [key, value] of searchParams.entries()) {
      if (key !== "path") url.searchParams.append(key, value);
    }
    console.log(url)
    const response = await fetch(url.toString(), {
      headers: { "x-nxopen-api-key": apiKey },
    });
  
    const body = await response.text(); // Forward raw response
    return new Response(body, {
        status: response.status,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin
        },
    });
}

export const config = {
    runtime: "edge",
};