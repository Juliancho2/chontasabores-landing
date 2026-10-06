export interface Presentacion {
  size: string;
  unit: string; // valor unitario
  mid: string; // 6 a 12 unidades
  high: string; // desde 13 unidades
}

export interface Producto {
  title: string;
  bg: string; // color de fondo del recuadro (coincide con la imagen)
  img: string;
  alt: string;
  desc: string;
  formats: Presentacion[];
}

export const productos: Producto[] = [
  {
    title: 'Mermelada de chontaduro',
    bg: '#F04C43',
    img: '/images/mermelada.png',
    alt: 'Frasco de mermelada de chontaduro',
    desc: 'Mermelada artesanal con el auténtico sabor del chontaduro. Para acompañar con galletas, panes, postres y más. Sin conservantes ni estabilizantes.',
    formats: [
      { size: '500 ml · 548 gr', unit: '$19.900', mid: '$17.910', high: '$16.900' },
      { size: '250 ml · 270 gr', unit: '$12.900', mid: '$11.600', high: '$10.965' },
      { size: '130 ml · 145 gr', unit: '$8.400', mid: '$7.500', high: '$7.140' },
    ],
  },
  {
    title: 'Chontaduro en almíbar',
    bg: '#F78745',
    img: '/images/almibar.png',
    alt: 'Frasco de chontaduro en almíbar',
    desc: 'Un balance perfecto entre dulzura y textura. Ideal para postres o para disfrutarlo solo, similar a un chontaduro con miel.',
    formats: [
      { size: '500 ml · 282 gr', unit: '$17.900', mid: '$16.100', high: '$15.200' },
      { size: '250 ml · 136 gr', unit: '$13.900', mid: '$12.510', high: '$11.815' },
    ],
  },
  {
    title: 'Chontaduro en salmuera',
    bg: '#F04C43',
    img: '/images/salmuera.png',
    alt: 'Frasco de chontaduro en salmuera',
    desc: 'Ideal para disfrutar su sabor natural en diversas preparaciones. Sin conservantes ni estabilizantes, similar a comer chontaduro con sal.',
    formats: [{ size: '500 ml · 342 gr', unit: '$16.900', mid: '$15.200', high: '$14.300' }],
  },
  {
    title: 'Harina de chontaduro',
    bg: '#3F1E6D',
    img: '/images/harina.png',
    alt: 'Bolsa de harina de chontaduro',
    desc: 'Harina 100% natural, rica en fibra y nutrientes. Ideal para repostería, batidos y recetas saludables.',
    formats: [
      { size: '500 gr', unit: '$19.900', mid: '$17.910', high: '$16.915' },
      { size: '250 gr', unit: '$11.900', mid: '$10.700', high: '$10.100' },
      { size: '150 gr', unit: '$6.700', mid: '$6.000', high: '$5.690' },
    ],
  },
];
