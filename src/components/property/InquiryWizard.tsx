import {
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  KeyRound,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  Scale,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { propertyContent } from "@/content/property";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

const phonePrefixes = [
  { label: "ES +34", value: "+34" },
  { label: "DE +49", value: "+49" },
  { label: "FR +33", value: "+33" },
  { label: "IT +39", value: "+39" },
  { label: "NL +31", value: "+31" },
  { label: "PL +48", value: "+48" },
  { label: "GB +44", value: "+44" },
  { label: "PY +595", value: "+595" },
] as const;

const intentOptions = [
  { id: "more-info", label: "Quiero más información", subtitle: "Necesito saber más detalles", icon: Info },
  { id: "visit", label: "Agendar una visita", subtitle: "Quiero ver la propiedad en persona", icon: CalendarCheck },
  { id: "buy", label: "Me interesa comprarla", subtitle: "Estoy listo para continuar", icon: KeyRound },
  { id: "compare", label: "Estoy comparando opciones", subtitle: "Quiero evaluar alternativas", icon: Scale },
] as const;

const channelOptions = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email", label: "Email", icon: Mail },
  { id: "call", label: "Llamada", icon: Phone },
] as const;

const timingOptions = ["Lo antes posible", "En 1-3 meses", "Más adelante", "Solo estoy mirando"] as const;
const timingMapping = ["soon", "1-3-months", "later", "just-looking"] as const;

const visitAvailabilityOptions = [
  "Entre semana por la mañana",
  "Entre semana por la tarde",
  "Fin de semana",
  "Visita virtual por videollamada",
] as const;
const visitAvailabilityMapping = ["week-morning", "week-afternoon", "weekend", "virtual"] as const;

const wizardSteps = [
  { id: 0, label: "Qué buscas" },
  { id: 1, label: "Preferencias" },
  { id: 2, label: "Tus datos" },
] as const;

const schema = z
  .object({
    intent: z.enum(["more-info", "visit", "buy", "compare"], { required_error: "Elige una opción" }),
    channel: z.enum(["whatsapp", "email", "call"], { required_error: "Elige tu canal preferido" }),
    timing: z.enum(["soon", "1-3-months", "later", "just-looking"], { required_error: "Indica cuándo piensas decidir" }),
    visitAvailability: z.enum(["week-morning", "week-afternoon", "weekend", "virtual"]).optional(),
    name: z.string().trim().min(2, "Escribe tu nombre").max(80),
    email: z.string().trim().email("Introduce un email válido"),
    phone: z.string().trim().min(6, "Escribe un teléfono válido"),
    phonePrefix: z.enum(["+34", "+49", "+33", "+39", "+31", "+48", "+44", "+595"], { required_error: "Elige un prefijo" }),
    consent: z.literal(true, { errorMap: () => ({ message: "Debes aceptar la política de privacidad" }) }),
    message: z.string().trim().min(20, "Escribe un mensaje más detallado"),
    honeypot: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.intent === "visit" && !value.visitAvailability) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["visitAvailability"],
        message: "Elige una disponibilidad de visita",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

type InquiryWizardProps = {
  property: Property;
  compact?: boolean;
  onClose?: () => void;
  onExplore?: () => void;
};

export function InquiryWizard({ property, compact = false, onClose }: InquiryWizardProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [manualMessage, setManualMessage] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      intent: "more-info",
      channel: "whatsapp",
      timing: "soon",
      visitAvailability: "week-morning",
      name: "",
      email: "",
      phonePrefix: "+34",
      phone: "",
      consent: false,
      message: "",
      honeypot: "",
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = form;
  const values = watch();

  useEffect(() => {
    if (step === 2 && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (!manualMessage) {
      const nextMessage = buildMessage({
        property,
        intent: values.intent,
        channel: values.channel,
        timing: values.timing,
        visitAvailability: values.visitAvailability,
      });
      if (nextMessage !== values.message) {
        setValue("message", nextMessage, { shouldDirty: false, shouldTouch: false });
      }
    }
  }, [manualMessage, property, setValue, values]);

  const completedStep2 = useMemo(() => {
    if (!values.channel) return false;
    if (!values.timing) return false;
    if (values.intent === "visit") return Boolean(values.visitAvailability);
    return true;
  }, [values.channel, values.intent, values.timing, values.visitAvailability]);

  const summaryChips = [
    { key: "intent", label: getIntentLabel(values.intent) },
    { key: "channel", label: getChannelLabel(values.channel) },
    { key: "timing", label: getTimingLabel(values.timing) },
  ];

  const progress = ((step + 1) / wizardSteps.length) * 100;

  const goNext = () => {
    if (step === 0) {
      setDirection("forward");
      setStep(1);
      return;
    }

    if (step === 1 && completedStep2) {
      setDirection("forward");
      setStep(2);
    }
  };

  const firstName = values.name.trim().split(/\s+/).filter(Boolean)[0] || "amigo";
  const submitDisabledReason = !values.consent && !submitting ? "Acepta la política de privacidad para enviar" : "";
  const currentLocationHref = typeof window !== "undefined" ? window.location.href : "";

  const goBack = () => {
    if (step > 0) {
      setDirection("backward");
      setStep((prev) => prev - 1);
    }
  };

  const onIntentSelect = (intent: FormValues["intent"]) => {
    setValue("intent", intent, { shouldValidate: true });
    setDirection("forward");
    window.setTimeout(() => setStep(1), 350);
  };

  const handleSubmitForm = handleSubmit(async (payload) => {
    const output = {
      propertyId: property.slug,
      reference: property.reference,
      intent: payload.intent,
      channel: payload.channel,
      timing: payload.timing,
      visitAvailability: payload.visitAvailability ?? null,
      name: payload.name,
      email: payload.email,
      phonePrefix: payload.phonePrefix,
      phone: payload.phone,
      message: payload.message,
      consent: payload.consent,
    };

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Inquiry payload", output);
    setSubmitting(false);
    setSuccess(true);
  });

  const resetWizard = () => {
    setStep(0);
    setDirection("forward");
    setSuccess(false);
    setManualMessage(false);
    form.reset({
      intent: "more-info",
      channel: "whatsapp",
      timing: "soon",
      visitAvailability: "week-morning",
      name: "",
      email: "",
      phonePrefix: "+34",
      phone: "",
      consent: false,
      message: "",
      honeypot: "",
    });
  };

  if (success) {
    return (
      <div className={cn("rounded-[32px] border border-border bg-card/80 p-5 shadow-soft backdrop-blur-xl", compact && "border-0 bg-transparent p-0 shadow-none")}>
        <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[28px] bg-primary-soft p-6 text-center">
          <div className="relative z-10">
            <svg viewBox="0 0 120 120" className="mx-auto h-24 w-24 text-primary">
              <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="6" className="inquiry-success-ring" />
              <path
                d="M34 60 L53 80 L88 42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inquiry-success-check"
              />
            </svg>
          </div>

          <div className="relative z-10 mt-6">
            <h3 className="font-serif text-4xl text-foreground">¡Gracias, {firstName}!</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Hemos recibido tu consulta sobre {property.title}. Te responderemos en menos de 24 h por {getChannelLabel(values.channel)}.
            </p>
          </div>

          <div className="relative z-10 mt-6 flex w-full min-w-0 flex-col gap-3">
            <a
              href={`https://wa.me/595975500150?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} (ref. ${property.reference}). Estoy revisando la información y quiero seguir hablando sobre ella.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp ahora
            </a>
            <button
              type="button"
              onClick={() => {
                if (onClose) onClose();
                document.getElementById("resumen")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground"
            >
              Seguir explorando
            </button>
            <button
              type="button"
              onClick={resetWizard}
              className="inline-flex w-full items-center justify-center rounded-full bg-transparent px-1 py-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Hacer otra consulta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[32px] border border-border bg-card/80 p-4 shadow-soft backdrop-blur-xl", compact && "rounded-t-[32px] rounded-b-none border-0 bg-transparent p-0 shadow-none")}>
      <div className="mb-5 rounded-[24px] border border-border bg-primary-soft p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-forest text-white">
            <img src="/logo-light.png" alt="Edennia Homes" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Asesor de Edennia Homes</p>
            <p className="mt-1 text-xs text-muted-foreground">Respondemos en menos de 24 h</p>
          </div>
          <span className="relative flex h-2.5 w-2.5 rounded-full bg-[#2CC36A]">
            <span className="absolute inset-0 rounded-full bg-[#2CC36A] animate-pulse" />
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <a
            href={`https://wa.me/595975500150?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} (ref. ${property.reference}) y quiero más información. Enlace: ${currentLocationHref}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-xs font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a href="tel:+595975500150" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground">
            <Phone className="h-4 w-4" />
            Llamar
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">Sin compromiso · Tus datos están protegidos</p>
      </div>

      <div className="mb-4">
        <h2 className="mb-3 font-serif text-2xl text-foreground">Consultar esta propiedad</h2>
        <div className="flex items-center gap-3 rounded-[22px] bg-primary-soft p-3">
          <img src={property.images[0]} alt={property.title} className="h-14 w-14 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{property.title}</p>
            <p className="text-xs text-muted-foreground">{property.reference}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span>Consulta</span>
          <span>{step + 1}/3</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="mt-3 flex justify-between gap-2 text-[10px] font-medium text-muted-foreground">
          {wizardSteps.map((item, index) => (
            <span key={item.id} className={cn("transition-colors", index <= step && "text-primary")}>{item.label}</span>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="relative min-h-[360px] overflow-hidden">
        <div key={step} className={cn("w-full", direction === "forward" ? "animate-inquiry-forward" : "animate-inquiry-backward")}>
          {step === 0 && (
            <div>
              <h2 className="mb-4 font-serif text-3xl text-foreground">¿Qué te gustaría hacer?</h2>
              <div className="grid gap-3">
                {intentOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = values.intent === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onIntentSelect(option.id)}
                      className={cn(
                        "group flex items-center gap-3 rounded-[24px] border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft",
                        selected ? "border-primary bg-primary-soft shadow-soft" : "border-border bg-background",
                      )}
                    >
                      <span className={cn("flex h-12 w-12 items-center justify-center rounded-full transition", selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-semibold text-foreground">{option.label}</span>
                        <span className="block text-sm text-muted-foreground">{option.subtitle}</span>
                      </span>
                      {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 font-serif text-3xl text-foreground">¿Cómo y cuándo te contactamos?</h2>
                <div className="grid grid-cols-3 gap-2">
                  {channelOptions.map((channel) => {
                    const Icon = channel.icon;
                    const selected = values.channel === channel.id;
                    return (
                      <button
                        key={channel.id}
                        type="button"
                        onClick={() => setValue("channel", channel.id, { shouldValidate: true })}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-[20px] border p-3 text-center transition hover:-translate-y-0.5",
                          selected ? "border-primary bg-primary-soft text-primary" : "border-border bg-background text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{channel.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">¿Cuándo piensas decidir?</p>
                <div className="flex flex-wrap gap-2">
                  {timingOptions.map((choice, index) => {
                    const selected = values.timing === timingMapping[index];
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setValue("timing", timingMapping[index], { shouldValidate: true })}
                        className={cn(
                          "rounded-full border px-3 py-2 text-sm transition hover:-translate-y-0.5",
                          selected ? "border-primary bg-primary-soft text-primary" : "border-border bg-background text-foreground",
                        )}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>

              {values.intent === "visit" && (
                <div className="overflow-hidden transition-all duration-300 ease-out">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">Disponibilidad para la visita</p>
                    <div className="flex flex-wrap gap-2">
                      {visitAvailabilityOptions.map((choice, index) => {
                        const selected = values.visitAvailability === visitAvailabilityMapping[index];
                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setValue("visitAvailability", visitAvailabilityMapping[index], { shouldValidate: true })}
                            className={cn(
                              "rounded-full border px-3 py-2 text-sm transition hover:-translate-y-0.5",
                              selected ? "border-primary bg-primary-soft text-primary" : "border-border bg-background text-foreground",
                            )}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 font-serif text-3xl text-foreground">Cuéntanos quién eres</h2>
              <form onSubmit={handleSubmitForm} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingInput
                    label="Nombre"
                    inputRef={firstFieldRef}
                    {...register("name")}
                    error={errors.name?.message}
                    valid={Boolean(values.name && !errors.name)}
                  />
                  <FloatingInput label="Email" type="email" {...register("email")} error={errors.email?.message} valid={Boolean(values.email && !errors.email)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Prefijo</label>
                    <select
                      {...register("phonePrefix")}
                      className={cn(
                        "h-12 w-full rounded-2xl border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                        errors.phonePrefix ? "border-destructive animate-shake" : values.phonePrefix ? "border-primary" : "border-border",
                      )}
                    >
                      {phonePrefixes.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.phonePrefix && <p className="mt-1 text-xs text-destructive">{errors.phonePrefix.message}</p>}
                  </div>
                  <FloatingInput label="Teléfono" type="tel" {...register("phone")} error={errors.phone?.message} valid={Boolean(values.phone && !errors.phone)} />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mensaje</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    onInput={(event) => {
                      const target = event.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${Math.min(target.scrollHeight, 8 * 24)}px`;
                    }}
                    onChange={(event) => {
                      setManualMessage(true);
                      setValue("message", event.target.value, { shouldValidate: true });
                    }}
                    className={cn(
                      "min-h-[7rem] max-h-[12rem] w-full resize-none overflow-hidden rounded-[22px] border bg-background p-4 text-sm text-foreground shadow-inner transition focus:outline-none focus:ring-2 focus:ring-primary/20",
                      errors.message ? "border-destructive" : values.message ? "border-primary" : "border-border",
                    )}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>

                <div className="flex flex-wrap gap-2">
                  {summaryChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={() => {
                        if (chip.key === "intent") setStep(0);
                        if (chip.key === "channel" || chip.key === "timing") setStep(1);
                      }}
                      className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:-translate-y-0.5"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <label className="flex items-start gap-3 rounded-[20px] border border-border bg-background p-3 text-sm text-foreground">
                  <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  <span>Acepto la política de privacidad</span>
                </label>
                {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}
                <input type="hidden" {...register("honeypot")} />

                <div className="flex gap-3">
                  <button type="button" onClick={goBack} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">
                    <ChevronLeft className="h-4 w-4" />
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !isValid || !values.consent}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
                      !submitting && "hover:-translate-y-0.5",
                    )}
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar consulta
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                {submitDisabledReason && (
                  <p className="mt-2 text-xs text-destructive">{submitDisabledReason}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      {step < 2 && (
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <button type="button" onClick={goBack} disabled={step === 0} className={cn("inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition", step > 0 && "text-foreground hover:text-primary")}>
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={step === 0 ? !values.intent : !completedStep2}
            className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition", step === 0 ? (values.intent ? "bg-primary text-primary-foreground" : "cursor-not-allowed bg-muted text-muted-foreground") : completedStep2 ? "bg-primary text-primary-foreground" : "cursor-not-allowed bg-muted text-muted-foreground")}
          >
            {step === 0 ? "Siguiente" : "Continuar"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function FloatingInput({
  label,
  error,
  valid,
  inputRef,
  ...props
}: {
  label: string;
  error?: string;
  valid?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="relative">
        <input
          ref={inputRef}
          {...props}
          className={cn(
            "h-12 w-full rounded-2xl border bg-background px-4 pr-10 text-sm text-foreground transition focus:outline-none focus:ring-2 focus:ring-primary/20",
            error ? "border-destructive animate-shake" : valid ? "border-primary" : "border-border",
          )}
        />
        {valid && <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function buildMessage({
  property,
  intent,
  channel,
  timing,
  visitAvailability,
}: {
  property: Property;
  intent: FormValues["intent"];
  channel: FormValues["channel"];
  timing: FormValues["timing"];
  visitAvailability?: FormValues["visitAvailability"];
}) {
  const intentText = {
    "more-info": "quisiera más información",
    visit: "quisiera agendar una visita",
    buy: "me interesa comprarla",
    compare: "estoy comparando opciones",
  }[intent];

  const channelText = {
    whatsapp: "Prefiero que me contactéis por WhatsApp",
    email: "Prefiero que me contactéis por email",
    call: "Prefiero que me contactéis por llamada",
  }[channel];

  const timingText = {
    soon: "Estoy valorando decidir lo antes posible",
    "1-3-months": "Estoy valorando decidir en 1-3 meses",
    later: "Estoy valorando decidir más adelante",
    "just-looking": "Solo estoy mirando",
  }[timing];

  const visitText = visitAvailability
    ? visitAvailability === "virtual"
      ? " y querría una visita virtual"
      : visitAvailability === "week-morning"
        ? " y me gustaría una visita entre semana por la mañana"
        : visitAvailability === "week-afternoon"
          ? " y me gustaría una visita entre semana por la tarde"
          : " y me gustaría una visita el fin de semana"
    : "";

  return `Hola, me interesa ${property.title} (ref. ${property.reference}) y ${intentText}${visitText}. ${channelText}. ${timingText}.`;
}

function getIntentLabel(intent: FormValues["intent"]) {
  return {
    "more-info": "Más información",
    visit: "Agendar visita",
    buy: "Comprar",
    compare: "Comparando opciones",
  }[intent];
}

function getChannelLabel(channel: FormValues["channel"]) {
  return {
    whatsapp: "WhatsApp",
    email: "Email",
    call: "Llamada",
  }[channel];
}

function getTimingLabel(timing: FormValues["timing"]) {
  return {
    soon: "Lo antes posible",
    "1-3-months": "En 1-3 meses",
    later: "Más adelante",
    "just-looking": "Solo mirando",
  }[timing];
}

function formatPrice(value: number) {
  return `USD ${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
