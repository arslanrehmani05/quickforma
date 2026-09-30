export default async function handler(req: any, res: any) {
  // Enable CORS headers for Sanity Studio
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY secret environment variable is not configured in Vercel.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const rawText = body?.rawText;

    if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
      return res.status(400).json({ error: 'Missing rawText content in request payload.' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert financial and business content structured JSON parser.
Analyze the following document and parse it into a JSON object matching this TypeScript interface:

{
  "title": string,
  "slug": string,
  "shortDefinition": string,
  "categoryName": string,
  "synonyms": string[],
  "simpleExplanationMarkdown": string,
  "howItWorksMarkdown": string,
  "formulaMethodMarkdown": string,
  "workedExampleMarkdown": string,
  "interpretationMarkdown": string,
  "realWorldApplicationsMarkdown": string,
  "commonMistakesMarkdown": string,
  "faqs": Array<{ "question": string, "answer": string }>,
  "relatedTools": string[],
  "seoTitle": string,
  "metaDescription": string
}

Return ONLY valid JSON. Do not include markdown code block ticks (\`\`\`json).

Document:
${rawText}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Gemini API error (${response.status}): ${errorText}` });
    }

    const jsonRes = await response.json();
    const textOutput = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJsonText = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsedJson = JSON.parse(cleanJsonText);
    return res.status(200).json(parsedJson);
  } catch (error: any) {
    console.error('Gemini Serverless API issue:', error);
    return res.status(500).json({ error: error.message || 'Server error processing Gemini request' });
  }
}
