import { useEffect } from 'react'

import { Breakpoint } from '../constants/Breakpoint.ts'

type CallbackInit =
  | ((event: MediaQueryListEvent) => any)
  | {
      callback: (event: MediaQueryListEvent) => any
      /** Whether to dispatch event on init or not */
      initCall: boolean
    }

interface Action {
  breakPoint: DisplayBreakpoint
  callback: CallbackInit
  media: MediaQueryList
}

export type CallbackMap = {
  [key in DisplayBreakpoint]?: CallbackInit
}

/** Calls a provided callback when screen reaches a specific breakpoint */
const useBreakpointCallback = (callbackMap: CallbackMap): void => {
  useEffect(() => {
    const actions: Action[] = []

    Object.entries(callbackMap).forEach(([breakpoint, callback]) => {
      const media = matchMedia(
        `(width <= ${Breakpoint[breakpoint as DisplayBreakpoint]}px)`,
      )

      if (typeof callback === 'function') {
        media.addEventListener('change', callback)
      } else {
        media.addEventListener('change', callback.callback)

        if (callback.initCall) {
          media.dispatchEvent(
            new MediaQueryListEvent('change', {
              media: media.media,
              matches: media.matches,
              bubbles: false,
              cancelable: false,
              composed: false,
            }),
          )
        }
      }

      const action: Action = {
        callback: callback,
        breakPoint: breakpoint as DisplayBreakpoint,
        media: media,
      }

      actions.push(action)
    })

    return () => {
      actions.forEach(({ callback, media }) => {
        media.removeEventListener(
          'change',
          typeof callback === 'function' ? callback : callback.callback,
        )
      })
    }
  }, [])
}

export default useBreakpointCallback
