import { MessageCircle } from "lucide-react";

import { home } from "@/content/home";

const contact = home.contact;

export function WhatsAppButton() {
  const url = `${contact.whatsappHref}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={home.footer.whatsappLabel}
      className="fixed bottom-[88px] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-105 hover:bg-primary-hover md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
