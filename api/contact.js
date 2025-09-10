export default async function handler(req, res) {
  res.setHeader('content-type', 'application/json');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  try {
    const body = await new Promise((resolve, reject) => { let d=''; req.on('data', c=>d+=c); req.on('end', ()=>{ try{ resolve(JSON.parse(d||'{}')) }catch(e){ reject(e) } }) })
    res.status(200).json({ ok: true, received: body });
  } catch (e) { res.status(500).json({ error: 'Contact error' }) }
}