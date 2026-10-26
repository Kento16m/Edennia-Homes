import casa1 from "@/assets/p-casa-1.webp";
import casa2 from "@/assets/p-casa-2.webp";
import casa3 from "@/assets/p-casa-3.webp";
import apto1 from "@/assets/p-apto-1.webp";
import apto2 from "@/assets/p-apto-2.webp";
import apto3 from "@/assets/p-apto-3.webp";
import condo1 from "@/assets/p-condo-1.webp";
import condo2 from "@/assets/p-condo-2.webp";
import condo3 from "@/assets/p-condo-3.webp";

export type PropertyCategory = "casas" | "apartamentos" | "condominios";

const toWebp = (value: string) => value.replace(/\.(png|jpe?g)(\?.*)?$/i, ".webp");
const toWebpList = (values: string[] = []) => values.map((value) => toWebp(value));

export interface PropertyUnit {
  label: string;
  labelEn?: string;
  area: string;
  areaEn?: string;
  price: number;
  floor?: string;
  floorEn?: string;
}

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  price: number;
  originalPrice?: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  land?: number;
  garage: number;
  year?: number;
  amenities?: string[];
  amenitiesEn?: string[];
  communityAmenities?: string[];
  communityAmenitiesEn?: string[];
  slogans?: string[];
  slogansEn?: string[];
  images: string[];
  description: string;
  descriptionEn?: string;
  featured?: boolean;
  offer?: boolean;
  offerLabel?: string;
  offerLabelEn?: string;
  plans?: string[];
  mapEmbedUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  whatsappMessageEn?: string;
  units?: PropertyUnit[];
  unitNote?: string;
  unitNoteEn?: string;
}

const baseProperties: Property[] = [
  {
    id: "M4L2A",
    title: "Casa M4 L2A",
    category: "casas",
    price: 145252,
    location: "Barrio Paraíso, Luque, Paraguay",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3429.260708655995!2d-57.4602646!3d-25.2783157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945db12162bcb9a7%3A0x7b41bd2cad5aa44a!2sBarrio%20PARA%C3%8DSO!5e1!3m2!1ses-419!2py!4v1790864891425!5m2!1ses-419!2py",
    bedrooms: 3,
    bathrooms: 3,
    area: 120,
    land: 221,
    garage: 1,
    year: 2024,
    amenities: [
      "Placares en dormitorios incluidos",
      "Cocina equipada e integrada",
      "Parrilla portátil incluida",
      "Aire acondicionado instalado",
      "Iluminación LED",
      "Instalaciones completas",
    ],
    communityAmenities: [
      "Clubhouse con piscina de 20 metros",
      "Plaza de 2.500 m²",
      "Seguridad 24/7",
    ],
    slogans: [
      "Un paraíso natural para vivir mejor",
      "Tu nuevo hogar entre la naturaleza",
      "Viví en Barrio Paraíso donde la naturaleza y el confort se encuentran.",
    ],
    slogansEn: [
      "A natural paradise to live better",
      "Your new home amid nature",
      "Live in Barrio Paraíso where nature and comfort meet.",
    ],
    images: [
      "/M4L2A/m4l2a1.webp",
      "/M4L2A/m4l2a2.webp",
      "/M4L2A/m4l2a3.webp",
      "/M4L2A/m4l2a4.webp",
      "/M4L2A/m4l2a5.webp",
      "/M4L2A/m4l2a6.webp",
      "/M4L2A/m4l2a7.webp",
      "/M4L2A/m4l2a8.webp",
      "/M4L2A/m4l2a9.webp",
    ],
    description:
      "Casa M4 L2A en Barrio Paraíso es una propuesta pensada para quienes buscan confort, tranquilidad y una conexión natural con el entorno. Con distribución funcional, ambientes luminosos y acabados de calidad, la vivienda ofrece una experiencia de vida cotidiana más relajada y completa en Luque.",
    descriptionEn:
      "House M4 L2A in Barrio Paraíso is designed for buyers seeking comfort, tranquility, and a natural connection to the surroundings. With a functional layout, bright spaces, and quality finishes, this home offers a more relaxed and complete everyday living experience in Luque.",
    amenitiesEn: [
      "Wardrobes in bedrooms included",
      "Equipped and integrated kitchen",
      "Portable grill included",
      "Air conditioning installed",
      "LED lighting",
      "Full installation",
    ],
    communityAmenitiesEn: [
      "Clubhouse with a 20-meter pool",
      "2,500 m² plaza",
      "24/7 security",
    ],
    featured: true,
  },
  {
    id: "M4L2B",
    title: "Casa M4 L2B",
    category: "casas",
    price: 145252,
    location: "Barrio Paraíso, Luque, Paraguay",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3429.260708655995!2d-57.4602646!3d-25.2783157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945db12162bcb9a7%3A0x7b41bd2cad5aa44a!2sBarrio%20PARA%C3%8DSO!5e1!3m2!1ses-419!2py!4v1790864891425!5m2!1ses-419!2py",
    bedrooms: 3,
    bathrooms: 3,
    area: 120,
    land: 221,
    garage: 1,
    year: 2024,
    amenities: [
      "Placares en dormitorios incluidos",
      "Cocina equipada e integrada",
      "Parrilla portátil incluida",
      "Aire acondicionado instalado",
      "Iluminación LED",
      "Instalaciones completas",
    ],
    communityAmenities: [
      "Clubhouse con piscina de 20 metros",
      "Plaza de 2.500 m²",
      "Seguridad 24/7",
    ],
    slogans: [
      "Un paraíso natural para vivir mejor",
      "Tu nuevo hogar entre la naturaleza",
      "Viví en Barrio Paraíso donde la naturaleza y el confort se encuentran.",
    ],
    slogansEn: [
      "A natural paradise to live better",
      "Your new home amid nature",
      "Live in Barrio Paraíso where nature and comfort meet.",
    ],
    images: [
      "/M4L2B/m4l2b1.webp",
      "/M4L2B/m4l2b2.webp",
      "/M4L2B/m4l2b3.webp",
      "/M4L2B/m4l2b4.webp",
      "/M4L2B/m4l2b5.webp",
      "/M4L2B/m4l2b6.webp",
    ],
    description:
      "Casa M4 L2B en Barrio Paraíso ofrece una alternativa moderna y funcional para vivir con comodidad, naturaleza y una distribución eficiente. La vivienda combina espacios claros, ventilación natural y un estilo de vida tranquilo en el corazón de Luque.",
    descriptionEn:
      "House M4 L2B in Barrio Paraíso offers a modern, functional alternative for living with comfort, nature, and efficient distribution. The home combines bright spaces, natural ventilation, and a peaceful lifestyle in the heart of Luque.",
    amenitiesEn: [
      "Wardrobes in bedrooms included",
      "Equipped and integrated kitchen",
      "Portable grill included",
      "Air conditioning installed",
      "LED lighting",
      "Full installation",
    ],
    communityAmenitiesEn: [
      "Clubhouse with a 20-meter pool",
      "2,500 m² plaza",
      "24/7 security",
    ],
    featured: true,
  },
  {
    id: "M4L3",
    title: "Casa M4 L3",
    category: "casas",
    price: 206507,
    location: "Barrio Paraíso, Luque, Paraguay",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3429.260708655995!2d-57.4602646!3d-25.2783157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945db12162bcb9a7%3A0x7b41bd2cad5aa44a!2sBarrio%20PARA%C3%8DSO!5e1!3m2!1ses-419!2py!4v1790864891425!5m2!1ses-419!2py",
    bedrooms: 3,
    bathrooms: 3,
    area: 177,
    land: 360,
    garage: 1,
    year: 2024,
    amenities: [
      "Placares en dormitorios",
      "Cocina equipada",
      "Parrilla portátil incluida",
      "Aire acondicionado instalado",
      "Iluminación LED",
      "Instalaciones completas",
    ],
    communityAmenities: [
      "Clubhouse con piscina de 20 metros",
      "Plaza de 2.500 m²",
      "Seguridad 24/7",
    ],
    slogans: [
      "Un paraíso natural para vivir mejor",
      "Tu nuevo hogar entre la naturaleza",
      "Viví en Barrio Paraíso donde la naturaleza y el confort se encuentran.",
    ],
    slogansEn: [
      "A natural paradise to live better",
      "Your new home amid nature",
      "Live in Barrio Paraíso where nature and comfort meet.",
    ],
    images: [
      "/M4L3/m4l39.webp",
      "/M4L3/m4l310.webp",
      "/M4L3/m4l32.webp",
      "/M4L3/m4l33.webp",
      "/M4L3/m4l34.webp",
      "/M4L3/m4l35.webp",
      "/M4L3/m4l36.webp",
      "/M4L3/m4l37.webp",
      "/M4L3/m4l38.webp",
    ],
    description:
      "Casa M4 L3 en Barrio Paraíso combina un entorno natural, confort y una distribución funcional para quienes buscan vivir con equilibrio entre la vida urbana y la tranquilidad del campo. Con amplios espacios, buena luminosidad y un diseño pensado para la vida cotidiana, esta vivienda ofrece una experiencia única en Luque.",
    descriptionEn:
      "House M4 L3 in Barrio Paraíso combines a natural setting, comfort, and a functional layout for those seeking a balance between urban life and countryside calm. With generous spaces, great natural light, and a practical design, this home offers a distinctive living experience in Luque.",
    amenitiesEn: [
      "Wardrobes in bedrooms",
      "Equipped kitchen",
      "Portable grill included",
      "Air conditioning installed",
      "LED lighting",
      "Full installation",
    ],
    communityAmenitiesEn: [
      "Clubhouse with a 20-meter pool",
      "2,500 m² plaza",
      "24/7 security",
    ],
    featured: true,
  },
  {
    id: "M4L6B",
    title: "Casa M4 L6B",
    category: "casas",
    price: 150017,
    location: "Barrio Paraíso, Luque, Paraguay",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3429.260708655995!2d-57.4602646!3d-25.2783157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945db12162bcb9a7%3A0x7b41bd2cad5aa44a!2sBarrio%20PARA%C3%8DSO!5e1!3m2!1ses-419!2py!4v1790864891425!5m2!1ses-419!2py",
    bedrooms: 3,
    bathrooms: 3,
    area: 127,
    land: 201,
    garage: 1,
    year: 2024,
    amenities: [
      "Placares en dormitorios",
      "Cocina equipada",
      "Parrilla portátil incluida",
      "Aire acondicionado instalado",
      "Iluminación LED",
      "Instalaciones completas",
    ],
    communityAmenities: [
      "Clubhouse con piscina de 20 metros",
      "Plaza de 2.500 m²",
      "Seguridad 24/7",
    ],
    slogans: [
      "Un paraíso natural para vivir mejor",
      "Tu nuevo hogar entre la naturaleza",
      "Viví en Barrio Paraíso donde la naturaleza y el confort se encuentran.",
    ],
    slogansEn: [
      "A natural paradise to live better",
      "Your new home amid nature",
      "Live in Barrio Paraíso where nature and comfort meet.",
    ],
    images: [
      "/M4L6B/m4l6b1.webp",
      "/M4L6B/m4l6b10.webp",
      "/M4L6B/m4l6b2.webp",
      "/M4L6B/m4l6b3.webp",
      "/M4L6B/m4l6b4.webp",
      "/M4L6B/m4l6b5.webp",
      "/M4L6B/m4l6b6.webp",
      "/M4L6B/m4l6b7.webp",
      "/M4L6B/m4l6b8.webp",
      "/M4L6B/m4l6b9.webp",
    ],
    description:
      "Casa M4 L6B en Barrio Paraíso combina diseño funcional, confort y un entorno natural ideal para vivir en familia. Con amplios espacios, cocina integrada, garaje privado y una excelente relación entre naturaleza y comodidad, esta vivienda ofrece una propuesta equilibrada y moderna en Luque.",
    descriptionEn:
      "House M4 L6B in Barrio Paraíso combines functional design, comfort, and a natural setting ideal for family living. With expansive spaces, an integrated kitchen, private garage, and a strong balance between nature and convenience, this home offers a modern and well-rounded proposal in Luque.",
    amenitiesEn: [
      "Wardrobes in bedrooms",
      "Equipped kitchen",
      "Portable grill included",
      "Air conditioning installed",
      "LED lighting",
      "Full installation",
    ],
    communityAmenitiesEn: [
      "Clubhouse with a 20-meter pool",
      "2,500 m² plaza",
      "24/7 security",
    ],
    featured: true,
  },
  {
    id: "ALEMANIA-SAJONIA",
    title: "Alemania Sajonia",
    category: "apartamentos",
    price: 113126,
    location: "AZ Alemania Sajonia, Barrio Sajonia, Asunción, Paraguay",
    bedrooms: 2,
    bathrooms: 2,
    area: 72.6,
    garage: 1,
    year: 2026,
    amenities: [
      "Cocina y comedor integrados",
      "Living con balcón",
      "Dormitorios con placares",
      "Baños equipados con espejo y mampara",
      "Ambientes climatizados",
      "Acceso residencial controlado",
    ],
    communityAmenities: [
      "Lobby y área zen",
      "Gimnasio y área kids",
      "Quincho climatizado",
      "Quincho al aire libre",
      "Piscina con deck",
      "Área de tereré",
    ],
    slogans: [
      "Edificio terminado en Barrio Sajonia",
      "Confort, estilo y ubicación premium en Asunción.",
    ],
    slogansEn: [
      "Completed building in Barrio Sajonia",
      "Comfort, style, and a premium location in Asunción.",
    ],
    images: [
      "/Apartamentos/AlemaniaSajonia/01_PORTADA_Vista_aerea_real.webp",
      "/Apartamentos/AlemaniaSajonia/02_Fachada_real.webp",
      "/Apartamentos/AlemaniaSajonia/03_Acceso_y_jardin.webp",
      "/Apartamentos/AlemaniaSajonia/04_Piscina.webp",
      "/Apartamentos/AlemaniaSajonia/05_Gimnasio.webp",
      "/Apartamentos/AlemaniaSajonia/06_Quincho.webp",
      "/Apartamentos/AlemaniaSajonia/07_Dormitorio_modelo.webp",
      "/Apartamentos/AlemaniaSajonia/08_Living_comedor_modelo.webp",
      "/Apartamentos/AlemaniaSajonia/09_Living_modelo.webp",
      "/Apartamentos/AlemaniaSajonia/10_Comedor_modelo.webp",
      "/Apartamentos/AlemaniaSajonia/12_Living_departamento.webp",
      "/Apartamentos/AlemaniaSajonia/13_Balcon_y_vista.webp",
      "/Apartamentos/AlemaniaSajonia/14_RENDER_Edificio.webp",
      "/Apartamentos/AlemaniaSajonia/16_RENDER_Gimnasio.webp",
      "/Apartamentos/AlemaniaSajonia/17_RENDER_Quincho_abierto.webp",
      "/Apartamentos/AlemaniaSajonia/18_RENDER_Cocina.webp",
      "/Apartamentos/AlemaniaSajonia/19_Cocina_departamento.webp",
      "/Apartamentos/AlemaniaSajonia/19_RENDER_Vista_desde_balcon.webp",
      "/Apartamentos/AlemaniaSajonia/67_pre_inauguraci_n_Ale1.00_06_26_19.Imagen_fija013.webp",
    ],
    plans: [
      "/Apartamentos/AlemaniaSajonia/planos/01_Planta_niveles_1_al_5.webp",
      "/Apartamentos/AlemaniaSajonia/planos/02_Planos_Tipos_B_y_G.webp",
      "/Apartamentos/AlemaniaSajonia/planos/03_Plano_Tipo_H.webp",
      "/Apartamentos/AlemaniaSajonia/planos/04_Cocheras_Planta_Baja.webp",
      "/Apartamentos/AlemaniaSajonia/planos/05_Cocheras_Nivel_1.webp",
      "/Apartamentos/AlemaniaSajonia/planos/RN02_ALEMANIA_SAJONIA_-_COMEDOR_INTEGRADO_1.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d214.31213762212252!2d-57.6563456!3d-25.2877432!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945d09937c25c0cf%3A0x9cd2709ed49f52eb!2sAZ%20Alemania%20Sajonia!5e1!3m2!1ses-419!2py!4v1791894141431!5m2!1ses-419!2py",
    description:
      "Alemania Sajonia es un edificio residencial terminado con una ubicación estratégica en Barrio Sajonia, sobre Isabel La Católica casi Mariano Roque Alonso, en Asunción. La propuesta combina funcionalidad, distribución moderna y comodidades para una vida urbana cómoda y equilibrada.\n\nEl proyecto cuenta con 9 niveles y 71 departamentos, con unidades de dos dormitorios pensadas para familias, inversionistas o compradores que buscan vivir en una zona consolidada y bien conectada.\n\nLas unidades disponibles incluyen departamentos con cocina y comedor integrados, living, balcón, dormitorios con placares y baños equipados con espejo y mampara. Los ambientes cuentan con climatización, buena luminosidad y un diseño pensado para el confort diario.\n\nEntre sus amenities destacan lobby y área zen, gimnasio y área kids, quincho climatizado y al aire libre, piscina con deck y área de tereré, sala de reuniones, coworking interior y exterior.\n\nPrecio: Desde USD 113.126\nSuperficie desde: 72,60 m²\nEstructura: 9 niveles | 71 departamentos\nUbicación: Isabel La Católica casi Mariano Roque Alonso, Barrio Sajonia, Asunción, Paraguay\nForma de pago: 40% de entrega inicial + 3 refuerzos del 5% + saldo en 30 cuotas mensuales\nCocheras: Opcionales y sujetas a disponibilidad y precio actualizado\n\nUnidades representativas:\n1. Tipo G (Piso 2) | 72,60 m² propios | USD 113.126\n2. Tipo B (Piso 2) | 77,86 m² propios | USD 121.165\n3. Tipo B (Piso 3) | 77,86 m² propios | USD 123.008\n\nOtras unidades y pisos disponibles. Consultar disponibilidad y precios actualizados.\n\nPrecios, disponibilidad, condiciones de pago y fecha de entrega sujetos a confirmación y posibles modificaciones. Los renders y las imágenes digitales son referenciales.",
    descriptionEn:
      "Alemania Sajonia is a completed residential building in a strategic location in Barrio Sajonia, near Isabel La Católica and Mariano Roque Alonso in Asunción. The project combines functionality, modern distribution, and amenities for a comfortable and balanced urban life.\n\nThe development has 9 levels and 71 apartments, featuring two-bedroom units designed for families, investors, and buyers seeking a well-connected and established area.\n\nAvailable units include integrated kitchen and dining spaces, living rooms, balconies, bedrooms with wardrobes, and bathrooms with mirror and partition. Interiors have climate control, good natural light, and a design focused on daily comfort.\n\nAmenities include a lobby and zen area, gym and kids area, climate-controlled and open barbecue area, pool with deck and tereré area, meeting room, and indoor-outdoor coworking.\n\nFrom USD 113,126 | Starting area: 72.60 m² | 9 levels | 71 apartments.\n\nRepresentative units: Type G, Type B, and Type B on the third floor. Other units and floors are available, subject to updated availability and pricing.",
    amenitiesEn: [
      "Integrated kitchen and dining area",
      "Living room with balcony",
      "Bedrooms with wardrobes",
      "Bathrooms equipped with mirror and glass partition",
      "Climate-controlled spaces",
      "Controlled residential access",
    ],
    communityAmenitiesEn: [
      "Lobby and zen area",
      "Gym and kids area",
      "Climate-controlled barbecue area",
      "Open barbecue area",
      "Pool with deck",
      "Tereré area",
    ],
    featured: true,
    offer: true,
    offerLabel: "Lista vigente",
    whatsappNumber: "595975500150",
    units: [
      { label: "Tipo G (Piso 2)", labelEn: "Type G (Floor 2)", area: "72,60 m² propios", areaEn: "72.60 m² private", price: 113126, floor: "Piso 2", floorEn: "Floor 2" },
      { label: "Tipo B (Piso 2)", labelEn: "Type B (Floor 2)", area: "77,86 m² propios", areaEn: "77.86 m² private", price: 121165, floor: "Piso 2", floorEn: "Floor 2" },
      { label: "Tipo B (Piso 3)", labelEn: "Type B (Floor 3)", area: "77,86 m² propios", areaEn: "77.86 m² private", price: 123008, floor: "Piso 3", floorEn: "Floor 3" },
    ],
    unitNote: "Otras unidades y pisos disponibles. Consultar disponibilidad y precios actualizados.",
    unitNoteEn: "Other units and floors are available. Please ask for updated availability and pricing.",
  },
  {
    id: "CENTRAL-PARK",
    title: "Central Park",
    category: "apartamentos",
    price: 92500,
    location: "Avda. Santísima Trinidad y Tte. Anastasio Delgado, Asunción, Paraguay",
    bedrooms: 1,
    bathrooms: 1,
    area: 58,
    garage: 1,
    year: 2026,
    amenities: [
      "Amplias terrazas",
      "Parrillero individual en departamentos de 2 dormitorios",
      "Aire acondicionado tipo split instalado",
      "Carpinterías, revestimientos y terminaciones de primera calidad",
      "Hall de acceso con terminaciones premium",
      "3 ascensores automáticos",
    ],
    communityAmenities: [
      "Barbacoa y parrillero de uso común",
      "Sala de relax con servicios y sauna",
      "Palieres con porcelanato",
      "Portón automático para acceso a garajes",
      "Portero eléctrico",
    ],
    slogans: [
      "Central Park - Apartamentos en Avda. Santísima Trinidad",
      "Ubicación estratégica con fácil acceso a los principales centros de la ciudad.",
    ],
    slogansEn: [
      "Central Park - Apartments on Avda. Santísima Trinidad",
      "Strategic location with easy access to the city's main centers.",
    ],
    images: [
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.51.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.52.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.53.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.54 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.54.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.57 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.13.57.webp",
    ],
    plans: [
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_1.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_2.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_3.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_4.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_5.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_6.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_7.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_8.webp",
      "/Apartamentos/Grupo Park/Edificio Central Park/Planos/Plano_9.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d214.33633929367562!2d-57.557096904860515!3d-25.27404422644892!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da606cf7efc43%3A0xa4617432cea55fb4!2sEdificio%20Central%20Park!5e1!3m2!1ses-419!2py!4v1791476831535!5m2!1ses-419!2py",
    description:
      "Central Park es un edificio residencial de Grupo Park, ubicado en la intersección de Avda. Santísima Trinidad y Tte. Anastasio Delgado, en una zona muy accesible de Asunción. La propuesta combina calidad constructiva, funcionalidad y una ubicación estratégica cerca de Aviadores del Chaco, Shopping del Sol, World Trade Center y Hotel Sheraton.\n\nEl edificio cuenta con 3 niveles de garajes y 12 niveles de viviendas, con 5 departamentos por planta: 3 de 1 dormitorio y 2 de 2 dormitorios. La planificación arquitectónica y la distribución de cada unidad buscan maximizar luz, ventilación y confort, además de generar espacios cálidos y funcionales para vivir todos los días.\n\nLas viviendas incluyen amplias terrazas, parrillero individual en departamentos de dos dormitorios, aire acondicionado tipo split, carpinterías y terminaciones de primera calidad. En cuanto a los amenities, el proyecto cuenta con hall de acceso premium, 3 ascensores automáticos, barbacoa y parrillero de uso común, sala de relax con servicios y sauna, palieres con porcelanato, portón automático para acceso a garajes y portero eléctrico.\n\nPrecio desde: USD 92.500\nCochera opcional: USD 16.500 (2,50 x 5 m)\nPrecios no incluyen IVA del 1,5%.\nEstructura: 3 niveles de garajes + 12 niveles de viviendas | 5 departamentos por planta\nUbicación: Avda. Santísima Trinidad y Tte. Anastasio Delgado, Asunción, Paraguay\n\nUnidades representativas:\n1. 1 Dormitorio (Medio - Dpto 1504 / 1505) | 58 m² propios (67 m² totales) | USD 92.500\n2. 1 Dormitorio (Contrafrente - Dpto 807 / 907) | 55 m² propios (64 m² totales) | USD 104.500\n3. 1 Dormitorio (Frente - Dpto 1502) | 60 m² propios (69 m² totales) | USD 109.500\n4. 2 Dormitorios (Contrafrente - Dpto 1106) | 80 m² propios (89 m² totales) | Parrillero individual | USD 135.500\n5. 2 Dormitorios (Frente - Dpto 501 / 601) | 106 m² propios (122 m² totales) | Parrillero individual | USD 165.000\n\nUnidades disponibles sujetas a confirmación antes de reserva. Precios no incluyen IVA (1,5%).",
    descriptionEn:
      "Central Park is a residential building by Grupo Park, located at the intersection of Avda. Santísima Trinidad and Tte. Anastasio Delgado in a very accessible area of Asunción. The project combines solid construction quality, functional layouts, and a strategic location near Aviadores del Chaco, Shopping del Sol, World Trade Center, and Hotel Sheraton.\n\nThe building has 3 parking levels and 12 residential levels, with 5 apartments per floor: 3 one-bedroom units and 2 two-bedroom units. The architectural planning and distribution of each unit maximize light, ventilation, and comfort while creating warm, functional spaces for everyday living.\n\nHomes include generous terraces, individual grills in two-bedroom units, split air conditioning, premium carpentry, and high-quality finishes. Amenities include a premium lobby, 3 automatic elevators, shared barbecue area, relaxation room with sauna, porcelain hallway finishes, automatic garage gate, and concierge service.\n\nFrom USD 92,500 | Optional garage: USD 16,500 | Prices exclude 1.5% VAT.\n\nRepresentative units: 1-bedroom and 2-bedroom options in several orientations. Availability is subject to confirmation before reservation.",
    amenitiesEn: [
      "Spacious terraces",
      "Individual grill in 2-bedroom units",
      "Split air conditioning installed",
      "Premium carpentry and finishes",
      "High-end access hall",
      "3 automatic elevators",
    ],
    communityAmenitiesEn: [
      "Shared barbecue and grill area",
      "Relaxation room with services and sauna",
      "Porcelain hallways",
      "Automatic garage access",
      "Electric concierge service",
    ],
    featured: true,
    offer: true,
    offerLabel: "En venta",
    offerLabelEn: "For sale",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el proyecto Central Park en Av. Santísima Trinidad. Quisiera consultar disponibilidad y formas de pago.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in Central Park on Av. Santísima Trinidad. I would like to check availability and payment options.",
    units: [
      { label: "1 Dormitorio (Medio - Dpto 1504 / 1505)", labelEn: "1 Bedroom (Middle - Unit 1504 / 1505)", area: "58 m² propios (67 m² totales)", areaEn: "58 m² private (67 m² total)", price: 92500, floor: "Medio", floorEn: "Middle" },
      { label: "1 Dormitorio (Contrafrente - Dpto 807 / 907)", labelEn: "1 Bedroom (Opposite-facing - Unit 807 / 907)", area: "55 m² propios (64 m² totales)", areaEn: "55 m² private (64 m² total)", price: 104500, floor: "Contrafrente", floorEn: "Opposite-facing" },
      { label: "1 Dormitorio (Frente - Dpto 1502)", labelEn: "1 Bedroom (Front - Unit 1502)", area: "60 m² propios (69 m² totales)", areaEn: "60 m² private (69 m² total)", price: 109500, floor: "Frente", floorEn: "Front" },
      { label: "2 Dormitorios (Contrafrente - Dpto 1106)", labelEn: "2 Bedrooms (Opposite-facing - Unit 1106)", area: "80 m² propios (89 m² totales)", areaEn: "80 m² private (89 m² total)", price: 135500, floor: "Contrafrente", floorEn: "Opposite-facing" },
      { label: "2 Dormitorios (Frente - Dpto 501 / 601)", labelEn: "2 Bedrooms (Front - Unit 501 / 601)", area: "106 m² propios (122 m² totales)", areaEn: "106 m² private (122 m² total)", price: 165000, floor: "Frente", floorEn: "Front" },
    ],
    unitNote: "Unidades disponibles sujetas a confirmación antes de reserva. Precios no incluyen IVA (1,5%).",
    unitNoteEn: "Units are subject to availability confirmation before reservation. Prices exclude 1.5% VAT.",
  },
  {
    id: "GARDEN-PARK",
    title: "Garden Park Premium Residences",
    category: "apartamentos",
    price: 107184,
    location: "Dr. Felipe Molas López 381, Asunción, Paraguay",
    bedrooms: 1,
    bathrooms: 1,
    area: 53,
    garage: 1,
    year: 2026,
    amenities: [
      "Terraza individual",
      "Aire acondicionado tipo split instalado",
      "Conexiones para fibra óptica y TV por cable en living y dormitorio",
      "Hall de acceso amplio",
      "Control de acceso y seguridad centralizada",
    ],
    communityAmenities: [
      "Piscina con solárium",
      "Barbacoa y sala de estar en barbacoa",
      "Gimnasio totalmente equipado",
      "Laundry",
      "Sistema de seguridad centralizado",
    ],
    communityAmenitiesEn: [
      "Pool with solarium",
      "Barbecue and lounge area",
      "Fully equipped gym",
      "Laundry",
      "Centralized security system",
    ],
    slogans: [
      "Garden Park - Apartamentos en el eje residencial de Asunción",
      "Ubicación estratégica cerca de Aviadores del Chaco, WTC y Av. Santa Teresa.",
    ],
    slogansEn: [
      "Garden Park - Apartments on Asunción's residential axis",
      "Strategic location near Aviadores del Chaco, WTC, and Av. Santa Teresa.",
    ],
    images: [
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.08.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.01.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.01 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.02.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.02 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.02 (2).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.03.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.04.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.05.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.05 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.05 (2).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.05 (3).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.07.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.07 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.07 (2).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.07 (3).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.09.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.09 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.10.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.10 (1).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.10 (2).webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Fotos para la web/WhatsApp Image 2026-10-01 at 11.14.11.webp",
    ],
    plans: [
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_1_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_2_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_3_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_4_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_5_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_6_.webp",
      "/Apartamentos/Grupo Park/Edificio Garden Park/Plano/Plano_7_.webp",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27433.805214610024!2d-57.58426134332364!3d-25.279555999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da75fa4a3547f%3A0x634c284a0c11e45c!2sEdificio%20Garden%20Park!5e1!3m2!1ses-419!2spy!4v1791471046944!5m2!1ses-419!2spy",
    description:
      "Garden Park Premium Residences es un edificio residencial de Grupo Park ubicado en Dr. Felipe Molas López 381, en una zona residencial y estratégica de Asunción, cerca de Aviadores del Chaco, WTC y Av. Santa Teresa. La propuesta combina una ubicación premium, una estructura moderna y una oferta de unidades funcionales para quienes buscan vivir en una zona consolidada de la capital.\n\nEl proyecto cuenta con un amplio edificio de 6.235 m², con 5 niveles de garajes (54 cocheras) y 11 niveles de viviendas. La propuesta se enfoca en departamentos de 1 dormitorio con buen nivel de terminación, terrazas, amplio hall de acceso y un sistema de seguridad centralizado.\n\nLas unidades incluyen terraza individual, aire acondicionado tipo split instalado, conexiones para fibra óptica y TV por cable en living y dormitorio. En cuanto a amenities, se encuentran piscina con solárium, barbacoa y sala de estar en barbacoa, gimnasio totalmente equipado, laundry, acceso controlado y un hall de entrada con calidad premium.\n\nPrecio desde: USD 107.184\nCochera opcional: USD 16.000\nEstado comercial: Lista vigente a Septiembre 2026. Los monoambientes se encuentran 100% vendidos. Solo quedan disponibles unidades de 1 dormitorio.\nPrecios no incluyen IVA del 1,5%.\n\nUnidades representativas:\n1. 1 Dormitorio (Contrafrente - Dpto 1105 / Piso 11) | 53 m² propios (66 m² totales) | USD 107.184\n2. 1 Dormitorio (Contrafrente - Dpto 806 / Piso 8) | 59 m² propios (74 m² totales) | USD 109.648\n3. 1 Dormitorio (Frente - Dpto 801 / Piso 8) | 58 m² propios (73 m² totales) | USD 112.112\n4. 1 Dormitorio (Contrafrente - Dpto 605 / Piso 6) | 67 m² propios (80 m² totales) | USD 117.040\n5. 1 Dormitorio (Contrafrente ampliado - Dpto 606 / Piso 6) | 83 m² propios (98 m² totales) | USD 133.056\n\nUnidades de 1 dormitorio sujetas a confirmación de disponibilidad. Precios no incluyen IVA (1,5%).",
    descriptionEn:
      "Garden Park Premium Residences is a residential building by Grupo Park located at Dr. Felipe Molas López 381, in a strategic residential area of Asunción, close to Aviadores del Chaco, WTC, and Av. Santa Teresa. The proposal combines a premium location, modern structure, and functional apartment layouts for those seeking a consolidated area in the capital.\n\nThe project consists of a large building of 6,235 m², with 5 garage levels (54 parking spaces) and 11 residential levels. The offering focuses on 1-bedroom apartments with a high finishing standard, terraces, a spacious lobby, and a centralized security system.\n\nUnits include individual terraces, installed split air conditioning, fiber-optic and cable TV connections in the living room and bedroom, a resort-style pool with solarium, barbecue lounge, fully equipped gym, laundry, controlled access, and a premium entrance hall.\n\nFrom USD 107,184 | Optional garage: USD 16,000 | Commercial status: current list as of September 2026. Studios are fully sold. Only 1-bedroom units remain available. Prices exclude 1.5% VAT.\n\nRepresentative units: 1-bedroom options on multiple floors and orientations. Unit availability is subject to confirmation.",
    amenitiesEn: [
      "Individual terrace",
      "Installed split air conditioning",
      "Fiber-optic and cable TV connections in living room and bedroom",
      "Spacious access hall",
      "Controlled access and centralized security",
    ],
    communityAmenitiesEn: [
      "Pool with solarium",
      "Barbecue and lounge area",
      "Fully equipped gym",
      "Laundry",
      "Centralized security system",
    ],
    featured: true,
    offer: true,
    offerLabel: "Lista vigente",
    offerLabelEn: "Current listing",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el proyecto Garden Park en Molas López. Quisiera consultar disponibilidad y opciones para los departamentos de 1 dormitorio.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in Garden Park on Molas López. I would like to check availability and options for 1-bedroom units.",
    units: [
      { label: "1 Dormitorio (Contrafrente - Dpto 1105 / Piso 11)", labelEn: "1 Bedroom (Opposite-facing - Unit 1105 / Floor 11)", area: "53 m² propios (66 m² totales)", areaEn: "53 m² private (66 m² total)", price: 107184, floor: "Piso 11", floorEn: "Floor 11" },
      { label: "1 Dormitorio (Contrafrente - Dpto 806 / Piso 8)", labelEn: "1 Bedroom (Opposite-facing - Unit 806 / Floor 8)", area: "59 m² propios (74 m² totales)", areaEn: "59 m² private (74 m² total)", price: 109648, floor: "Piso 8", floorEn: "Floor 8" },
      { label: "1 Dormitorio (Frente - Dpto 801 / Piso 8)", labelEn: "1 Bedroom (Front - Unit 801 / Floor 8)", area: "58 m² propios (73 m² totales)", areaEn: "58 m² private (73 m² total)", price: 112112, floor: "Piso 8", floorEn: "Floor 8" },
      { label: "1 Dormitorio (Contrafrente - Dpto 605 / Piso 6)", labelEn: "1 Bedroom (Opposite-facing - Unit 605 / Floor 6)", area: "67 m² propios (80 m² totales)", areaEn: "67 m² private (80 m² total)", price: 117040, floor: "Piso 6", floorEn: "Floor 6" },
      { label: "1 Dormitorio (Contrafrente ampliado - Dpto 606 / Piso 6)", labelEn: "1 Bedroom (Expanded opposite-facing - Unit 606 / Floor 6)", area: "83 m² propios (98 m² totales)", areaEn: "83 m² private (98 m² total)", price: 133056, floor: "Piso 6", floorEn: "Floor 6" },
    ],
    unitNote: "Unidades de 1 dormitorio sujetas a confirmación de disponibilidad. Precios no incluyen IVA (1,5%).",
    unitNoteEn: "1-bedroom units are subject to availability confirmation. Prices exclude 1.5% VAT.",
  },
  {
    id: "UNIVERSITY-PARK",
    title: "University Park",
    category: "condominios",
    price: 33500,
    location: "Destacamento Cazal y Wenceslao López, San Lorenzo, Paraguay",
    bedrooms: 0,
    bathrooms: 1,
    area: 26,
    garage: 0,
    amenities: [
      "A pasos de la UNA (Campus Universitario)",
      "Monoambientes totalmente amoblados y equipados",
      "Rentabilidad estimada de hasta 9% anual en USD",
      "Hall de acceso principal de 150 m²",
      "Seguridad y ambiente pensado para la vida universitaria",
    ],
    communityAmenities: [
      "Studios compactos y funcionales con baño privado y kitchenette",
      "Unidad diseñada para habitar o alquilar de inmediato",
      "Alta demanda universitaria y potencial de inversión",
    ],
    communityAmenitiesEn: [
      "Compact and functional studios with private bathroom and kitchenette",
      "Unit designed for immediate living or rental",
      "Strong student demand and strong investment potential",
    ],
    slogans: [
      "University Park - Monoambientes equipados para estudiantes y renta inmediata",
      "A pasos de la Universidad Nacional de Asunción.",
    ],
    slogansEn: [
      "University Park - Fully equipped studios for students and immediate rental",
      "A short walk from the National University of Asunción.",
    ],
    images: [
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151642.webp",
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151706.webp",
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151730.webp",
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151755.webp",
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151820.webp",
      "/Apartamentos/Grupo Park/Edificio University Park/Fotos para web/Captura de pantalla 2026-10-02 151846.webp",
    ],
    
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1713.8002303690969!2d-57.5262914!3d-25.3369925!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945dafaf2de89103%3A0x9187965dc6beef67!2sCondominio%20University%20Park!5e1!3m2!1ses-419!2spy!4v1791477001630!5m2!1ses-419!2spy",
    description:
      "University Park es un desarrollo residencial pensado para estudiantes, inversión y renta inmediata en San Lorenzo, a pasos de la UNA (Universidad Nacional de Asunción). El proyecto cuenta con un predio de 3.483 m² y 304 unidades distribuidas en 9 torres, con una propuesta clara: studios compactos, funcionales y completamente equipados para habitar o alquilar desde el primer momento.\n\nLa ubicación estratégica, junto a la alta demanda universitaria de la zona, convierte a University Park en una alternativa atractiva tanto para inversionistas como para jóvenes que buscan vivir cerca de campus y servicios.\n\nEl desarrollo está pensado para ofrecer una experiencia residencial segura y práctica, con hall de acceso principal de 150 m² y tipologías pensadas para optimizar espacio, confort y rentabilidad.\n\nPrecio desde: USD 33.500 + IVA\nRentabilidad estimada: hasta 9% anual en USD\nEstructura: 304 unidades distribuidas en 9 torres (7 bloques de 4 pisos y 2 bloques de 6 pisos)\nUnidades: Studios / monoambientes amoblados de 26 m² a 29 m²\nAviso legal: los precios no incluyen IVA y están sujetos a confirmación según disponibilidad.\n\nTorres de referencia:\n1. Torre A | 26 m² totales | Desde USD 33.500 + IVA\n2. Torre K | 26,5 m² totales | Desde USD 33.500 + IVA\n3. Torre I | 29 m² totales | Desde USD 33.500 + IVA\n\nPrecios desde USD 33.500 + IVA. Consultar inventario y disponibilidad actualizada antes de la reserva.",
    descriptionEn:
      "University Park is a residential development designed for students, investors, and immediate rentals in San Lorenzo, just steps from UNA (Universidad Nacional de Asunción). The project sits on a 3,483 m² plot and includes 304 units across 9 towers, with a clear offer: compact, functional, fully furnished studios designed for immediate living or rental.\n\nIts strategic location, combined with strong student demand in the area, makes University Park an attractive option for both investors and young people seeking to live close to campus and services.\n\nThe development is planned to provide a practical, safe residential experience, with a 150 m² main access hall and layouts optimized for space, comfort, and return.\n\nFrom USD 33,500 + VAT | Estimated return: up to 9% annually in USD | 304 units across 9 towers (7 blocks of 4 floors and 2 blocks of 6 floors) | Fully furnished studio units from 26 m² to 29 m².\n\nPrices exclude VAT and are subject to confirmation based on availability. Please check inventory and current availability before booking.",
    amenitiesEn: [
      "Steps from the UNA university campus",
      "Fully furnished and equipped studio units",
      "Estimated annual yield of up to 9% in USD",
      "150 m² main access hall",
      "Secure environment designed for student living",
    ],
    featured: true,
    offer: true,
    offerLabel: "En venta",
    offerLabelEn: "For sale",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el proyecto University Park en San Lorenzo. Quisiera recibir más información sobre las unidades amobladas y la rentabilidad para inversión.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in University Park in San Lorenzo. I would like more information about the furnished units and investment potential.",
    units: [
      { label: "Torre A", labelEn: "Tower A", area: "26 m² totales", areaEn: "26 m² total", price: 33500 },
      { label: "Torre K", labelEn: "Tower K", area: "26,5 m² totales", areaEn: "26.5 m² total", price: 33500 },
      { label: "Torre I", labelEn: "Tower I", area: "29 m² totales", areaEn: "29 m² total", price: 33500 },
    ],
    unitNote: "Precios desde USD 33.500 + IVA. Consultar inventario y disponibilidad actualizada antes de la reserva.",
    unitNoteEn: "Prices start from USD 33,500 + VAT. Please confirm current inventory and availability before reservation.",
  },
  {
    id: "AFIANZA-RECOLETA-8",
    title: "Afianza Recoleta",
    category: "apartamentos",
    price: 52100,
    location: "Edificio Afianza Recoleta #8, Calle Hassler, Barrio Recoleta, Asunción, Paraguay",
    bedrooms: 0,
    bathrooms: 1,
    area: 28.9,
    garage: 0,
    year: 2027,
    amenities: [
      "Cerraduras electrónicas y Smart Lockers para early check-in y late check-out",
      "Bauleras opcionales y estacionamiento para motocicletas",
      "Hall de recepción con seguridad 24 horas",
      "Piscina panorámica de casi 12 metros con jacuzzi y deck solárium",
      "Garden lounge y Kitchen Lab / Quincho climatizado",
      "Gimnasio totalmente equipado",
      "Meet & Call Room y espacio de coworking",
    ],
    communityAmenities: [
      "Solución pensada para renta temporal / Airbnb",
      "Ubicación boutique a 100 metros del Shopping Mariscal",
      "Perfil ideal para inversionistas y estudiantes",
    ],
    communityAmenitiesEn: [
      "Ideal solution for short-term rental / Airbnb",
      "Boutique location 100 meters from Shopping Mariscal",
      "Perfect fit for investors and students",
    ],
    slogans: [
      "Apartamentos boutique en Recoleta",
      "A 100 metros del Shopping Mariscal, con estilo y rentabilidad.",
    ],
    slogansEn: [
      "Boutique apartments in Recoleta",
      "100 meters from Shopping Mariscal, with style and profitability.",
    ],
    images: [
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Fachada frente .webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Fachada tarde.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of AFIANZA8_Fachada Nocturna_002_photoshop (1).webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Hall .webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Hall de acceso 1.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of AFIANZA8_Piscina_003_photoshop.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Balcon vista.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of cocina .webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Comedor 1.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Dormitorio 1.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of sala .webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of sala 2.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of sala 2(1).webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Sanitario.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Vista balcon 2.webp",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of AFIANZA8_Gimnasio_006_photoshop (1).tif",
      "/Apartamentos/Afianza Recoleta/Fotos para web/Copy of Quincho cubierto.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d857.1865567755265!2d-57.5826262!3d-25.2965122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da9002f23bfe3%3A0x310b72e3c3389ba9!2sEdificio%20Afianza%20Recoleta%20%238!5e1!3m2!1ses-419!2py!4v1791894271061!5m2!1ses-419!2py",
    description:
      "Afianza Recoleta #8 es un edificio residencial boutique ubicado sobre Calle Hassler, en el barrio Recoleta de Asunción, a apenas 100 metros del Shopping Mariscal. La propuesta combina ubicación premium, diseño contemporáneo y una oferta pensada para alquiler temporal, renta estudiantil o uso vacacional, con una experiencia de servicio moderna y práctica.\n\nEl proyecto está en construcción, con inicio de obra en diciembre de 2025 y entrega estimada para diciembre de 2027. La estructura está orientada a monoambientes divisibles y unidades funcionales, pensadas para maximizar confort, luz natural y rentabilidad.\n\nLas tipologías referenciales parten desde 28,9 m², con precios desde USD 52.100. También se contempla la posibilidad de unidades de 1 dormitorio (con opción a 2) y alternativas de 3 dormitorios, según disponibilidad.\n\nAmenities de primer nivel:\n- Piscina panorámica de casi 12 metros con jacuzzi y deck solárium\n- Garden lounge y Kitchen Lab / Quincho climatizado\n- Gimnasio totalmente equipado\n- Meet & Call Room y espacio de coworking\n- Hall de recepción con seguridad 24 horas\n- Cerraduras electrónicas y Smart Lockers para early check-in y late check-out\n- Bauleras opcionales y estacionamiento para motocicletas\n\nPrecios referenciales según lista del 22 de septiembre de 2026. Los accesorios, equipamiento y mamparas divisorias de las imágenes son ilustrativos y no están incluidos en el precio base.\n\nUnidades representativas:\n1. Monoambiente Divisible (Compacto) | 28,9 m² totales | USD 52.100\n2. Monoambiente Divisible (Mediano) | 36,3 m² totales | USD 65.900\n3. Monoambiente Divisible (Amplio) | 38,8 m² totales | USD 68.900\n\nPrecio de reserva: USD 4.000\nCocheras descubiertas: USD 15.500\nCocheras cubiertas: USD 18.500\nBauleras: USD 2.500\n\nEl proyecto contempla también tipologías de 1 dormitorio (con opción a 2) y alternativas de 3 dormitorios. Consultar disponibilidad y precios actualizados.",
    descriptionEn:
      "Afianza Recoleta #8 is a boutique residential building located on Calle Hassler in the Recoleta neighborhood of Asunción, just 100 meters from Shopping Mariscal. The project combines a premium location, contemporary design, and a smart offering for short-term rental, student housing, or vacation use, with a modern and practical service experience.\n\nThe project is under construction, with work starting in December 2025 and estimated delivery in December 2027. The structure focuses on divisible studio units and functional layouts designed to maximize comfort, natural light, and return.\n\nRepresentative typologies start from 28.9 m², with prices from USD 52,100. One-bedroom options (with 2-bedroom choices) and 3-bedroom alternatives are also available depending on inventory.\n\nTop-tier amenities include a panoramic pool of nearly 12 meters with jacuzzi and solarium deck, garden lounge and kitchen lab / covered barbecue area, fully equipped gym, meet & call room and coworking space, reception hall with 24-hour security, electronic locks and smart lockers for early check-in and late check-out, optional storage lockers, and motorcycle parking.\n\nReference prices follow the list dated September 22, 2026. Accessories, equipment, and partition screens shown in images are illustrative and not included in the base price.\n\nRepresentative units: Compact divisible studio, medium divisible studio, and large divisible studio. The development also includes one-bedroom (with 2-bedroom options) and 3-bedroom alternatives. Ask for updated availability and pricing.",
    amenitiesEn: [
      "Panoramic pool of nearly 12 meters with jacuzzi and solarium deck",
      "Garden lounge and kitchen lab / climate-controlled barbecue area",
      "Fully equipped gym",
      "Meet & Call Room and coworking space",
      "Reception hall with 24-hour security",
      "Electronic locks and smart lockers for early check-in and late check-out",
      "Optional storage lockers and motorcycle parking",
    ],
    communityAmenitiesEn: [
      "Thoughtful solution for short-term rental / Airbnb",
      "Boutique location 100 meters from Shopping Mariscal",
      "Ideal profile for investors and students",
    ],
    featured: true,
    offer: true,
    offerLabel: "En construcción",
    offerLabelEn: "Under construction",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el proyecto Afianza Recoleta #8 sobre calle Hassler. Quisiera recibir información sobre disponibilidad y modalidades de pago.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in Afianza Recoleta #8 on Hassler Street. I would like more information about availability and payment terms.",
    units: [
      { label: "Monoambiente Divisible (Compacto)", labelEn: "Divisible Studio (Compact)", area: "28,9 m² totales", areaEn: "28.9 m² total", price: 52100 },
      { label: "Monoambiente Divisible (Mediano)", labelEn: "Divisible Studio (Medium)", area: "36,3 m² totales", areaEn: "36.3 m² total", price: 65900 },
      { label: "Monoambiente Divisible (Amplio)", labelEn: "Divisible Studio (Large)", area: "38,8 m² totales", areaEn: "38.8 m² total", price: 68900 },
    ],
    unitNote: "El proyecto contempla también tipologías de 1 dormitorio (con opción a 2) y alternativas de 3 dormitorios. Consultar disponibilidad y precios actualizados.",
    unitNoteEn: "The project also includes 1-bedroom options (with 2-bedroom alternatives) and 3-bedroom layouts. Please ask for updated availability and pricing.",
  },
  {
    id: "ZENITH-COLOMBIA",
    title: "Zenith Colombia",
    category: "apartamentos",
    price: 41608,
    location: "Calle República de Colombia, Centro Histórico.",
    bedrooms: 1,
    bathrooms: 1,
    area: 29.82,
    garage: 1,
    year: 2029,
    amenities: [
      "Cocina integrada",
      "Ambiente principal funcional",
      "Baño completo",
      "Sin balcón en la tipología monoambiente",
      "Diseño moderno y eficiente",
      "Apto para inversión o vivienda inicial",
    ],
    communityAmenities: [
      "Lobby y Área Zen",
      "Piscina con deck",
      "Gimnasio equipado y Laundry",
      "Quincho climatizado y al aire libre",
      "Área de tereré",
      "Sala de reuniones y Coworking indoor-outdoor",
    ],
    slogans: [
      "Apart Living en el corazón del Centro Histórico",
      "Preventa con ubicación estratégica y excelente potencial de valorización.",
    ],
    slogansEn: [
      "Apart Living in the heart of the Historic Center",
      "Pre-sale with prime location and strong appreciation potential.",
    ],
    images: [
      "/Apartamentos/ZenithColombia/01_PORTADA_Fachada.webp",
      "/Apartamentos/ZenithColombia/02_Vista_aerea.webp",
      "/Apartamentos/ZenithColombia/03_Vista_general.webp",
      "/Apartamentos/ZenithColombia/04_Vista_exterior_01.webp",
      "/Apartamentos/ZenithColombia/05_Vista_exterior_02.webp",
      "/Apartamentos/ZenithColombia/06_Vista_exterior_03.webp",
      "/Apartamentos/ZenithColombia/07_Amenity_Lobby.webp",
      "/Apartamentos/ZenithColombia/08_Amenity_Piscina_y_deck.webp",
      "/Apartamentos/ZenithColombia/09_Amenity_Quincho.webp",
      "/Apartamentos/ZenithColombia/10_Amenity_Gimnasio.webp",
    ],
    plans: [
      "/Apartamentos/ZenithColombia/planos/01_Plano_subsuelo.webp",
      "/Apartamentos/ZenithColombia/planos/02_Plano_planta_baja.webp",
      "/Apartamentos/ZenithColombia/planos/03_Plano_planta_tipo.webp",
      "/Apartamentos/ZenithColombia/planos/04_Plano_tipologias.webp",
      "/Apartamentos/ZenithColombia/planos/05_Plano_azotea_y_amenities.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.866356048353!2d-57.6343879!3d-25.292264499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da7ea9492f3ef%3A0x5ae838ad9d3916a!2sAZ%20Zenith%20Colombia!5e1!3m2!1ses-419!2py!4v1791894380277!5m2!1ses-419!2py",
    description:
      "Zenith Colombia es un proyecto de Apart Living desarrollado por AZ Inversiones y pensado para quienes buscan vivir o invertir en una ubicación estratégica del centro histórico de Asunción. Con una propuesta moderna, funcional y bien conectada, reúne calidad de construcción, amenities para el día a día y acceso a una zona de alto valor urbano.\n\nEl edificio contempla 17 niveles, 98 departamentos y 2 niveles de estacionamiento con 57 cocheras. La propuesta está diseñada para ofrecer tipologías eficientes y una experiencia de vida cómoda en el corazón de la ciudad.\n\nLa preventa del desarrollo cuenta con unidades desde 29,82 m² propios, con opción de monoambiente, 1 dormitorio y 2 dormitorios. Las áreas comunes están pensadas para un estilo de vida activo, equilibrado y lleno de servicios urbanos.\n\nAmenities del edificio:\n- Lobby y Área Zen\n- Piscina con deck\n- Gimnasio equipado y Laundry\n- Quincho climatizado y al aire libre\n- Área de tereré\n- Sala de reuniones y Coworking indoor-outdoor\n\nPrecio desde: USD 41.608\nSuperficie desde: 29,82 m² propios\nEstructura: 17 niveles | 98 departamentos | 57 cocheras\nUbicación: Calle República de Colombia, Centro Histórico, Asunción, Paraguay\nEstado comercial: Preventa\nEntrega estimada: primer semestre de 2029\nForma de pago: 20% de anticipo + 3 refuerzos del 7% cada uno + saldo en 30 cuotas\n\nUnidades representativas:\n1. Monoambiente (Unidad 206 - Piso 2) | 29,82 m² | 1 baño | USD 41.608\n2. 1 Dormitorio (Unidad 105 - Piso 1) | 37,01 m² | 1 baño | USD 51.383\n3. 2 Dormitorios (Unidad 102 - Piso 1) | 58,70 m² | 2 baños | USD 81.497\n\nAdicionales:\n- Cocheras para automóvil: desde USD 10.266\n- Cocheras para motocicleta: USD 1.000\n- Bauleras: USD 2.500\n\nPrecios y disponibilidad correspondientes a la lista vigente. Consultar disponibilidad actualizada.",
    descriptionEn:
      "Zenith Colombia is an Apart Living project developed by AZ Inversiones and designed for buyers seeking a strategic location in the historic center of Asunción. With a modern, functional, and well-connected proposal, it combines construction quality, everyday amenities, and access to a high-value urban area.\n\nThe building has 17 levels, 98 apartments, and 2 parking levels with 57 spaces. The project is designed to offer efficient layouts and a comfortable lifestyle in the heart of the city.\n\nThe pre-sale includes units from 29.82 m², with studio, 1-bedroom, and 2-bedroom options. Common areas are planned for an active, balanced lifestyle with urban services nearby.\n\nBuilding amenities include a lobby and zen area, pool with deck, fully equipped gym and laundry, climate-controlled and open barbecue area, tereré area, meeting room, and indoor-outdoor coworking.\n\nFrom USD 41,608 | Starting surface: 29.82 m² | 17 levels | 98 apartments | 57 parking spaces | Estimated delivery: first half of 2029.\n\nRepresentative units: studio, 1-bedroom, and 2-bedroom options. Additional features include parking and storage spaces. Updated availability should be confirmed before purchase.",
    amenitiesEn: [
      "Lobby and Zen area",
      "Pool with deck",
      "Equipped gym and laundry",
      "Climate-controlled and open barbecue area",
      "Tereré area",
      "Meeting room and indoor-outdoor coworking",
    ],
    communityAmenitiesEn: [
      "Lobby and Zen area",
      "Pool with deck",
      "Equipped gym and laundry",
      "Climate-controlled and open barbecue area",
      "Tereré area",
      "Meeting room and coworking space",
    ],
    featured: true,
    offer: true,
    offerLabel: "Preventa",
    offerLabelEn: "Pre-sale",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el proyecto Zenith Colombia (Centro Histórico). Quisiera recibir información sobre las unidades disponibles y la preventa.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in Zenith Colombia (Historic Center). I would like information on the available units and the pre-sale.",
    units: [
      { label: "Monoambiente (Unidad 206 - Piso 2)", labelEn: "Studio (Unit 206 - Floor 2)", area: "29,82 m² | 1 baño", areaEn: "29.82 m² | 1 bathroom", price: 41608, floor: "Piso 2", floorEn: "Floor 2" },
      { label: "1 Dormitorio (Unidad 105 - Piso 1)", labelEn: "1 Bedroom (Unit 105 - Floor 1)", area: "37,01 m² | 1 baño", areaEn: "37.01 m² | 1 bathroom", price: 51383, floor: "Piso 1", floorEn: "Floor 1" },
      { label: "2 Dormitorios (Unidad 102 - Piso 1)", labelEn: "2 Bedrooms (Unit 102 - Floor 1)", area: "58,70 m² | 2 baños", areaEn: "58.70 m² | 2 bathrooms", price: 81497, floor: "Piso 1", floorEn: "Floor 1" },
    ],
    unitNote: "Precios y disponibilidad correspondientes a la lista vigente. Consultar disponibilidad actualizada.",
    unitNoteEn: "Prices and availability correspond to the current list. Please confirm updated availability before purchase.",
  },
  {
    id: "VENIRE-568-RECOLETA",
    title: "Venire 568 Recoleta",
    category: "apartamentos",
    price: 69835,
    location: "VENIRE 568, Manuel del Castillo esquina San Roque González, Recoleta, Asunción, Paraguay",
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    garage: 1,
    year: 2027,
    amenities: [
      "Cocina amoblada y equipada",
      "Horno, campana y anafe",
      "Ambientes climatizados",
      "Dormitorios con placares",
      "Balcones según tipología",
      "Seguridad 24/7",
    ],
    communityAmenities: [
      "Piscina con deck",
      "Quinchos cerrados con parrilla",
      "Coworking",
      "Gimnasio",
      "Patio interno en el nivel 1",
      "Generador para áreas comunes",
    ],
    slogans: [
      "Diseño urbano contemporáneo en Recoleta",
      "Viviendas modernas con estilo y accesibilidad en Asunción.",
    ],
    slogansEn: [
      "Contemporary urban design in Recoleta",
      "Modern homes with style and accessibility in Asunción.",
    ],
    images: [
      "/Apartamentos/Venire 568 Recoleta/01_PORTADA_Fachada_frontal.webp",
      "/Apartamentos/Venire 568 Recoleta/02_Fachada_lateral.webp",
      "/Apartamentos/Venire 568 Recoleta/03_Acceso_y_recepcion.webp",
      "/Apartamentos/Venire 568 Recoleta/04_Amenity_piscina.webp",
      "/Apartamentos/Venire 568 Recoleta/05_Amenity_patio_interno.webp",
      "/Apartamentos/Venire 568 Recoleta/Monoambiente.webp",
      "/Apartamentos/Venire 568 Recoleta/1 dormitorio.webp",
      "/Apartamentos/Venire 568 Recoleta/2 dormitorios.webp",
    ],
    plans: [
      "/Apartamentos/Venire 568 Recoleta/02_Planos/06_Plano_monoambiente_30_20m2.webp",
      "/Apartamentos/Venire 568 Recoleta/02_Planos/07_Plano_1D_45_86m2.webp",
      "/Apartamentos/Venire 568 Recoleta/02_Planos/08_Plano_2D_84_49m2.webp",
      "/Apartamentos/Venire 568 Recoleta/02_Planos/09_Planta_tipo.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.7163991032025!2d-57.5832816!3d-25.297566799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da90038cf4e59%3A0xbc6c1a5ee9bf3894!2sVENIRE%20568!5e1!3m2!1ses-419!2py!4v1791894222169!5m2!1ses-419!2py",
    description:
      "Venire 568 Recoleta es un proyecto residencial de diseño urbano y contemporáneo ubicado sobre Manuel del Castillo esquina San Roque González, en el barrio Recoleta de Asunción, a cuatro cuadras del Shopping Mariscal y a dos cuadras de La Cuadrita.\n\nEl edificio contará con 88 departamentos distribuidos en ocho niveles, con opciones de monoambientes y unidades de uno y dos dormitorios. Las superficies disponibles parten desde 30,20 m² e incluyen alternativas con balcón según la tipología.\n\nLas unidades contemplan cocina amoblada y equipada con horno, campana y anafe, ambientes climatizados y dormitorios con placares. Las unidades de dos dormitorios disponen de dos baños, uno de ellos en suite.\n\nEntre sus amenities se encuentran piscina con deck, quinchos cerrados con parrilla, coworking, gimnasio, patio interno en el nivel 1, generador para áreas comunes, seguridad las 24 horas y circuito cerrado.\n\nPrecio: Desde USD 69.835\nSuperficie desde: 30,20 m²\nForma de pago: 20% de entrega inicial y 80% contra entrega\nEstado: Proyecto en pozo\nInicio de obra: marzo de 2027\nEntrega estimada: marzo de 2029\nUbicación: Manuel del Castillo esquina San Roque González, Recoleta, Asunción, Paraguay\n\nTipologías representativas:\n1. Monoambiente | Superficie: 30,20 m² | Precio: Desde USD 69.835\n2. 1 Dormitorio | Superficie: 45,86 m² | Precio: Desde USD 105.831\n3. 2 Dormitorios | Superficie: 84,49 m² | Precio: Desde USD 189.978\n\nNota: Otras unidades, superficies y pisos disponibles. Consultar disponibilidad y precios actualizados.",
    descriptionEn:
      "Venire 568 Recoleta is a contemporary urban residential project located on Manuel del Castillo and San Roque González in the Recoleta neighborhood of Asunción, four blocks from Shopping Mariscal and two blocks from La Cuadrita.\n\nThe building will have 88 apartments across eight levels, with studio, 1-bedroom, and 2-bedroom options. Starting surfaces begin at 30.20 m² and include balcony alternatives depending on the layout.\n\nUnits include fully equipped kitchens with oven, hood, and stovetop, climate-controlled spaces, and bedrooms with wardrobes. The 2-bedroom layouts include two bathrooms, one of them en-suite.\n\nAmenities include a pool with deck, covered barbecue areas, coworking space, gym, internal patio on level 1, backup generator for common areas, 24-hour security, and a closed-circuit system.\n\nFrom USD 69,835 | Starting area: 30.20 m² | 20% deposit and 80% upon delivery | Project in foundation stage | Estimated delivery: March 2029.\n\nRepresentative layouts include studio, 1-bedroom, and 2-bedroom options. Additional units, floors, and sizes are available. Please consult updated pricing and availability.",
    amenitiesEn: [
      "Fully equipped kitchen",
      "Oven, hood, and stovetop",
      "Climate-controlled spaces",
      "Bedrooms with wardrobes",
      "Balcony options depending on layout",
      "24/7 security",
    ],
    communityAmenitiesEn: [
      "Pool with deck",
      "Covered barbecue areas",
      "Coworking space",
      "Gym",
      "Internal patio on level 1",
      "Backup generator for common areas",
    ],
    featured: true,
    offer: true,
    offerLabel: "En pozo",
    offerLabelEn: "In development",
    unitNote: "Otras unidades, superficies y pisos disponibles. Consultar disponibilidad y precios actualizados.",
    unitNoteEn: "Other units, sizes, and floors are available. Please confirm updated availability and pricing.",
  },
  {
    id: "MARENA",
    title: "Marena",
    category: "condominios",
    price: 101547,
    location: "Luque, calle 12 de Junio, zona CIT",
    bedrooms: 1,
    bathrooms: 1,
    area: 68,
    garage: 1,
    year: 2027,
    amenities: [
      "Laguna Crystal Lagoons + playas",
      "Club House + restaurante",
      "Gimnasio con vista a la laguna",
      "Spa",
      "Coworking",
      "Kids Club",
      "Bar de playa",
      "2 canchas de pádel",
      "Beach volley",
      "Fútbol 5",
      "Parrillas",
      "Senda aeróbica ~400 m",
      "Muelle + kayak/paddle board",
      "Supermercado, café y farmacia",
    ],
    communityAmenities: [
      "Condominio de 32.000 m²",
      "Laguna Crystal Lagoons",
      "Seguridad 24 hs",
      "Área comercial",
      "Club House con vistas",
    ],
    slogans: [
      "Marena - Vida de resort con laguna cristalina en Luque",
      "Condominio residencial pensado para vivir con estilo y tranquilidad.",
    ],
    slogansEn: [
      "Marena - Resort living with a crystal lagoon in Luque",
      "A residential condominium designed for a stylish, peaceful lifestyle.",
    ],
    images: [
      "/Condominios/Marena/Fotos General/NQS_EYDISA_MARENA_NEXT LAYER_M02W_02_08.webp",
      "/Condominios/Marena/Fotos General/CDCJ2311.webp",
      "/Condominios/Marena/Fotos General/CDCJ2312.webp",
      "/Condominios/Marena/Fotos General/CDCJ2315.webp",
      "/Condominios/Marena/Fotos General/CDCJ2347.webp",
      "/Condominios/Marena/Fotos General/CDCJ2352.webp",
      "/Condominios/Marena/Fotos General/CDCJ2431.webp",
      "/Condominios/Marena/Fotos General/NQS_EYDISA_MARENA_NEXT LAYER_M02W_02_06.webp",
      "/Condominios/Marena/Fotos General/WhatsApp Image 2026-09-21 at 09.59.10.webp",
      "/Condominios/Marena/Fotos General/WhatsApp Image 2026-09-23 at 19.02.54.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.935234258566!2d-57.53361369999999!3d-25.2898287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945daf091e5868f3%3A0x53861e34929720b3!2sMARENA!5e1!3m2!1ses-419!2py!4v1791894300256!5m2!1ses-419!2py",
    description:
      "Marena es un condominio residencial de 32.000 m² en Luque, en la zona de cita del sector CIT, a aproximadamente 3 km del Eje Corporativo. La propuesta combina una experiencia de resort con laguna Crystal Lagoons, áreas de recreación, comercio y una infraestructura pensada para una vida relajada y activa.\n\nLa playa, el club house, el gimnasio con vista a la laguna, el spa, el coworking y la variedad de amenities recreativos convierten al proyecto en una alternativa premium para quienes buscan vivir en comunidad, con comodidad y un estilo de vida de alto nivel.\n\nTodas las unidades incluyen 1 cochera dentro del valor publicado. La entrega estimada y las condiciones de financiación varían según la torre elegida, con opciones de financiamiento propio y bancario en plazos flexibles.\n\nProyecto: Marena\nDesarrolladora: EYDISA\nUbicación: Luque, calle 12 de Junio, zona CIT\nAtractivo principal: 32.000 m² con laguna Crystal Lagoons, playas, área comercial y seguridad 24 horas.",
    descriptionEn:
      "Marena is a 32,000 m² residential condominium in Luque, in the CIT area, approximately 3 km from the Corporate Axis. The project combines a resort-style experience with a Crystal Lagoons lake, recreation areas, commercial spaces, and infrastructure designed for a relaxed and active lifestyle.\n\nThe beach, clubhouse, gym with lagoon views, spa, coworking areas, and recreational amenities make it a premium option for those seeking community living, comfort, and a high-end lifestyle.\n\nAll units include 1 parking space within the published price. Estimated delivery and financing conditions vary by tower, with self-financing and bank financing options available over flexible terms.\n\nProject: Marena\nDeveloper: EYDISA\nLocation: Luque, 12 de Junio Street, CIT area\nMain attraction: 32,000 m² with Crystal Lagoons lake, beaches, commercial area, and 24-hour security.",
    amenitiesEn: [
      "Crystal Lagoons lake + beaches",
      "Clubhouse + restaurant",
      "Gym with lagoon views",
      "Spa",
      "Coworking",
      "Kids Club",
      "Beach bar",
      "2 padel courts",
      "Beach volleyball",
      "5-a-side football",
      "Grills",
      "Aerobic trail of ~400 m",
      "Dock + kayak / paddle board",
      "Supermarket, café, and pharmacy",
    ],
    communityAmenitiesEn: [
      "32,000 m² condominium",
      "Crystal Lagoons lake",
      "24-hour security",
      "Commercial area",
      "Clubhouse with views",
    ],
    featured: true,
    offer: true,
    offerLabel: "Condominio ",
    offerLabelEn: "Condominium",
    whatsappNumber: "595975500150",
    whatsappMessage: "Hola Edennia Homes, me interesa el condominio Marena en Luque. Quisiera recibir información sobre disponibilidad y planes de pago.",
    whatsappMessageEn: "Hello Edennia Homes, I am interested in the Marena condominium in Luque. I would like information about availability and payment plans.",
    unitNote: "Todas las unidades incluyen 1 cochera dentro del valor publicado. La entrega estimada y las condiciones de financiación varían según la torre elegida, con opciones de financiamiento propio y bancario en plazos flexibles.",
    unitNoteEn: "All units include 1 parking space within the published price. Estimated delivery and financing conditions vary by tower, with self-financing and bank financing options available over flexible terms.",
  },
  {
    id: "VENIRE-VM",
    title: "Venire Villa Morra",
    category: "apartamentos",
    price: 122000,
    location: "VENIRE VILLAMORRA, Guido Spano y Senador Long, Villa Morra, Asunción, Paraguay",
    bedrooms: 1,
    bathrooms: 1,
    area: 44,
    garage: 1,
    year: 2026,
    amenities: [
      "Sala-comedor",
      "Cocina amoblada",
      "Dormitorios con placares",
      "Climatización",
      "Espacios exteriores",
      "Diseño contemporáneo",
    ],
    communityAmenities: [
      "Piscina con deck",
      "Dos quinchos con parrilla",
      "Sala gourmet",
      "Gimnasio",
      "Coworking",
      "Cafetería",
    ],
    slogans: [
      "Arquitectura contemporánea en el corazón de Villa Morra",
      "Viví con comodidad, estilo y acceso urbano en Asunción.",
    ],
    slogansEn: [
      "Contemporary architecture in the heart of Villa Morra",
      "Live with comfort, style, and urban access in Asunción.",
    ],
    images: [
      "/Apartamentos/Venire Villa Morra/01_PORTADA_Fachada_frontal.webp",
      "/Apartamentos/Venire Villa Morra/02_Fachada_lateral.webp",
      "/Apartamentos/Venire Villa Morra/03_Acceso_principal.webp",
      "/Apartamentos/Venire Villa Morra/04_Vista_aerea_frontal.webp",
      "/Apartamentos/Venire Villa Morra/05_Vista_aerea_lateral.webp",
      "/Apartamentos/Venire Villa Morra/06_Interior_1D_living.webp",
      "/Apartamentos/Venire Villa Morra/07_Interior_1D_dormitorio.webp",
      "/Apartamentos/Venire Villa Morra/08_Interior_2D_living.webp",
      "/Apartamentos/Venire Villa Morra/09_Interior_2D_dormitorio_principal.webp",
      "/Apartamentos/Venire Villa Morra/10_Interior_2D_dormitorio_secundario.webp",
      "/Apartamentos/Venire Villa Morra/11_Interior_2D_balcon.webp",
      "/Apartamentos/Venire Villa Morra/12_Amenity_lobby.webp",
      "/Apartamentos/Venire Villa Morra/13_Amenity_piscina.webp",
      "/Apartamentos/Venire Villa Morra/14_Amenity_quincho.webp",
      "/Apartamentos/Venire Villa Morra/15_Amenity_gimnasio.webp",
    ],
    plans: [
      "/Apartamentos/Venire Villa Morra/02_Planos/16_Plano_1D_43_54m2.webp",
      "/Apartamentos/Venire Villa Morra/02_Planos/17_Plano_1D_45_72m2.webp",
      "/Apartamentos/Venire Villa Morra/02_Planos/18_Plano_2D_80_00m2.webp",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1714.4141770799552!2d-57.57910489999999!3d-25.293608299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da900416b98ad%3A0xab264963f1e728c9!2sVENIRE%20VILLAMORRA!5e1!3m2!1ses-419!2py!4v1791894177542!5m2!1ses-419!2py",
    description:
      "Venire Villa Morra es un proyecto residencial de arquitectura contemporánea ubicado en Guido Spano y Senador Long, en el corazón de Villa Morra, a aproximadamente 100 metros del Shopping Mariscal y próximo al eje corporativo de Asunción.\n\nPrecio: Desde ₲ 728.000.000 (valor referencial sujeto a cotización)\nSuperficie desde: 43,54 m²\nForma de pago: 20% entrega inicial y 80% contra entrega\nUbicación: Guido Spano y Senador Long, Villa Morra, Asunción, Paraguay\n\nLas unidades disponibles ofrecen opciones de uno y dos dormitorios, con superficies de departamento desde 43,54 m². Según la tipología, incorporan sala-comedor, cocina amoblada, dormitorios con placares, climatización y espacios exteriores.\n\nEl edificio contará con piscina con deck, dos quinchos con parrilla - uno climatizado y otro al aire libre -, sala gourmet, gimnasio, coworking, cafetería y espacios comunes pensados para un estilo de vida urbano y funcional.\n\nTipologías representativas:\n1. 1 Dormitorio: 43,54 m² | Desde ₲ 728.000.000\n2. 1 Dormitorio: 64,27 m² | Desde ₲ 749.000.000\n3. 2 Dormitorios: 80,00 m² | Desde ₲ 1.392.750.000\n\nAviso legal: Precios, disponibilidad, equivalencias en dólares, condiciones de pago y fecha de entrega sujetos a confirmación y posibles modificaciones. Las imágenes y renders son referenciales.",
    descriptionEn:
      "Venire Villa Morra is a contemporary residential project located at Guido Spano and Senador Long, in the heart of Villa Morra, approximately 100 meters from Shopping Mariscal and close to Asunción's corporate axis.\n\nPrice: From ₲ 728,000,000 (reference value subject to quote)\nStarting area: 43.54 m²\nPayment terms: 20% initial payment and 80% upon delivery\nLocation: Guido Spano and Senador Long, Villa Morra, Asunción, Paraguay\n\nAvailable units offer one- and two-bedroom options with apartment sizes starting at 43.54 m². According to the layout, they include living-dining space, furnished kitchen, bedrooms with wardrobes, climate control, and exterior spaces.\n\nThe building will include a pool with deck, two barbecue areas - one climate-controlled and one outdoors -, a gourmet room, gym, coworking space, café, and common areas designed for a functional urban lifestyle.\n\nRepresentative typologies: 1-bedroom at 43.54 m², 1-bedroom at 64.27 m², and 2-bedroom at 80.00 m². Prices and availability are subject to confirmation and possible changes. Images and renders are for reference only.",
    amenitiesEn: [
      "Living-dining area",
      "Furnished kitchen",
      "Bedrooms with wardrobes",
      "Climate control",
      "Outdoor spaces",
      "Contemporary design",
    ],
    communityAmenitiesEn: [
      "Pool with deck",
      "Two barbecue areas",
      "Gourmet room",
      "Gym",
      "Coworking",
      "Café",
    ],
    featured: true,
    offer: true,
    offerLabel: "En pozo",
    offerLabelEn: "In development",
  },
];

export const properties: Property[] = baseProperties.map((property) => ({
  ...property,
  images: toWebpList(property.images),
  plans: property.plans ? toWebpList(property.plans) : undefined,
}));

export const CATEGORY_META: Record<PropertyCategory, { title: string; description: string }> = {
  casas: {
    title: "Casas Unifamiliares",
    description:
      "Residencias con jardín, garaje y espacios pensados para toda la familia en las mejores zonas.",
  },
  apartamentos: {
    title: "Apartamentos",
    description:
      "Departamentos modernos en edificios premium con vistas, amenities y ubicación privilegiada.",
  },
  condominios: {
    title: "Condominios",
    description:
      "Vida en comunidad con seguridad 24 horas, piscina, gimnasio y áreas verdes cuidadas.",
  },
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}

export function propertiesByCategory(cat: PropertyCategory) {
  return properties.filter((p) => p.category === cat);
}

export function offers() {
  return properties.filter((p) => p.offer);
}