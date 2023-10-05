import classNames, { ArgumentArray } from 'classnames'
import { twMerge } from 'tailwind-merge'

export const cl = (...args: ArgumentArray) => twMerge(classNames(...args))
