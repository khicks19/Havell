export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' }); return;
  }
  try {
    const body = req.body || (await parseJson(req));
    // In production, you'd save to DB and email via Postmark/Resend here.
    res.status(200).json({ ok: true, received: body || {} });
  } catch (e) {
    res.status(500).json({ error: 'RFQ error' });
  }
}

async function parseJson(req){
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
  });
}
