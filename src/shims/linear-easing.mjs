// Minimal shim for motion-dom's linear-easing helper to avoid Next.js resolution errors
// Exports a function that indicates whether linear easing is supported; return false to keep fallbacks
export function supportsLinearEasing() {
  return false;
}

export default supportsLinearEasing;
