/**
 * Tactile Haptic Feedback Utility for Android WebViews & Mobile Browsers
 */
export const triggerHaptic = (pattern = 15) => {
  try {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Graceful fallback on devices/browsers where Vibration API is blocked or unavailable
  }
};

export const haptics = {
  light: () => triggerHaptic(10),
  medium: () => triggerHaptic(20),
  heavy: () => triggerHaptic(35),
  success: () => triggerHaptic([15, 40, 20]),
  warning: () => triggerHaptic([30, 50, 30]),
  selection: () => triggerHaptic(8)
};
