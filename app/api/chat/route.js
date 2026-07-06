export async function POST(request) {
  const { message } = await request.json();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: message }] }]
    })
  });

  const data = await response.json();

  if (data.error) {
    return Response.json({ error: data.error.message }, { status: 500 });
  }

  const reply = data.candidates[0].content.parts[0].text;
  return Response.json({ reply });
}