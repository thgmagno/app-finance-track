'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorMessage } from '@/components/shared/ErrorMessage'
import { Eye, EyeOff } from 'lucide-react'

interface Props {
  label: string
  name: string
  placeholder: string
  errorMessage?: string | string[]
}

export function InputPassword({
  label,
  name,
  placeholder,
  errorMessage,
}: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          type={visible ? 'text' : 'password'}
          id={name}
          name={name}
          placeholder={placeholder}
        />
        <div
          onClick={() => setVisible(!visible)}
          className="absolute right-0 top-0 flex h-9 w-10 cursor-pointer items-center justify-center"
        >
          {visible ? (
            <EyeOff className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Eye className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  )
}
