import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __fxFallback?: ReturnType<typeof setTimeout>;
    __fxStarted?: boolean;
  }
}

/**
 * Variantes de entrada. El estado final siempre es "neutro"
 * (opacity 1, sin desplazamiento) y al terminar se limpia el
 * `transform` inline para que los hover en CSS vuelvan a funcionar.
 */
type Variant = 'up' | 'down' | 'left' | 'right' | 'pop' | 'fade';

interface RevealOpts {
  trigger?: string | HTMLElement;
  start?: string;
  stagger?: number;
  delay?: number;
}

const FROM: Record<Variant, Record<string, number>> = {
  up: { y: 48 },
  down: { y: -34 },
  left: { x: -56 },
  right: { x: 56 },
  pop: { y: 60, scale: 0.87 },
  fade: {},
};

const TO = { opacity: 1, x: 0, y: 0, scale: 1 };
const DUR = 0.8;
const EASE = 'power3.out';

const q = (sel: string): HTMLElement[] => gsap.utils.toArray(sel) as HTMLElement[];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function makeTween(
  targets: string | HTMLElement | HTMLElement[],
  variant: Variant,
  vars: gsap.TweenVars = {},
): gsap.core.Tween | null {
  const els = typeof targets === 'string' ? q(targets) : targets;
  if (!els || (Array.isArray(els) && els.length === 0)) return null;

  return gsap.fromTo(
    els,
    { opacity: 0, ...FROM[variant] },
    { ...TO, duration: DUR, ease: EASE, clearProps: 'transform', ...vars },
  );
}

/** Separa el texto en palabras envueltas en spans animables. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];

  const walk = (parent: Node) => {
    Array.from(parent.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        if (!text.trim()) return;

        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const span = document.createElement('span');
          span.className = 'fx-word';
          span.textContent = part;
          frag.appendChild(span);
          words.push(span);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const child = node as HTMLElement;
        // Unidades que no se parten (p. ej. `.wavy`, que lleva subrayado):
        // conservan su texto tal cual y solo se les aplica opacidad.
        if (child.classList.contains('fx-word')) return;
        if (child.classList.contains('wavy') || child.dataset.fxUnit !== undefined) {
          words.push(child);
          return;
        }
        walk(child);
      }
    });
  };

  walk(el);
  return words;
}

function wordsTween(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const words = splitWords(el);
  if (!words.length) return null;

  // El contenedor deja de estar oculto: lo que oculta ahora son las palabras.
  gsap.set(el, { opacity: 1 });

  return gsap.fromTo(
    words,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: EASE,
      stagger: 0.05,
      clearProps: 'transform',
      ...vars,
    },
  );
}

/** Revela todos los elementos que coinciden con `sel` al entrar en pantalla. */
function reveal(sel: string, variant: Variant, opts: RevealOpts = {}) {
  const els = q(sel);
  if (!els.length) return;

  const { trigger = sel, start = 'top 85%', stagger = 0.1, delay = 0 } = opts;

  gsap.fromTo(
    els,
    { opacity: 0, ...FROM[variant] },
    {
      ...TO,
      duration: DUR,
      ease: EASE,
      stagger,
      delay,
      clearProps: 'transform',
      scrollTrigger: { trigger, start, once: true },
    },
  );
}

function revealWords(sel: string, opts: RevealOpts = {}) {
  const { trigger, start = 'top 85%' } = opts;

  q(sel).forEach((el) => {
    wordsTween(el, {
      scrollTrigger: { trigger: trigger ?? el, start, once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Escenas                                                            */
/* ------------------------------------------------------------------ */

/** Entrada al cargar la página: barra, header y hero. */
function intro() {
  const tl = gsap.timeline({ defaults: { duration: DUR, ease: EASE } });
  const put = (t: gsap.core.Tween | null, pos: number) => {
    if (t) tl.add(t, pos);
  };

  put(makeTween('.franja', 'down', { duration: 0.55 }), 0);
  put(makeTween('.header .logo', 'down'), 0.08);
  put(makeTween('.header .links a', 'down', { duration: 0.6, stagger: 0.06 }), 0.16);
  put(makeTween('.header .cta', 'down', { duration: 0.6 }), 0.34);

  const saludo = document.querySelector<HTMLElement>('.hero .saludo');
  const titulo = document.querySelector<HTMLElement>('.hero h1');

  put(saludo ? wordsTween(saludo) : null, 0.45);
  put(titulo ? wordsTween(titulo, { duration: 0.9, stagger: 0.06 }) : null, 0.55);
  put(makeTween('.hero .copy > p', 'up'), 0.85);
  put(makeTween('.hero .actions .btn', 'up', { stagger: 0.1 }), 1);

  put(makeTween('.hero .sun', 'pop', { duration: 1.1, ease: 'power2.out' }), 0.45);
  put(makeTween('.hero .polaroid', 'pop', { duration: 0.9, stagger: 0.12 }), 0.7);
}

/** Revelados por sección al hacer scroll. */
function sections() {
  // — Historia
  reveal('#historia .kicker', 'up', { trigger: '#historia .texto' });
  revealWords('#historia h2', { trigger: '#historia .texto' });
  reveal('#historia .texto p', 'up', { trigger: '#historia .texto', stagger: 0.14 });
  reveal('#historia .timeline li', 'up', {
    trigger: '#historia .timeline',
    start: 'top 82%',
    stagger: 0.16,
  });
  reveal('#historia .sello', 'pop', { trigger: '#historia .texto', start: 'top 85%' });

  const dots = q('#historia .dot');
  if (dots.length) {
    const trigger = '#historia .timeline';
    const scrollTrigger = { trigger, start: 'top 82%', once: true };

    gsap.fromTo(
      dots,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.16, scrollTrigger },
    );
    gsap.fromTo(
      q('#historia .line'),
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 0.7, ease: 'power2.out', stagger: 0.16, scrollTrigger },
    );
  }

  // — Productos
  reveal('#productos .kicker', 'up', { trigger: '#productos .title' });
  revealWords('#productos h2', { trigger: '#productos .title' });
  reveal('#productos .head p', 'up', { trigger: '#productos .title' });
  reveal('#productos .card', 'pop', {
    trigger: '#productos .grid',
    stagger: 0.11,
    start: 'top 82%',
  });

  // — Puntos de venta
  reveal('#puntos .kicker', 'up', { trigger: '#puntos .title' });
  revealWords('#puntos h2', { trigger: '#puntos .title' });
  reveal('#puntos .head > p', 'up', { trigger: '#puntos .title' });
  reveal('#puntos .ficha', 'up', {
    trigger: '#puntos .lista',
    stagger: 0.12,
    start: 'top 82%',
  });
  reveal('#puntos .lado > *', 'up', {
    trigger: '#puntos .lado',
    stagger: 0.14,
    start: 'top 84%',
  });

  // — Campo
  reveal('#campo .kicker', 'up', { trigger: '#campo .intro' });
  revealWords('#campo h2', { trigger: '#campo .intro' });
  reveal('#campo .intro p', 'up', { trigger: '#campo .intro' });
  reveal('#campo .fotos .polaroid', 'pop', {
    trigger: '#campo .fotos',
    stagger: 0.14,
    start: 'top 82%',
  });
  reveal('#campo .nota', 'up', { trigger: '#campo .nota', start: 'top 88%' });

  // — Maquila
  reveal('#maquila .kicker', 'up', { trigger: '#maquila .texto' });
  revealWords('#maquila h2', { trigger: '#maquila .texto' });
  reveal('#maquila .texto > p', 'up', { trigger: '#maquila .texto' });
  reveal('#maquila .actions .btn', 'up', { trigger: '#maquila .actions', stagger: 0.1 });
  reveal('#maquila .foto .polaroid', 'pop', { trigger: '#maquila .foto' });

  // — Contacto
  reveal('#contacto .kicker', 'up', { trigger: '#contacto .top' });
  revealWords('#contacto h2', { trigger: '#contacto .top' });
  reveal('#contacto .datos > *', 'up', { trigger: '#contacto .datos', stagger: 0.12 });
  reveal('#contacto .bottom', 'up', { trigger: '#contacto .bottom', start: 'top bottom' });
}

/** Movimiento continuo ligado al scroll (profundidad). */
function parallax() {
  gsap.to('.hero .collage', {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
  });

  q('#campo .fotos .foto').forEach((foto) => {
    gsap.fromTo(
      foto,
      { y: 34 },
      {
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: '#campo .fotos',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      },
    );
  });
}

/* ------------------------------------------------------------------ */
/* Arranque                                                           */
/* ------------------------------------------------------------------ */

function init() {
  intro();
  sections();
  parallax();

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh).catch(() => {});

  // Todo arrancó bien: el respaldo de Layout ya no debe tocar nada.
  window.__fxStarted = true;
  window.clearTimeout(window.__fxFallback);
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFx = document.querySelector('[data-fx]');

if (reduced || !hasFx) {
  // Sin animaciones: devolvemos la página a su estado visible.
  window.clearTimeout(window.__fxFallback);
  document.documentElement.classList.remove('js-anim');
} else {
  init();
}
