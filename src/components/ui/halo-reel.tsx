"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Halo Reel ───────────────────────────────────────────────────
 * Cards ride an ellipse. Card i sits at θ = i·step + rotation on an
 * ellipse of radii (rx, ry):
 *
 *   x = rx·cos θ      y = ry·sin θ      scale = min + (1−min)·(cos θ + 1)/2
 *
 * cos θ does all the work: it places the card, sizes it, and — through the
 * scale — stacks it. One number driving three properties is why a card that
 * looks nearer *is* nearer; the stacking can never disagree with the
 * perspective.
 *
 * Where the ellipse is centred across the stage. `0` pins it to the left
 * edge, so the far half of the ring is clipped away. @default 0
 * ─────────────────────────────────────────────────────────────── */

export type HaloReelItem = {
  src?: string;
  alt?: string;
  bgColor?: string;
  textColor?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  whatsappUrl?: string;
  detailsUrl?: string;
  icon?: React.ReactNode;
};

export interface HaloReelProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: HaloReelItem[];
  /** Exact number of slots around the ring. If omitted, calculated from radii and spread. */
  slots?: number;
  /** Card width in px at the front of the ring. @default 240 */
  cardWidth?: number;
  /** Card height in px at the front of the ring. @default 280 */
  cardHeight?: number;
  /** Scale of the card at the far side of the ring. @default 0.46 */
  minScale?: number;
  /** Horizontal radius as a fraction of the stage width. @default 0.46 */
  radiusXRatio?: number;
  /** Where the ellipse is centred across the stage. `0` pins it to the left edge. @default 0 */
  centerXRatio?: number;
  /** Vertical radius as a fraction of the stage height. @default 0.30 */
  radiusYRatio?: number;
  /** Rotate one card forward on a timer. @default true */
  autoPlay?: boolean;
  /** Time (ms) a card is held at the front before the next step. @default 2200 */
  holdDuration?: number;
  /** Duration (ms) of one step. @default 700 */
  stepDuration?: number;
  /** Hold the autoplay while a pointer rests on a card. @default true */
  pauseOnHover?: boolean;
  /** Spin the ring by dragging it. @default true */
  draggable?: boolean;
  /** Gap between neighbouring cards at the widest point of the ring. @default 1.2 */
  spread?: number;
  /** Ceiling on the number of cards drawn around the ring. @default 64 */
  maxCards?: number;
  /** Multiplier on the drag rotation. @default 1 */
  dragSensitivity?: number;
  /** Node parked in the middle of the ring, behind the cards. */
  centerLabel?: React.ReactNode;
  /** @default true */
  showCenterLabel?: boolean;
  /** Controls bar at the bottom. @default false */
  showControls?: boolean;
}

const TAU = Math.PI * 2;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function HaloReel({
  items,
  slots: slotsProp,
  cardWidth = 240,
  cardHeight = 280,
  minScale = 0.46,
  radiusXRatio = 0.46,
  centerXRatio = 0,
  radiusYRatio = 0.30,
  autoPlay = true,
  holdDuration = 2800,
  stepDuration = 800,
  pauseOnHover = true,
  draggable = true,
  spread = 1.3,
  maxCards = 64,
  dragSensitivity = 1,
  centerLabel,
  showCenterLabel = true,
  showControls = false,
  className,
  style,
  ...props
}: HaloReelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = items.length;

  const rotation = useMotionValue(0);
  const draggingRef = React.useRef(false);
  const hoverRef = React.useRef(false);

  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () =>
      setSize({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const radiusX = size.w * radiusXRatio;
  const radiusY = size.h * radiusYRatio;

  // The ring is sized by the stage and filled by repeating items (or using exact slots if provided)
  const calculatedSlots = clamp(
    Math.ceil(
      TAU *
        Math.max(
          radiusX / (cardWidth * spread),
          radiusY / (cardHeight * spread),
        ),
    ),
    count,
    Math.max(count, maxCards),
  );
  const slots = slotsProp ?? calculatedSlots;
  const step = slots ? TAU / slots : 0;

  // Cards shrink continuously to fit whatever box they are given
  const fit = size.w
    ? clamp(
        Math.min(
          size.w / (radiusX + cardWidth * 0.8),
          (size.h * 1.15) / (2 * radiusY + cardHeight),
        ),
        0.65,
        1,
      )
    : 1;
  const cardW = cardWidth * fit;
  const cardH = cardHeight * fit;

  // Autoplay
  React.useEffect(() => {
    if (!autoPlay || reduceMotion || !count) return;

    let timer = 0;
    let controls: ReturnType<typeof animate> | undefined;

    const tick = () => {
      timer = window.setTimeout(() => {
        if (draggingRef.current || (pauseOnHover && hoverRef.current)) {
          tick();
          return;
        }
        controls = animate(rotation, rotation.get() - step, {
          duration: stepDuration / 1000,
          ease: [0.4, 0, 0.2, 1],
          onComplete: tick,
        });
      }, holdDuration);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [
    autoPlay,
    count,
    holdDuration,
    pauseOnHover,
    reduceMotion,
    rotation,
    step,
    stepDuration,
  ]);

  /* ── drag ──────────────────────────────────────────────────── */

  const dragRef = React.useRef({ left: 0, top: 0, angle: 0 });

  const pointerAngle = (e: React.PointerEvent) => {
    const { left, top } = dragRef.current;
    return Math.atan2(
      (e.clientY - top - size.h / 2) / (radiusY || 1),
      (e.clientX - left - size.w * centerXRatio) / (radiusX || 1),
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || (e.pointerType === "mouse" && e.button !== 0)) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (e.pointerType === "touch") return; // No secuestrar el scroll vertical en pantallas táctiles
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = { left: rect.left, top: rect.top, angle: 0 };
    dragRef.current.angle = pointerAngle(e);
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const angle = pointerAngle(e);
    const delta =
      ((angle - dragRef.current.angle + Math.PI * 3) % TAU) - Math.PI;
    dragRef.current.angle = angle;
    rotation.set(rotation.get() + delta * dragSensitivity);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const snapped = Math.round(rotation.get() / step) * step;
    if (reduceMotion) {
      rotation.set(snapped);
      return;
    }
    animate(rotation, snapped, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
  };

  const spinBy = (direction: number) => {
    const target = Math.round(rotation.get() / step) * step - direction * step;
    if (reduceMotion) {
      rotation.set(target);
      return;
    }
    animate(rotation, target, {
      duration: stepDuration / 1000,
      ease: [0.4, 0, 0.2, 1],
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!direction) return;
    e.preventDefault();
    spinBy(direction);
  };

  if (!count) return null;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"] ?? "Carrusel de Servicios"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative h-[540px] sm:h-[600px] w-full touch-pan-y select-none overflow-hidden outline-none",
        draggable && "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className,
      )}
      style={style}
      {...props}
    >
      {showCenterLabel && centerLabel ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-4"
          style={{
            left: Math.min(size.w * 0.58, size.w * centerXRatio + radiusX + cardW / 2),
            right: 0,
          }}
        >
          {centerLabel}
        </div>
      ) : null}

      {Array.from({ length: slots }, (_, i) => (
        <WheelCard
          key={i}
          item={items[i % count]}
          decorative={i >= count}
          index={i}
          step={step}
          rotation={rotation}
          radiusX={radiusX}
          radiusY={radiusY}
          centerXRatio={centerXRatio}
          minScale={minScale}
          width={cardW}
          height={cardH}
          onHoverChange={(hovered) => {
            hoverRef.current = hovered;
          }}
        />
      ))}

      {/* Controles opcionales */}
      {showControls && (
        <div className="absolute bottom-3 left-6 z-30 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-lg">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              spinBy(-1);
            }}
            className="p-1 rounded-full hover:bg-slate-100 text-[#172B3A] transition-colors"
            aria-label="Servicio anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-semibold text-slate-600 px-1 select-none">
            Girar
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              spinBy(1);
            }}
            className="p-1 rounded-full hover:bg-slate-100 text-[#172B3A] transition-colors"
            aria-label="Siguiente servicio"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── card ────────────────────────────────────────────────────── */

function WheelCard({
  item,
  index,
  step,
  rotation,
  radiusX,
  radiusY,
  centerXRatio,
  minScale,
  width,
  height,
  decorative,
  onHoverChange,
}: {
  item: HaloReelItem;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  centerXRatio: number;
  minScale: number;
  width: number;
  height: number;
  decorative: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const cos = useTransform(rotation, (r) => Math.cos(index * step + r));
  const sin = useTransform(rotation, (r) => Math.sin(index * step + r));

  const x = useTransform(cos, (c) => c * radiusX);
  const y = useTransform(sin, (s) => s * radiusY);
  const scale = useTransform(
    cos,
    (c) => minScale + (1 - minScale) * ((c + 1) / 2),
  );
  const zIndex = useTransform(scale, (s) => Math.round(s * 25) + 1);

  // Órbita: se aprecian con total claridad 4 tarjetas a lo largo del arco frontal visible.
  // Las demás tarjetas en la parte posterior desvanecen suavemente a opacidad 0 y salen sucesivamente.
  const opacity = useTransform(cos, (c) => {
    if (c < -0.35) return 0;
    if (c < -0.05) return (c + 0.35) / 0.30;
    return 1;
  });
  const pointerEvents = useTransform(opacity, (o) => (o < 0.2 ? "none" : "auto"));

  return (
    <motion.div
      role={decorative ? undefined : "group"}
      aria-roledescription={decorative ? undefined : "slide"}
      aria-hidden={decorative || undefined}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      style={{
        x,
        y,
        scale,
        zIndex,
        opacity,
        pointerEvents,
        width,
        height,
        left: `${centerXRatio * 100}%`,
        top: "50%",
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      className="absolute overflow-hidden shadow-2xl rounded-2xl border border-white/20 select-none bg-slate-900 transition-shadow hover:shadow-[0_20px_50px_rgba(0,45,90,0.35)]"
    >
      {item.src ? (
        <div className="relative h-full w-full group overflow-hidden flex flex-col justify-end">
          <img
            src={item.src}
            alt={decorative ? "" : (item.alt ?? item.title ?? "")}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover brightness-[0.72] group-hover:scale-105 transition-transform duration-500"
          />
          {/* Degradado para garantizar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/75 to-transparent pointer-events-none" />

          {/* Contenido exclusivo: Imagen, Título, Frase debajo del título y los Dos Botones */}
          <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end text-white text-left space-y-1.5">
            {item.title && (
              <h4 className="text-sm sm:text-base font-bold leading-tight text-white drop-shadow-sm line-clamp-2">
                {item.title}
              </h4>
            )}
            {item.tagline && (
              <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2 leading-tight">
                {item.tagline}
              </p>
            )}

            {/* Los dos botones */}
            <div className="pt-2 flex items-center gap-2.5">
              {item.whatsappUrl && (
                <a
                  href={item.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-colors shadow-sm whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              )}
              {item.detailsUrl && (
                <a
                  href={item.detailsUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/90 hover:text-white bg-white/20 hover:bg-white/30 border border-white/25 transition-all whitespace-nowrap"
                >
                  <span>Detalles</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-end p-4 text-left rounded-2xl border border-slate-200/60 shadow-lg bg-[#172B3A] text-white">
          <div className="space-y-1.5">
            {item.title && (
              <h4 className="text-sm font-bold leading-tight text-white">
                {item.title}
              </h4>
            )}
            {item.tagline && (
              <p className="text-xs text-slate-200 leading-tight">
                {item.tagline}
              </p>
            )}
          </div>
          <div className="pt-2 flex items-center gap-2">
            {item.whatsappUrl && (
              <a
                href={item.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold text-white bg-[#FC6412]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Consultar</span>
              </a>
            )}
            {item.detailsUrl && (
              <a
                href={item.detailsUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold text-white bg-white/20"
              >
                <span>Detalles</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default HaloReel;
