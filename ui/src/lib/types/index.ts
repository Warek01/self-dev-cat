import type { FC, SVGProps } from 'react'

// Globally available types
declare global {
  type IconComponent = FC<SVGProps<SVGSVGElement>>
  type DisplayBreakpoint = '2xl' | 'Xl' | 'Lg' | 'Md' | 'Sm'
}

export {}
