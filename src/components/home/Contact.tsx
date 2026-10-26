import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { home } from "@/content/home";
import { FadeUp, Eyebrow } from "./primitives";

const t = home.contact;

const schema = z.object({
  name: z.string().trim().min(1, t.form.errors.name).max(100),
  email: z.string().trim().email(t.form.errors.email).max(255),
  phone: z.string().trim().max(30).optional(),
  type: z.string(),
  message: z.string().trim().min(1, t.form.errors.message).max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: t.form.errors.consent }) }),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { message: t.form.fields.messageDefault, type: t.form.fields.typeOptions[0] },
  });

  const onSubmit = async () => {
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 900)); // envío simulado
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const whatsappUrl = `${t.whatsappHref}?text=${encodeURIComponent(t.whatsappMessage)}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(t.address)}&output=embed`;

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <FadeUp>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-normal leading-tight text-foreground md:text-5xl">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.text}</p>
          <ul className="mt-8 space-y-4 text-foreground">
            <li className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary"><Phone className="h-5 w-5" /></span>
              <a href={t.phoneHref} className="font-medium hover:text-primary">{t.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary"><Mail className="h-5 w-5" /></span>
              <a href={`mailto:${t.email}`} className="font-medium hover:text-primary">{t.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary"><MapPin className="h-5 w-5" /></span>
              <span className="font-medium">{t.address}</span>
            </li>
          </ul>
          <div className="mt-8 overflow-hidden rounded-[28px] shadow-soft">
            <iframe title={t.mapTitle} src={mapSrc} loading="lazy" className="h-72 w-full border-0" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="glass-light rounded-[32px] border-t-4 border-t-primary p-8 shadow-soft md:p-10">
            {status === "success" ? (
              <div className="flex h-full min-h-96 flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary"><CheckCircle2 className="h-8 w-8" /></span>
                <h3 className="mt-6 text-2xl text-foreground">{t.form.successTitle}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.form.successText}</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl text-foreground">{t.form.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.form.subtitle}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
                >
                  <MessageCircle className="h-5 w-5" />{t.form.whatsapp}
                </a>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input {...register("name")} placeholder={t.form.fields.name} className={inputClass} aria-label={t.form.fields.name} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register("email")} type="email" placeholder={t.form.fields.email} className={inputClass} aria-label={t.form.fields.email} />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input {...register("phone")} type="tel" placeholder={t.form.fields.phone} className={inputClass} aria-label={t.form.fields.phone} />
                    <select {...register("type")} className={inputClass} aria-label={t.form.fields.type}>
                      {t.form.fields.typeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <textarea {...register("message")} rows={4} placeholder={t.form.fields.message} className={inputClass} aria-label={t.form.fields.message} />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                  </div>
                  <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div>
                    <label className="flex items-start gap-3 text-sm text-muted-foreground">
                      <input {...register("consent")} type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
                      {t.form.fields.consent}
                    </label>
                    {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent.message}</p>}
                  </div>
                  {status === "error" && <p className="text-sm text-destructive">{t.form.errorText}</p>}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-forest-foreground transition hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {status === "sending" ? t.form.sending : t.form.submit}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">{t.form.note}</p>
                </form>
              </>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
