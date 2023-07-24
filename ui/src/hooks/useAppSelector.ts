import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '@constants/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector<RootState>
