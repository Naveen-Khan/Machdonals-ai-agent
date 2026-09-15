export async function POST(req) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://naveen-khan.app.n8n.cloud/webhook/9c586978-d61f-45ce-ae00-9c274f07ee26/chat";
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data || `HTTP Error ${response.status}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
