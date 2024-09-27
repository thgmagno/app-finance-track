'use client'

import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { HTMLProps } from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends HTMLProps<'button'> {
  title: string
}

export function SubmitButton({ title, className }: Props) {
  const { pending } = useFormStatus()

  const Spinner = () => <Loader className="h-5 w-5 animate-spin" />

  return (
    <Button className={className} disabled={pending}>
      {pending ? <Spinner /> : title}
    </Button>
  )
}
