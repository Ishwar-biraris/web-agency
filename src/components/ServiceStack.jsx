



import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./ServiceStack.css";

/* =========================
   CONSTANTS
========================= */
const DESIGN_WIDTH = 1200;
const BREAKPOINT = 1000;
const MOBILE_BREAKPOINT = 768;
const CARD_WIDTH = 300;
const GAP = 40;
const CARD_HEIGHT = 420;
const STACK_PADDING = 120;
const ROW_GAP = 460;
const MOBILE_ROW_GAP = 420; 

/* =========================
   DATA
========================= */
const services = [
  {
    title: "Website Design",
    color: "#e0686caf",
    rotate: 6,
    mobileRotate: -2,
    x: 20,
    y: -16,
    image: "/images/stack1.png",   // 👈
    items: ["Custom Modern Websites", "Fast, Responsive, Mobile-first", "Built for conversions"],
  },
  {
    title: "Ecommerce Websites",
    color: "#ddbd63af",
    rotate: -3,
    mobileRotate: 1,
    x: 230,
    y: 16,
    image: "/images/ecommerce.png",         // 👈
    items: ["Shopify, WooCommerce setup", "Product pages optimized for sales", "Payment & shipping integration"],
  },
  {
    title: "Landing Pages",
    color: "#a6d954af",
    rotate: 4,
    mobileRotate: -1,
    x: 440,
    y: -16,
    image: "images/stack3.png",     // 👈
    items: ["High-converting single pages", "Campaign / ad-focused pages", "Lead generation design"],
  },
  {
    title: "Conversion Optimization",
    color: "#5caee1af",
    rotate: -5,
    mobileRotate: 2,
    x: 650,
    y: 16,
    image: "/images/stack4.png",        // 👈
    items: ["Improve UI/UX", "Better CTA placements"],
  },
  {
    title: "Maintenance",
    color: "#a887d6af",
    rotate: 8,
    mobileRotate: -3,
    x: 860,
    y: -16,
    image: "/images/stack5.png",       // 👈
    items: ["Monthly Updates & Bug fixes", "Speed optimization", "Security & backups"],
  },
];

/* =========================
   SCALE
========================= */
function getScale(width) {
  const scale = width / DESIGN_WIDTH;
  return Math.min(1, Math.max(0.85, scale));
}

/* =========================
   VIEWPORT WIDTH
========================= */
function getViewportWidth() {
  return window.innerWidth;
}

/* =========================
   POSITION
========================= */
function getPosition(index, containerWidth, scale) {
  const vw = getViewportWidth();

  if (vw >= BREAKPOINT) {
    return {
      x: (services[index].x - DESIGN_WIDTH / 2) * scale + containerWidth / 2,
      y: services[index].y,
    };
  }

  if (vw < MOBILE_BREAKPOINT) {
  return {
    x: containerWidth / 2,
    y: index * MOBILE_ROW_GAP, // 👈 was ROW_GAP
  };
}


  const columns = 2;
  const col = index % columns;
  const row = Math.floor(index / columns);

  const scaledCard = CARD_WIDTH * scale;
  const scaledGap = GAP * scale;

  const rowWidth = columns * scaledCard + scaledGap;
  const startX = (containerWidth - rowWidth) / 2;

  if (index === services.length - 1) {
    return {
      x: containerWidth / 2,
      y: row * ROW_GAP,
    };
  }

  return {
    x: startX + col * (scaledCard + scaledGap) + scaledCard / 2,
    y: row * ROW_GAP,
  };
}

/* =========================
   COMPONENT
========================= */
export default function ServiceStack() {
  const cardsRef = useRef([]);
  const stackRef = useRef(null);
  const leaveTimeout = useRef(null);

  const isTablet = () => getViewportWidth() < BREAKPOINT;

  /* =========================
     INITIAL LAYOUT
  ========================= */
  useLayoutEffect(() => {
    const layout = () => {
      if (!stackRef.current) return;

      const containerWidth = stackRef.current.offsetWidth;
      const scale = getScale(containerWidth);
      const vw = getViewportWidth();
      const isNonDesktop = vw < BREAKPOINT;

      let maxY = 0;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const pos = getPosition(i, containerWidth, scale);

        gsap.set(card, {
          x: pos.x,
          y: pos.y,
          xPercent: isNonDesktop ? -50 : 0,
          rotate: vw < MOBILE_BREAKPOINT ? services[i].mobileRotate : services[i].rotate, // 👈 only change
          scale,
          zIndex: i,
        });

        maxY = Math.max(maxY, pos.y);
      });

      stackRef.current.style.height =
        maxY + CARD_HEIGHT * scale + STACK_PADDING + "px";
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  /* =========================
     BASE TRANSFORM
  ========================= */
  const getBase = (i, containerWidth, scale) => {
    const vw = getViewportWidth();
    const pos = getPosition(i, containerWidth, scale);
    return {
      x: pos.x,
      y: pos.y,
      rotate: vw < MOBILE_BREAKPOINT ? services[i].mobileRotate : services[i].rotate, // 👈 only change
      scale,
    };
  };

  /* =========================
     HOVER ENTER
  ========================= */
  const onEnter = (hoveredIdx) => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }

    if (isTablet()) return;

    const containerWidth = stackRef.current.offsetWidth;
    const scale = getScale(containerWidth);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.killTweensOf(card);
      const base = getBase(i, containerWidth, scale);

      if (i === hoveredIdx) {
        gsap.to(card, {
          ...base,
          rotate: 0,
          scale: scale * 1.08,
          y: base.y - 40,
          duration: 0.4,
          ease: "back.out(1.4)",
        });
      } else {
        const dir = i < hoveredIdx ? -1 : 1;
        const distance = Math.abs(i - hoveredIdx);

        gsap.to(card, {
          x: base.x + dir * 160 * scale,
          y: base.y + 10,
          rotate: base.rotate + dir * 6,
          scale: scale * 0.96,
          duration: 0.4,
          delay: distance * 0.05,
          ease: "back.out(1.4)",
        });
      }
    });
  };

  /* =========================
     HOVER LEAVE
  ========================= */
  const onLeave = () => {
    if (isTablet()) return;

    leaveTimeout.current = setTimeout(() => {
      const containerWidth = stackRef.current.offsetWidth;
      const scale = getScale(containerWidth);

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.killTweensOf(card);
        const base = getBase(i, containerWidth, scale);

        gsap.to(card, {
          ...base,
          duration: 0.4,
          ease: "back.out(1.4)",
        });
      });
    }, 80);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <section className="services-section">
      <h2 className="services-title">Services we provide</h2>

      <div className="stack-wrapper">
        <div className="stack" ref={stackRef}>
          {services.map((s, i) => (
            <div
              key={s.title}
              className="card"
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={onLeave}
              style={{ background: s.color }}
            >
              <img
  className="cardImg"
  src={s.image} 
  alt={s.title}
/>
              <h3>{s.title}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}