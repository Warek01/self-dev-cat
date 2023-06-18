import { useDispatch } from 'react-redux'

import { AppDispatch } from '../stores/store.ts'

export const useAppDispatch: () => AppDispatch = useDispatch
