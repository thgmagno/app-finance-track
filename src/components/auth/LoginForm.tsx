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

export function LoginForm() {
  return (
    <Card className="my-20 w-[350px]">
      <CardHeader>
        <CardTitle>Finance Track</CardTitle>
        <CardDescription>
          Your Path to Smarter Financial Management.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
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
