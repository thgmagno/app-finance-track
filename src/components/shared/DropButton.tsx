'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

interface Props {
  id: string
  action: (id: string) => Promise<{
    success: boolean
    message: string
  }>
}

export function DropButton({ id, action }: Props) {
  const handleClick = async () => {
    toast({ description: 'Loading...' })
    const { success, message } = await action(id)

    return success
      ? toast({ description: message })
      : toast({ description: message, variant: 'destructive' })
  }

  return <Button onClick={handleClick}>Delete</Button>
}
