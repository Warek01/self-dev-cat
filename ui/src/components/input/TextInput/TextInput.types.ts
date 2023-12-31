import type { ChangeEventHandler } from 'react'

export interface TextInputProps {
  name?: string
  password?: boolean
  placeholder?: string
  autoComplete?: boolean
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  invalid?: boolean
  invalidText?: string
}
