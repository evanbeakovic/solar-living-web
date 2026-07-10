/**
 * Remounts on every route change, playing a single enter-only fade-up on the
 * incoming page (exit animations would delay navigation — wrong trade for a
 * booking site). Navbar and Footer live in the layout, outside this wrapper,
 * so they never re-animate. The animation must not fill forwards: a filling
 * transform animation leaves a computed identity transform (not none) after
 * finishing, making this div a permanent containing block that breaks
 * position: fixed descendants — see .page-enter in globals.css. Modals are
 * portaled to <body> regardless, so nothing fixed renders under this div.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
