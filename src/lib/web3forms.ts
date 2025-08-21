export type Web3SubmitResult = { success: boolean; message?: string };

const ENDPOINT = "https://api.web3forms.com/submit";

export async function submitWeb3Form(
  formEl: HTMLFormElement,
  extras: Record<string, string> = {}
): Promise<Web3SubmitResult> {
  const fd = new FormData(formEl);

  const key = (import.meta as any)?.env?.VITE_WEB3FORMS_KEY as string | undefined;
  if (!key) return { success: false, message: "Missing VITE_WEB3FORMS_KEY" };
  fd.set("access_key", key);

  Object.entries(extras).forEach(([k, v]) => fd.set(k, v));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: fd,
  });

  const data = await res.json().catch(() => ({} as any));
  if (!res.ok || (data as any)?.success !== true) {
    return { success: false, message: (data as any)?.message || `Request failed (${res.status})` };
  }
  return { success: true };
}


