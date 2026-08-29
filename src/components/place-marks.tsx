import type { ReactNode, SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement>;

function Badge({ children, ...props }: MarkProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 2.2h12L29.8 10v12L22 29.8H10L2.2 22V10z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
}

const GLYPHS: Record<string, (props: MarkProps) => ReactNode> = {
  "wayne-tower": (props) => (
    <Badge {...props}>
      <path d="M16 6.5 20.2 12H11.8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.2 12v11.5h5.6V12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 23.5h10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 14.2h2M15 17.2h2M15 20.2h2" stroke="currentColor" strokeWidth="1.4" />
    </Badge>
  ),
  gsg: (props) => (
    <Badge {...props}>
      <ellipse cx="16" cy="16.2" rx="8.2" ry="5.6" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="16.2" rx="4.6" ry="2.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.2 16.2h15.6" stroke="currentColor" strokeWidth="1.2" />
    </Badge>
  ),
  "city-hall": (props) => (
    <Badge {...props}>
      <path d="M16 7.2 24 13.2H8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10.4 13.2v9.6M16 13.2v9.6M21.6 13.2v9.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.6 22.8h14.8" stroke="currentColor" strokeWidth="1.5" />
    </Badge>
  ),
  gcpd: (props) => (
    <Badge {...props}>
      <path
        d="M16 7.2 23 10.4v6.2c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8v-6.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.2 17.3 14h3l-2.4 1.8.9 2.9L16 17.2 13.2 18.7l.9-2.9L11.7 14h3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </Badge>
  ),
  iceberg: (props) => (
    <Badge {...props}>
      <ellipse cx="16" cy="20.6" rx="5.4" ry="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="13.2" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18.8 12.4 22 13.6 18.8 14.8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14.6 12.6h.1M17.4 12.6h.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </Badge>
  ),
  "riddler-room": (props) => (
    <Badge {...props}>
      <path
        d="M12.2 12.2c0-2.3 1.8-4 3.8-4s3.8 1.7 3.8 4c0 1.7-1 2.6-2.4 3.4-.9.5-1.4 1.2-1.4 2.2v.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22.4" r="1.15" fill="currentColor" />
    </Badge>
  ),
  "crown-point": (props) => (
    <Badge {...props}>
      <path
        d="M8.8 16.2 12.4 10l3.6 5 3.6-5 3.6 6.2H8.8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.4 19.8c1.8-1.2 3.4-.2 5 0s3.4-1.2 5 0 3.4-.2 4.2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9.4 22.6c1.8-1.2 3.4-.2 5 0s3.4-1.2 5 0 3.4-.2 4.2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Badge>
  ),
  orphanage: (props) => (
    <Badge {...props}>
      <path d="M8.6 15.2 16 8.6l7.4 6.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10.4 14.8v9.2h11.2v-9.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14.2" y="17.4" width="3.6" height="6.6" stroke="currentColor" strokeWidth="1.4" />
    </Badge>
  ),
  "park-row": (props) => (
    <Badge {...props}>
      <path d="M16 7.4v11.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 10.2c3.4 0 5.6 1.6 5.6 3.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="21.6" r="2.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 25.2h10" stroke="currentColor" strokeWidth="1.5" />
    </Badge>
  ),
  cave: (props) => (
    <Badge {...props}>
      <path
        d="M7.6 18.2c2.4-1.4 4.2-6 8.4-6s6 4.6 8.4 6c-1.8 3.4-4.6 5.6-8.4 5.6s-6.6-2.2-8.4-5.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12.4 18.6 16 16.4l3.6 2.2" stroke="currentColor" strokeWidth="1.4" />
    </Badge>
  ),
  falcone: (props) => (
    <Badge {...props}>
      <path d="M11 22.8V13.2h10v9.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.4 13.2h13.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8.4 19.6 13H12.4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14.4 16.2h3.2v6.6h-3.2z" stroke="currentColor" strokeWidth="1.4" />
    </Badge>
  ),
  seawall: (props) => (
    <Badge {...props}>
      <path d="M8 14.4h16v3.4H8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.2 14.4V12M16 14.4V11.2M21.8 14.4V12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.8 21.2c2-1.4 3.6-.2 5.2 0s3.4-1.4 5.2 0 3.4-.2 4.8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.8 24c2-1.4 3.6-.2 5.2 0s3.4-1.4 5.2 0 3.4-.2 4.8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Badge>
  ),
  arkham: (props) => (
    <Badge {...props}>
      <path d="M16 7.6 23.2 12v11.2H8.8V12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 14.4v8.8M19 14.4v8.8M11.4 18.4h9.2" stroke="currentColor" strokeWidth="1.4" />
    </Badge>
  ),
};

function FallbackMark(props: MarkProps) {
  return (
    <Badge {...props}>
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    </Badge>
  );
}

export function PlaceMark({
  id,
  className = "size-8",
}: {
  id: string;
  className?: string;
}) {
  const Glyph = GLYPHS[id] ?? FallbackMark;
  return <Glyph className={className} />;
}
