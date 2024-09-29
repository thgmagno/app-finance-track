'use client'

import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { ErrorMessage } from '@/components/shared/ErrorMessage'
import { InputPassword } from './InputPassword'

export function LoginForm() {
  const [formState, action] = useFormState(actions.auth.login, { errors: {} })

  return (
    <Card className="my-20 w-[350px]">
      <CardHeader>
        <CardTitle>Finance Track</CardTitle>
        <CardDescription>
          Your Path to Smarter Financial Management.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage message={formState?.errors.email} />
            </div>
            <InputPassword
              label="Password"
              name="password"
              placeholder="Enter your password"
              errorMessage={formState?.errors.password}
            />
          </div>
          <ErrorMessage message={formState?.errors._form} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <LinkCreateAccount />
          <SubmitButton title="Login" className="min-w-[67.47px]" />
        </CardFooter>
      </form>
    </Card>
  )
}

function LinkCreateAccount() {
  const { replace } = useRouter()

  const handleClick = () => replace('/create-account')

  return (
    <Button type="button" onClick={handleClick} variant="link" className="p-0">
      Create account?
    </Button>
  )
}
