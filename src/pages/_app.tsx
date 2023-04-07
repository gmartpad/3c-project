import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    setRender(true)
  }, [])

  if(!render) return null

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
