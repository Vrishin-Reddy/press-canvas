// src/lib/sendForm.ts
export type AttachOut = { filename: string; content: string; content_type?: string; size?: number };

export async function filesToBase64(inputs: HTMLInputElement[]): Promise<AttachOut[]> {
  const outs: AttachOut[] = [];
  for (const input of inputs) {
    const files = input.files;
    if (!files) continue;
    for (const f of Array.from(files)) {
      const buf = await f.arrayBuffer();
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf))); // base64
      outs.push({ filename: f.name, content: b64, content_type: f.type || undefined, size: f.size });
    }
  }
  return outs;
}

export async function sendToEdge(payload: any) {
  const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
