// src/lib/filesToBase64.ts
export type AttachOut = { filename: string; content: string; contentType?: string; size?: number };

export async function filesToBase64(inputs: HTMLInputElement[]): Promise<AttachOut[]> {
  const outs: AttachOut[] = [];
  for (const input of inputs) {
    const files = input.files;
    if (!files) continue;
    for (const f of Array.from(files)) {
      const buf = await f.arrayBuffer();
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      outs.push({ filename: f.name, content: b64, contentType: f.type || undefined, size: f.size });
    }
  }
  return outs;
}
