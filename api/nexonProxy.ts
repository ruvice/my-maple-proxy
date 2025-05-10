export default async function handler(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url, `http://localhost`);


    console.log('something')
  
    const path = searchParams.get("path");
    const apiKey = process.env.OPEN_API_KEY2;
    const domain = 'https://open.api.nexon.com'
  
    if (!path || !apiKey || !domain) {
        console.log('wtf', path, apiKey, domain)
        return new Response(JSON.stringify({ error: "Missing path or env vars" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
    });
}

export const config = {
    runtime: "edge",
};