// Slow, cinematic easing for scroll reveals (no spring bounce).
const ease = [0.16, 1, 0.3, 1]

export const popUpViewport = { once: true, margin: '-60px', amount: 0.2 }

export const popUpTransition = (index = 0) => ({
  duration: 1,
  ease,
  delay: index * 0.1,
})

export const popUpHidden = { opacity: 0, y: 28 }
export const popUpVisible = { opacity: 1, y: 0 }

export const scrollVariants = {
  up: { hidden: popUpHidden, visible: popUpVisible },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  subtle: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
}
