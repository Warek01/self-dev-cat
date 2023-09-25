export interface CheckboxProps {
  label: string
  name: string
  defaultChecked?: boolean
  checkboxPosition?: 'left' | 'right'
  className?: string
  disabled?: boolean
  boxSizeRatio?: number
  onChange?: (value: boolean) => void
}
