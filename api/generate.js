export default async function handler(req, res) {
  // Sirf POST request ko allow karenge
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Environment Variable se API key uthayenge (Duniya se chhupi hui)
  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = "gemini-2.5-flash";
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body) // Frontend se aaya hua data Google ko bhejenge
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Backend proxy error: ' + error.message });
  }
}