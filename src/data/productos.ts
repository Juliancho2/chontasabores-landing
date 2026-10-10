export interface Presentacion {
  size: string;
  unit: string; // valor unitario
  mayor?: string; // valor al por mayor (desde 6 unidades)
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
      { size: '500 ml · 548 gr', unit: '$16.000', mayor: '$14.000' },
      { size: '250 ml · 270 gr', unit: '$12.000', mayor: '$9.500' },
      { size: '130 ml · 145 gr', unit: '$8.000', mayor: '$6.800' },
    ],
  },
  {
    title: 'Chontaduro en almíbar',
    bg: '#F78745',
    img: '/images/almibar.png',
    alt: 'Frasco de chontaduro en almíbar',
    desc: 'Un balance perfecto entre dulzura y textura. Ideal para postres o para disfrutarlo solo, similar a un chontaduro con miel.',
    formats: [
      { size: '500 ml · 282 gr', unit: '$16.000', mayor: '$14.000' },
      { size: '250 ml · 136 gr', unit: '$12.000', mayor: '$9.500' },
    ],
  },
  {
    title: 'Chontaduro en salmuera',
    bg: '#F04C43',
    img: '/images/salmuera.png',
    alt: 'Frasco de chontaduro en salmuera',
    desc: 'Ideal para disfrutar su sabor natural en diversas preparaciones. Sin conservantes ni estabilizantes, similar a comer chontaduro con sal.',
    formats: [{ size: '500 ml · 342 gr', unit: '$16.000', mayor: '$14.000' }],
  },
  {
    title: 'Harina de chontaduro',
    bg: '#3F1E6D',
    img: '/images/harina.png',
    alt: 'Bolsa de harina de chontaduro',
    desc: 'Harina 100% natural, rica en fibra y nutrientes. Ideal para repostería, batidos y recetas saludables.',
    formats: [
      { size: '12 kilos', unit: '$432.400' },
      { size: '500 gr', unit: '$24.000', mayor: '$22.000' },
      { size: '250 gr', unit: '$14.000', mayor: '$11.800' },
      { size: '150 gr', unit: '$10.000', mayor: '$8.500' },
    ],
  },
];
