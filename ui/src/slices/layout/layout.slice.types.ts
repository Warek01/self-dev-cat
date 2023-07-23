import type { OpenedModalWindow } from "@enums";

export interface LayoutSliceProps {
  theme: 'dark' | 'light'
  isSideMenuOpened: boolean
  isMobile: boolean
  openedModalWindow: OpenedModalWindow | null
}
