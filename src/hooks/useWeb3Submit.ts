import * as React from "react";
import { submitWeb3Form } from "@/lib/web3forms";
import { toast } from "sonner";

export function useWeb3Submit(
  buildExtras?: (form: HTMLFormElement) => Record<string, string>
) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const id = toast.loading("Sending your message…");

    try {
      const formEl = e.currentTarget;

      const fd = new FormData(formEl);
      const name = (fd.get("name") as string) || "";
      const subject = (fd.get("subject") as string) || "General Inquiry";

      const extras = {
        from_name: "Sri Sharada Press Website",
        subject: `${subject} — ${name}`,
        ...((buildExtras && buildExtras(formEl)) || {}),
      };

      const result = await submitWeb3Form(formEl, extras);
      if (!result.success) throw new Error(result.message);

      toast.dismiss(id);
      toast.success("Thanks! Your message was sent. We’ll reply shortly.");
      formEl.reset();
    } catch (err: any) {
      toast.dismiss(id);
      toast.error(err?.message || "Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
}


