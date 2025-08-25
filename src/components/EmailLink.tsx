import * as React from "react";
import { toast } from "sonner";

type Props = {
  email: string;
  subject?: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function EmailLink({
  email,
  subject,
  body,
  className,
  children,
}: Props) {
  const mailto = React.useMemo(() => {
    const q = new URLSearchParams();
    if (subject) q.set("subject", subject);
    if (body) q.set("body", body);
    const qs = q.toString();
    return `mailto:${email}${qs ? `?${qs}` : ""}`;
  }, [email, subject, body]);

  const gmailCompose = React.useMemo(() => {
    const q = new URLSearchParams();
    q.set("to", email);
    if (subject) q.set("su", subject);
    if (body) q.set("body", body || "");
    return `https://mail.google.com/mail/?view=cm&fs=1&${q.toString()}`;
  }, [email, subject, body]);

  const outlookCompose = React.useMemo(() => {
    const q = new URLSearchParams();
    q.set("to", email);
    if (subject) q.set("subject", subject);
    if (body) q.set("body", body || "");
    // Works for outlook.live.com and redirects to sign-in if needed
    return `https://outlook.live.com/mail/0/deeplink/compose?${q.toString()}`;
  }, [email, subject, body]);

  const isMobile = React.useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      // Let the OS preferred mail app handle the mailto link
      return;
    }

    // Desktop: offer a quick chooser for Gmail/Outlook/System
    e.preventDefault();
    const choice = window.prompt("Open email with: 1) Gmail  2) Outlook  3) Default app", "1");
    try {
      if (choice === "1") {
        window.open(gmailCompose, "_blank", "noopener,noreferrer");
        return;
      }
      if (choice === "2") {
        window.open(outlookCompose, "_blank", "noopener,noreferrer");
        return;
      }
      // Fallback to system mail client
      window.location.href = mailto;
    } catch {
      navigator.clipboard
        .writeText(email)
        .then(() => toast.success("Email address copied"))
        .catch(() => toast.info(`Email: ${email}`));
    }
  };

  return (
    <a href={mailto} onClick={onClick} rel="noopener noreferrer" className={className}>
      {children ?? email}
    </a>
  );
}


