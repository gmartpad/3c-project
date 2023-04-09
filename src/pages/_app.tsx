import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { wrapper } from '@store/store'
import { FavoritesProvider } from '../context/FavoriteContext'

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    setRender(true)
  }, [])

  if (!render) return null

  return (
    <Provider store={store}>
      <FavoritesProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </FavoritesProvider>
    </Provider>
  )
}

export default App
