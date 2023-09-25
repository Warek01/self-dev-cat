import type { FC, SVGProps } from 'react'

declare global {
  type IconComponent = FC<SVGProps<SVGSVGElement>>
  type DisplayBreakpoint = '2xl' | 'Xl' | 'Lg' | 'Md' | 'Sm'
}
