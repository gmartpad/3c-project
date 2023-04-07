import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { favoritesSlice } from './favoritesSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    reducer: {
      [favoritesSlice.name]: favoritesSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const store = makeStore()

export const wrapper = createWrapper<AppStore>(makeStore)
