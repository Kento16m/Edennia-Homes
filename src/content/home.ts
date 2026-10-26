const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`;

export const home = {
  meta: {
    title: "Edennia Homes · Inmobiliaria premium en Paraguay",
    description: "Casas, apartamentos y condominios en Paraguay para compradores europeos. 0% de impuestos sobre ganancias extranjeras y gestión de residencia gratis.",
  },
  header: {
    logoAlt: "Edennia Homes",
    nav: [
      { label: "Inicio", href: "/" },
      { label: "Casas", href: "/propiedades?type=casas" },
      { label: "Apartamentos", href: "/propiedades?type=apartamentos" },
      { label: "Condominios", href: "/propiedades?type=condominios" },
      { label: "Inversión", href: "/propiedades?type=oportunidades" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Consultar ahora",
    menu: "Abrir menú",
    close: "Cerrar menú",
    language: "Idioma",
  },
  rail: [
    { key: "home", label: "Inicio", href: "#inicio" },
    { key: "categories", label: "Categorías", href: "#categorias" },
    { key: "whatsapp", label: "WhatsApp", href: "#" },
    { key: "phone", label: "Teléfono", href: "#" },
    { key: "email", label: "Email", href: "#" },
  ],
  hero: {
    image: img("photo-1613977257363-707ba9348227"),
    eyebrow: "INMOBILIARIA PREMIUM · PARAGUAY",
    titleBefore: "Tu próxima gran ",
    titleAccent: "inversión",
    titleAfter: " empieza aquí.",
    text: "Disfruta de 0% de impuestos sobre ganancias de origen extranjero y obtén la gestión de tu residencia paraguaya 100% gratis con la compra de tu propiedad en Edennia Homes.",
    primary: "Explorar propiedades",
    secondary: "Hablar con un asesor",
    search: {
      categories: ["Todas las categorías", "Casas", "Apartamentos", "Condominios", "Oportunidades de inversión"],
      location: "Ubicación",
      price: "Rango de precio",
      button: "Buscar",
    },
    featuredLabel: "PROPIEDAD DESTACADA",
    prev: "Anterior",
    next: "Siguiente",
    stats: [
      { value: "6,6%", label: "Crecimiento real de Paraguay en 2025" },
      { value: "4,3%", label: "Crecimiento medio proyectado 2026-2028" },
      { value: "0%", label: "Impuestos sobre ganancias de origen extranjero" },
    ],
    ctaCard: { title: "Empieza tu inversión", text: "Cuéntanos qué buscas" },
  },
  categories: {
    eyebrow: "EXPLORA POR CATEGORÍA",
    title: "Un portafolio pensado para cada estilo de vida",
    items: [
      { title: "Casas Unifamiliares", text: "Residencias con jardín para toda la familia.", link: "Ver casas", href: "/propiedades?type=casas", image: img("photo-1564013799919-ab600027ffc6") },
      { title: "Apartamentos", text: "Apartamentos modernos con amenities premium.", link: "Ver apartamentos", href: "/propiedades?type=apartamentos", image: img("photo-1545324418-cc1a3fa10c00") },
      { title: "Condominios", text: "Vida en comunidad con seguridad y áreas verdes.", link: "Ver condominios", href: "/propiedades?type=condominios", image: img("photo-1600047509807-ba8f99d2cdde") },
      { title: "Oportunidades de Inversión", text: "Propiedades destacadas, promociones y ventas sobre plano.", link: "Ver oportunidades", href: "/propiedades?type=oportunidades", image: img("photo-1512917774080-9991f1c4c750") },
    ],
  },
  featured: {
    eyebrow: "SELECCIÓN EDENNIA",
    title: "Propiedades destacadas",
    viewAll: "Ver todas",
    tags: { featured: "Destacada", offPlan: "Sobre plano", ready: "Listo para habitar" },
    specs: { bedrooms: "dorm.", bathrooms: "baños", garages: "gar." },
  },
  why: {
    eyebrow: "¿POR QUÉ EDENNIA HOMES?",
    title: "Te acompañamos desde la primera consulta hasta tu nueva etapa en Paraguay.",
    items: [
      { key: "personal", title: "Atención personalizada", text: "Escuchamos tus objetivos y te asesoramos según tu situación real." },
      { key: "market", title: "Conocimiento del mercado paraguayo", text: "Trabajamos con foco local para detectar oportunidades con criterio." },
      { key: "transparency", title: "Transparencia en todo el proceso", text: "Información clara sobre pasos, tiempos, costes y documentación." },
      { key: "support", title: "Acompañamiento completo", text: "Desde la primera consulta hasta el cierre de la compra." },
      { key: "residency", title: "Gestión de residencia", text: "Orientación para tramitar tu residencia como beneficio para clientes." },
    ],
  },
  services: {
    eyebrow: "NUESTROS SERVICIOS",
    title: "Soluciones inmobiliarias integrales para compradores internacionales",
    items: [
      "Compra y venta de propiedades.",
      "Búsqueda personalizada.",
      "Asesoramiento para inversión inmobiliaria.",
      "Acompañamiento durante todo el proceso de compra.",
      "Gestión de residencia para compradores.",
    ],
    benefit: {
      eyebrow: "BENEFICIO DIFERENCIAL",
      strong: "Un beneficio adicional para nuestros clientes.",
      text: " Al comprar una propiedad con Edennia Homes, también podrás acceder a acompañamiento en la gestión de tu residencia en Paraguay.",
    },
  },
  howToBuy: {
    eyebrow: "CÓMO COMPRAS CON NOSOTROS",
    title: "Cuatro pasos claros desde tu consulta hasta tu residencia.",
    steps: [
      { num: "01", title: "Contacto", text: "Escríbenos y cuéntanos con detalle qué buscas." },
      { num: "02", title: "Selección", text: "Te acompañamos a elegir la propiedad ideal según tus objetivos." },
      { num: "03", title: "Compra", text: "Gestionamos el proceso de compra de forma transparente y segura." },
      { num: "04", title: "Residencia", text: "Te orientamos en la gestión de tu residencia en Paraguay." },
    ],
    stats: [
      { eyebrow: "CRECIMIENTO 2025", value: "6,6%", text: "Crecimiento real de la economía paraguaya en 2025." },
      { eyebrow: "PROYECCIÓN 2026-2028", value: "4,3%", text: "Crecimiento medio proyectado por el Banco Mundial." },
    ],
  },
  commitment: {
    eyebrow: "NUESTRO COMPROMISO",
    title: "Un servicio cercano, profesional y enfocado en resultados reales.",
    chips: [
      "Atención personalizada.",
      "Conocimiento del mercado paraguayo.",
      "Transparencia en todo el proceso.",
      "Acompañamiento desde la primera consulta hasta la compra.",
      "Gestión y orientación para la residencia como beneficio para nuestros clientes.",
    ],
  },
  faq: {
    eyebrow: "PREGUNTAS FRECUENTES",
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Puede un extranjero comprar una propiedad en Paraguay?",
        // TODO(REVIEW)
        a: "Sí. La normativa paraguaya reconoce igualdad de trato entre la inversión nacional y la extranjera, por lo que un extranjero puede comprar propiedades en las mismas condiciones generales que un ciudadano paraguayo.",
      },
      {
        q: "¿Cómo es el proceso de compra?",
        // TODO(REVIEW)
        a: "El proceso suele incluir la elección de la propiedad, la verificación de la documentación, la firma del acuerdo correspondiente y la escrituración ante notario. Te acompañamos en cada paso para que sea transparente y seguro.",
      },
      {
        q: "¿Qué impuestos se pagan?",
        // TODO(REVIEW)
        a: "Depende de la operación y de tu situación. Como referencia general, en Paraguay el IRE es del 10% y el IVA se sitúa entre el 5% y el 10% según la operación. Te orientamos sobre tu caso concreto antes de comprar.",
      },
      {
        q: "¿Cómo funciona la residencia?",
        // TODO(REVIEW)
        a: "Paraguay ofrece vías de residencia para extranjeros que desean vivir o invertir en el país. Como beneficio para nuestros clientes, te orientamos y acompañamos en la gestión de tu residencia tras la compra de tu propiedad.",
      },
      {
        q: "¿Necesito viajar a Paraguay?",
        // TODO(REVIEW)
        a: "Gran parte del proceso puede organizarse a distancia, aunque algunos trámites pueden requerir tu presencia o un apoderado. Te informamos con antelación de qué pasos puedes hacer desde Europa y cuáles conviene hacer en el país.",
      },
      {
        q: "¿Cuánto tiempo lleva el proceso?",
        // TODO(REVIEW)
        a: "Los plazos varían según la propiedad, la documentación y los trámites de cada caso. Desde la primera consulta te damos una estimación clara y te mantenemos informado en cada etapa.",
      },
    ],
  },
  about: {
    eyebrow: "SOBRE EDENNIA HOMES",
    title: "Somos el aliado inmobiliario para quienes llegan desde Europa a Paraguay.",
    mission: {
      title: "Misión",
      text: "Ayudar a personas y familias, especialmente de España y Europa, a encontrar oportunidades inmobiliarias en Paraguay, con acompañamiento cercano, transparente y profesional durante todo el proceso de compra. Como valor añadido, acompañamos a nuestros clientes en la gestión de su residencia en Paraguay para que su llegada al país sea más sencilla y segura.",
    },
    vision: {
      title: "Visión",
      text: "Ser la inmobiliaria de referencia para europeos que desean invertir o establecerse en Paraguay, destacándonos por la confianza, el asesoramiento personalizado y un servicio integral antes, durante y después de la compra.",
    },
  },
  whyInvest: {
    eyebrow: "¿POR QUÉ INVERTIR EN PARAGUAY?",
    title: "Un país de oportunidades para invertir, vivir y crecer",
    intro: "Paraguay se consolida como uno de los destinos más atractivos de Sudamérica para invertir, comprar propiedad o empezar una nueva etapa de vida.",
    dataBox: {
      eyebrow: "DATO ECONÓMICO DESTACADO",
      text: "En 2025, la economía paraguaya registró un crecimiento real del 6,6%, y el Banco Mundial proyecta que mantenga un crecimiento medio cercano al 4,3% entre 2026 y 2028.",
    },
    items: [
      { key: "economy", title: "Economía dinámica y en crecimiento", text: "Una de las economías más dinámicas de la región, con margen real para seguir expandiéndose." },
      { key: "market", title: "Mercado inmobiliario en expansión", text: "Nuevos desarrollos residenciales y zonas urbanas en crecimiento con oportunidades concretas." },
      { key: "tax", title: "Sistema tributario competitivo", text: "IRE del 10% e IVA del 5-10% según la operación y la situación de cada comprador." },
      { key: "equality", title: "Igualdad para el inversor extranjero", text: "La normativa paraguaya reconoce igualdad de trato entre inversión nacional y extranjera." },
      { key: "location", title: "Ubicación estratégica en Sudamérica", text: "Posición central en la región, con frontera con Brasil y Argentina." },
      { key: "life", title: "Calidad de vida", text: "Ciudades en crecimiento, entorno natural y un ritmo de vida más equilibrado." },
    ],
    closing: "Mientras otros mercados ya presentan precios muy elevados y una fuerte competencia, Paraguay continúa desarrollando nuevas zonas residenciales, edificios, condominios y proyectos inmobiliarios.",
  },
  contact: {
    eyebrow: "CONTÁCTANOS",
    title: "Estamos para ayudarte a decidir.",
    text: "Escríbenos y te respondemos en menos de 24 horas.",
    phone: "+595 975 500 150",
    phoneHref: "tel:+595975500150",
    whatsappHref: "https://wa.me/595975500150",
    whatsappMessage: "Hola, quisiera recibir asesoramiento para encontrar una propiedad.",
    email: "info@edennia.homes",
    address: "Teniente Malutín 516, Asunción",
    mapTitle: "Edennia Homes en el mapa",
    form: {
      title: "Escríbenos",
      subtitle: "Cuéntanos qué buscas y te responderemos con opciones concretas.",
      whatsapp: "Escríbenos por WhatsApp",
      fields: {
        name: "Nombre",
        email: "Email",
        phone: "Teléfono",
        type: "Tipo de propiedad",
        typeOptions: ["Casas", "Apartamentos", "Condominios", "Oportunidades de inversión"],
        message: "Mensaje",
        messageDefault: "Hola, quisiera recibir asesoramiento para encontrar una propiedad.",
        consent: "He leído y acepto la política de privacidad.",
      },
      errors: {
        name: "Indícanos tu nombre.",
        email: "Introduce un email válido.",
        message: "Cuéntanos brevemente qué buscas.",
        consent: "Debes aceptar la política de privacidad.",
      },
      submit: "Enviar consulta",
      sending: "Enviando…",
      note: "Respondemos en menos de 24 h · Sin compromiso",
      successTitle: "¡Consulta enviada!",
      successText: "Gracias por escribirnos. Te responderemos en menos de 24 horas.",
      errorText: "No se ha podido enviar la consulta. Inténtalo de nuevo.",
    },
  },
  footer: {
    tagline: "Edennia Homes te acompaña en la búsqueda de tu próxima propiedad. Casas, apartamentos y condominios seleccionados con criterio y calidez.",
    columns: {
      properties: {
        title: "PROPIEDADES",
        links: ["Casas Unifamiliares", "Apartamentos", "Condominios", "Oportunidades de Inversión"],
      },
      legal: {
        title: "LEGAL",
        links: ["Aviso legal", "Privacidad", "Términos de uso", "Tasaciones"],
      },
      contact: { title: "CONTACTO" },
      newsletter: {
        title: "NEWSLETTER",
        placeholder: "tu@email.com",
        subscribe: "Suscribirme",
        success: "¡Gracias! Te has suscrito correctamente.",
        error: "Introduce un email válido.",
      },
    },
    bottom: "© 2026 Edennia Homes. Todos los derechos reservados. Desarrollado por Kento Terakawa.",
    backToTop: "Volver arriba",
    whatsappLabel: "Escríbenos por WhatsApp",
  },
} as const;
