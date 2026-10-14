import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { popUpTransition, popUpViewport, scrollVariants } from '../lib/scrollAnimations'

const MotionLink = motion(Link)

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  a: motion.a,
  ul: motion.ul,
  form: motion.form,
  button: motion.button,
}

export default function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as = 'div',
  to,
  once = true,
  ...props
}) {
  const variants = scrollVariants[variant] || scrollVariants.up
  const Component = to ? MotionLink : motionTags[as] || motion.div

  return (
    <Component
      {...(to ? { to } : {})}
      initial={variants.hidden}
      whileInView={variants.visible}
      viewport={{ ...popUpViewport, once }}
      transition={popUpTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
