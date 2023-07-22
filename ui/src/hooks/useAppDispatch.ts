import { useDispatch } from 'react-redux'

import { AppDispatch } from '../constants/store'

export const useAppDispatch: () => AppDispatch = useDispatch
