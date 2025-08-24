// src/lib/uploadcare.ts
export async function uploadToUploadcare(file: File): Promise<string> {
  const pubKey = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY as string | undefined;
  if (!pubKey) throw new Error("Uploadcare not configured");

  const fd = new FormData();
  fd.set("UPLOADCARE_PUB_KEY", pubKey);
  fd.set("UPLOADCARE_STORE", "auto");
  fd.set("file", file);

  const res = await fetch("https://upload.uploadcare.com/base/", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.file) throw new Error(json?.error?.content || "File upload failed");

  const safeName = encodeURIComponent(file.name);
  return `https://ucarecdn.com/${json.file}/${safeName}`;
}
