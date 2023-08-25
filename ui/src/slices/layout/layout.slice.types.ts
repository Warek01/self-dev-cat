import type { Theme } from '@/types/Theme'

export interface LayoutSliceProps {
  theme: Theme
  isSideMenuOpened: boolean
  isChatSelectCollapsed: boolean
  isMobile: boolean
}
