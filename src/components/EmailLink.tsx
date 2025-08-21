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

  const onClick = () => {
    setTimeout(() => {
      const accept = window.confirm(
        "It looks like no email app opened. Open Gmail compose instead?"
      );
      if (accept) {
        try {
          window.open(gmailCompose, "_blank", "noopener,noreferrer");
        } catch {}
      } else {
        navigator.clipboard
          .writeText(email)
          .then(() => toast.success("Email address copied"))
          .catch(() => toast.info(`Email: ${email}`));
      }
    }, 800);
  };

  return (
    <a href={mailto} onClick={onClick} rel="noopener noreferrer" className={className}>
      {children ?? email}
    </a>
  );
}


