// src/lib/getWeb3Key.ts
export function getWeb3Key(form?: HTMLFormElement): string | null {
  const fromEnv = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
  if (fromEnv && fromEnv.trim()) return fromEnv;

  const meta = document.querySelector('meta[name="web3forms-key"]') as HTMLMetaElement | null;
  if (meta?.content && meta.content.trim()) return meta.content;

  const hidden = form?.querySelector<HTMLInputElement>('input[name="access_key"]');
  if (hidden?.value && hidden.value.trim()) return hidden.value;

  return null;
}
