// api/test.ts - Simple test endpoint
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === "OPTIONS") return res.status(200).end();
  
  return res.status(200).json({
    ok: true,
    method: req.method,
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
      RESEND_FROM: process.env.RESEND_FROM ? 'SET' : 'MISSING',
      RESEND_TO: process.env.RESEND_TO || 'DEFAULT',
    }
  });
}
