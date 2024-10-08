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
import { ErrorMessage } from '../shared/ErrorMessage'
import { InputPassword } from './InputPassword'

export function CreateAccountForm() {
  const [formState, action] = useFormState(actions.auth.register, {
    errors: {},
  })

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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" />
              <ErrorMessage message={formState?.errors.name} />
            </div>
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
              label="password"
              name="password"
              placeholder="Choose a secure password"
              errorMessage={formState?.errors.password}
            />
            <InputPassword
              label="Confirm password"
              name="confirmPassword"
              placeholder="Confirm the password"
              errorMessage={formState?.errors.confirmPassword}
            />
          </div>
          <ErrorMessage message={formState?.errors._form} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <LinkLogin />
          <SubmitButton title="Create account" className="min-w-[127px]" />
        </CardFooter>
      </form>
    </Card>
  )
}

function LinkLogin() {
  const { replace } = useRouter()

  const handleClick = () => replace('/login')

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant="link"
      className="p-0 text-start"
    >
      Already have{<br />}an account?
    </Button>
  )
}
