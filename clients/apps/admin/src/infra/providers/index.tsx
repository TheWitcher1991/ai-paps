'use client'

import { ReactNode } from 'react'
import WithReactQuery from './with-react-query'
import { ToastProvider } from './toast-provider'

interface WithProvidersProps {
  children: ReactNode
}

export default function WithProviders({ children }: WithProvidersProps) {
  return (
    <WithReactQuery>
      <ToastProvider>
        {children}
      </ToastProvider>
    </WithReactQuery>
  )
}
