import { ErrorMessage, Field } from 'formik'
import { FC, memo } from 'react'

import type { FormTextFieldProps } from './FormtextField.types'

export const FormTextField: FC<FormTextFieldProps> = memo(
  ({
    placeholder,
    name,
    className,
    autoComplete = true,
    password = false,
    disabled = false,
  }) => {
    return (
      <label htmlFor={name} className="relative w-full">
        <Field
          disabled={disabled}
          type={password ? 'password' : 'text'}
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
        <ErrorMessage
          component="P"
          name={name}
          className="absolute text-red-600 dark:text-red-500 text-xs pl-4 pt-1"
        />
      </label>
    )
  },
)
