import { forwardRef, memo } from 'react'

import type { TextInputProps } from './TextInput.types'

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      name,
      className,
      autoComplete = true,
      password = false,
      onChange,
      invalid = false,
      invalidText,
    },
    ref,
  ) => {
    return (
      <label htmlFor={name} className="relative">
        <input
          type={password ? 'password' : 'text'}
          ref={ref}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          autoComplete={autoComplete ? 'true' : 'false'}
          className={`
          bg-black/5 dark:bg-dark-white/5 rounded-full shadow-lg 
          py-2 px-4 focus:outline-none text-black dark:text-dark-white
          ${className}
        `}
        />
        <p
          className={`${
            invalid ? '' : 'hidden'
          } absolute text-red-600 dark:text-red-500 text-xs pl-4 pt-1`}
        >
          {invalidText}
        </p>
      </label>
    )
  },
)

export default memo(
  TextInput,
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.invalid === nextProps.invalid,
)
