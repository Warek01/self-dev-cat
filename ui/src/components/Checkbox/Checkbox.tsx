import { ChangeEventHandler, forwardRef, memo, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import type { CheckboxProps } from './Checkbox.types'

export const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        checkboxPosition = 'left',
        defaultChecked = false,
        className,
        name,
        onChange,
        label,
        disabled = false,
        boxSizeRatio = 1.15,
      },
      ref,
    ) => {
      const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
          onChange?.(event.target.checked)
        },
        [onChange],
      )

      return (
        <label
          htmlFor={name}
          className={twMerge(
            'flex items-center gap-3 p-1 relative text-sm',
            className,
          )}
        >
          {checkboxPosition === 'right' ? <span>{label}</span> : null}
          <input
            type="checkbox"
            defaultChecked={defaultChecked}
            ref={ref}
            disabled={disabled}
            name={name}
            id={name}
            className="accent-gray-400 relative"
            onChange={handleChange}
            style={{ transform: `scale(${boxSizeRatio})`, bottom: '0.1em' }}
          />
          {checkboxPosition === 'left' ? <span>{label}</span> : null}
        </label>
      )
    },
  ),
)
