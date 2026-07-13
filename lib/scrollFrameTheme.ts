// Flat gray tints painted over each page's scroll-scrubbed video background
// (see components/ScrollFrameBackground.tsx) — one per page, since each
// needs a different strength: Home has no photo content competing for
// legibility so it can go dark; Accommodation's "Our Collection" grid needs
// its property photos to stay clearly visible, hence the much lighter tint.
// Both are #474748 (this site's charcoal) at different alpha.
export const HOME_OVERLAY_BG = 'rgba(71, 71, 72, 0.7)';
export const ACCOMMODATION_OVERLAY_BG = 'rgba(71, 71, 72, 0.5)';
