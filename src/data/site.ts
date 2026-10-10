export const site = {
  name: 'Chonta Sabores',
  whatsapp: '573505441148', // formato internacional, sin "+" ni espacios
  phoneDisplay: '350 544 1148',
  email: 'chontasabores0421@gmail.com',
  address: 'Popayán, Colombia, 8-49',
  tagline: 'Chontaduro de Cuatro Esquinas · Sin aditivos ni conservantes',
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}`;
export const mailUrl = `mailto:${site.email}`;

/** Enlace de WhatsApp con el mensaje ya precargado. */
export const waLink = (text: string) => `${whatsappUrl}?text=${encodeURIComponent(text)}`;

/** Redes sociales oficiales. */
export const social = [
  { name: 'Instagram', url: 'https://www.instagram.com/chontasabores0421' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@chontasabores' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100078980652269' },
] as const;
