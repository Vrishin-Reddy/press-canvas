export function getWhatsAppLink(message?: string): string {
  const envNumber = (import.meta as any)?.env?.VITE_WHATSAPP_NUMBER as string | undefined
  const fallbackNumber = '919391011520'
  const number = (envNumber && /^(\d{7,15})$/.test(envNumber)) ? envNumber : fallbackNumber
  const base = `https://wa.me/${number}`
  if (message && message.trim().length > 0) {
    return `${base}?text=${encodeURIComponent(message)}`
  }
  return base
}


