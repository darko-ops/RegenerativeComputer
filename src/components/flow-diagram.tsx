const PROVIDERS = ["PROVIDER 01", "PROVIDER 02", "PROVIDER 03", "PROVIDER 04"];

const BOX_H = 46;
const GAP = 18;
const RIGHT_X = 690;
const RIGHT_W = 210;
const HUB_X = 330;
const HUB_W = 230;
const HUB_H = 76;
const CENTER_Y = 140;
const HUB_Y = CENTER_Y - HUB_H / 2;

const STACK_H = PROVIDERS.length * BOX_H + (PROVIDERS.length - 1) * GAP;
const STACK_TOP = CENTER_Y - STACK_H / 2;

/** Sized in SVG user units so it renders ~11px after the viewBox scales down. */
const TEXT = {
  fontFamily: "var(--font-mono)",
  fontSize: 15,
  letterSpacing: 1.6,
} as const;

export function FlowDiagram() {
  return (
    <figure className="flex h-full flex-col justify-center border border-rule bg-paper-raised p-6 sm:p-10">
      <svg
        viewBox="0 0 900 300"
        className="w-full"
        role="img"
        aria-label="Your workload goes to Regenerative Computer, which sources competing capacity from multiple GPU providers."
      >
        <defs>
          <marker
            id="flow-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-rule-strong)" />
          </marker>
        </defs>

        {/* Workload */}
        <rect
          x="0"
          y={CENTER_Y - 33}
          width="200"
          height="66"
          fill="none"
          stroke="var(--color-rule-strong)"
        />
        <text
          x="100"
          y={CENTER_Y + 5}
          textAnchor="middle"
          fill="var(--color-ink)"
          {...TEXT}
        >
          YOUR WORKLOAD
        </text>

        {/* Workload → hub */}
        <line
          x1="200"
          y1={CENTER_Y}
          x2={HUB_X - 8}
          y2={CENTER_Y}
          stroke="var(--color-rule-strong)"
          markerEnd="url(#flow-arrow)"
        />

        {/* Hub */}
        <rect
          x={HUB_X}
          y={HUB_Y}
          width={HUB_W}
          height={HUB_H}
          fill="var(--color-ink)"
        />
        <text
          x={HUB_X + HUB_W / 2}
          y={CENTER_Y + 5}
          textAnchor="middle"
          fill="var(--color-paper)"
          {...TEXT}
        >
          REGENERATIVE
        </text>
        <text
          x={HUB_X + HUB_W / 2}
          y={HUB_Y + HUB_H + 26}
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          {...TEXT}
          fontSize={13}
        >
          SOURCE · NORMALIZE · COMPARE
        </text>

        {/* Hub → providers */}
        {PROVIDERS.map((_, i) => {
          const y = STACK_TOP + i * (BOX_H + GAP) + BOX_H / 2;
          const midX = (HUB_X + HUB_W + RIGHT_X) / 2;
          return (
            <path
              key={i}
              d={`M ${HUB_X + HUB_W} ${CENTER_Y} H ${midX} V ${y} H ${RIGHT_X - 8}`}
              fill="none"
              stroke="var(--color-rule-strong)"
              markerEnd="url(#flow-arrow)"
            />
          );
        })}

        {/* Providers */}
        {PROVIDERS.map((label, i) => {
          const y = STACK_TOP + i * (BOX_H + GAP);
          return (
            <g key={label}>
              <rect
                x={RIGHT_X}
                y={y}
                width={RIGHT_W}
                height={BOX_H}
                fill="none"
                stroke="var(--color-rule-strong)"
              />
              <text
                x={RIGHT_X + RIGHT_W / 2}
                y={y + BOX_H / 2 + 5}
                textAnchor="middle"
                fill="var(--color-ink-muted)"
                {...TEXT}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-8 border-t border-rule pt-5 text-sm leading-relaxed text-ink-muted">
        One request in. Comparable offers out. The provider remains the
        underlying compute counterparty.
      </figcaption>
    </figure>
  );
}
