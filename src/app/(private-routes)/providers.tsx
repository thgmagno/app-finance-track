'use client'

import { actions } from '@/actions'
import { Toaster } from '@/components/ui/toaster'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const currentTimestamp = () => Math.ceil(new Date().getTime() / 1000)

  useEffect(() => {
    const interval = 8 * 60 * 40 // 8 hours

    const updateSession = async () => {
      await actions.auth.session.keepSessionUpdated()
      localStorage.setItem('lastSessionUpdated', String(currentTimestamp()))
    }

    const lastExecution = localStorage.getItem('lastSessionUpdated')
    const now = currentTimestamp()

    if (!lastExecution || now - parseInt(lastExecution) > interval) {
      updateSession()
    }
  }, [])

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
