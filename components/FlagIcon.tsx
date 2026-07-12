const WHITE = '#c9c9c4';
const RED = '#8f4c48';
const BLUE = '#46647f';
const BLUE_DARK = '#3d5772';
const GREEN = '#4c7a63';
const GOLD = '#b3975f';
const BLACK = '#2a2a2a';
const NAVY = '#35455c';

export type FlagCode = 'en' | 'hr' | 'de' | 'it' | 'ru' | 'hu' | 'cs' | 'sk';

function FlagSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="18"
      height="13"
      className="flex-shrink-0 transition-[filter] duration-150 ease-in-out group-hover:brightness-125"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function flagShape(code: FlagCode) {
  switch (code) {
    case 'en':
      // Simplified Union Jack: navy field, white-bordered red diagonals + cross
      return (
        <>
          <rect x="0" y="0" width="20" height="14" fill={NAVY} />
          <line x1="0" y1="0" x2="20" y2="14" stroke={WHITE} strokeWidth="3" strokeLinecap="square" />
          <line x1="20" y1="0" x2="0" y2="14" stroke={WHITE} strokeWidth="3" strokeLinecap="square" />
          <line x1="0" y1="0" x2="20" y2="14" stroke={RED} strokeWidth="1.2" strokeLinecap="square" />
          <line x1="20" y1="0" x2="0" y2="14" stroke={RED} strokeWidth="1.2" strokeLinecap="square" />
          <rect x="0" y="5" width="20" height="4" fill={WHITE} />
          <rect x="8" y="0" width="4" height="14" fill={WHITE} />
          <rect x="0" y="6" width="20" height="2" fill={RED} />
          <rect x="9" y="0" width="2" height="14" fill={RED} />
        </>
      );
    case 'hr': {
      // Horizontal tricolor: red / white / blue, with a centered red/white checkerboard (šahovnica)
      const cell = 1;
      const cols = 5;
      const rows = 5;
      const startX = 10 - (cols * cell) / 2;
      const startY = 7 - (rows * cell) / 2;
      const squares = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const isRed = (r + c) % 2 === 0;
          squares.push(
            <rect
              key={`${r}-${c}`}
              x={startX + c * cell}
              y={startY + r * cell}
              width={cell}
              height={cell}
              fill={isRed ? RED : WHITE}
            />
          );
        }
      }
      return (
        <>
          <rect x="0" y="0" width="20" height="4.67" fill={RED} />
          <rect x="0" y="4.67" width="20" height="4.66" fill={WHITE} />
          <rect x="0" y="9.33" width="20" height="4.67" fill={BLUE} />
          <rect
            x={startX - 0.3}
            y={startY - 0.3}
            width={cols * cell + 0.6}
            height={rows * cell + 0.6}
            fill={WHITE}
          />
          {squares}
        </>
      );
    }
    case 'de':
      // Horizontal tricolor: black / red / gold
      return (
        <>
          <rect x="0" y="0" width="20" height="4.67" fill={BLACK} />
          <rect x="0" y="4.67" width="20" height="4.66" fill={RED} />
          <rect x="0" y="9.33" width="20" height="4.67" fill={GOLD} />
        </>
      );
    case 'it':
      // Vertical tricolor: green / white / red
      return (
        <>
          <rect x="0" y="0" width="6.67" height="14" fill={GREEN} />
          <rect x="6.67" y="0" width="6.66" height="14" fill={WHITE} />
          <rect x="13.33" y="0" width="6.67" height="14" fill={RED} />
        </>
      );
    case 'ru':
      // Horizontal tricolor: white / blue / red
      return (
        <>
          <rect x="0" y="0" width="20" height="4.67" fill={WHITE} />
          <rect x="0" y="4.67" width="20" height="4.66" fill={BLUE} />
          <rect x="0" y="9.33" width="20" height="4.67" fill={RED} />
        </>
      );
    case 'hu':
      // Horizontal tricolor: red / white / green
      return (
        <>
          <rect x="0" y="0" width="20" height="4.67" fill={RED} />
          <rect x="0" y="4.67" width="20" height="4.66" fill={WHITE} />
          <rect x="0" y="9.33" width="20" height="4.67" fill={GREEN} />
        </>
      );
    case 'cs':
      // White top / red bottom, with a blue triangle from the hoist edge to the horizontal center
      return (
        <>
          <rect x="0" y="0" width="20" height="7" fill={WHITE} />
          <rect x="0" y="7" width="20" height="7" fill={RED} />
          <polygon points="0,0 0,14 10,7" fill={BLUE_DARK} />
        </>
      );
    case 'sk':
      // Horizontal tricolor: white / blue / red, with a simplified red shield +
      // white double-cross emblem on the hoist side to distinguish from RU
      return (
        <>
          <rect x="0" y="0" width="20" height="4.67" fill={WHITE} />
          <rect x="0" y="4.67" width="20" height="4.66" fill={BLUE_DARK} />
          <rect x="0" y="9.33" width="20" height="4.67" fill={RED} />
          <rect x="2" y="3.5" width="5" height="8" fill={RED} stroke={WHITE} strokeWidth="0.4" />
          <rect x="4.15" y="4.3" width="0.9" height="6.4" fill={WHITE} />
          <rect x="2.6" y="5.6" width="3.8" height="0.9" fill={WHITE} />
          <rect x="2.6" y="7.9" width="3.8" height="0.9" fill={WHITE} />
        </>
      );
    default:
      return null;
  }
}

export default function FlagIcon({ code }: { code: FlagCode }) {
  return <FlagSvg>{flagShape(code)}</FlagSvg>;
}
