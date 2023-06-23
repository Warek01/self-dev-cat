import type { FC, SVGProps } from 'react'

// Globally available types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_PUBLIC_API_URL: string
    }
  }

  type IconComponent = FC<SVGProps<SVGSVGElement>>
}

export {}
