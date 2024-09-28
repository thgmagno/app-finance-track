'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { ErrorMessage } from '../shared/ErrorMessage'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Methods } from '@prisma/client'
import { z } from 'zod'
import { CreditCard, Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

export function CardMethods({ methodsList }: { methodsList: Methods[] }) {
  const [formState, action] = useFormState(actions.methods.upsert, {
    errors: {},
  })

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('data')) {
      const parsed = parseData(searchParams.get('data'))
      setId(parsed.id)
      setName(parsed.name)
    } else {
      setId('')
      setName('')
    }
  }, [searchParams, formState])

  return (
    <div className="flex flex-col space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Methods</CardTitle>
          <CardDescription>
            This is the visible name of your financial method. For example,
            "Credit Card", "Bank Transfer", or "Cash", which helps specify how
            an expense, income, or saving is processed.
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <input type="hidden" name="id" value={id} />
              <div className="grid gap-5">
                <div className="flex flex-col space-y-1.5 md:w-1/2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <ErrorMessage message={formState?.errors.name} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-5">
            <span className="mr-5 text-sm text-muted-foreground">
              Please use 32 characters at maximum.
            </span>
            <SubmitButton title="Save" className="min-w-[67.47px]" />
          </CardFooter>
        </form>
      </Card>
      <ListMethods methodsList={methodsList} />
    </div>
  )
}

function parseData(data: string | null) {
  const schema = z.object({
    name: z.string(),
    id: z.string(),
    createdAt: z.string().transform((val) => new Date(val)),
    updatedAt: z.string().transform((val) => new Date(val)),
    teamsId: z.string(),
  })

  const dataJson = JSON.parse(decodeURI(String(data)))
  const parsed = schema.safeParse(dataJson)

  if (!parsed.success) {
    redirect('/settings/methods')
  }

  return parsed.data
}

function ListMethods({ methodsList }: { methodsList: Methods[] }) {
  const Empty = () => (
    <div className="flex flex-col items-center justify-center space-y-1.5 rounded-lg border p-5 text-sm text-muted-foreground">
      <CreditCard className="h-5 w-5" />
      <p>No methods added</p>
    </div>
  )

  const encodeData = (data: Methods) => encodeURI(JSON.stringify(data))

  const handleDelete = async (id: string) => {
    toast({ description: '⌛ Loading...' })
    const { success, message } = await actions.methods.drop(id)

    return success
      ? toast({ description: message })
      : toast({ description: message, variant: 'destructive' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Methods list</CardTitle>
      </CardHeader>
      <CardContent>
        {methodsList.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {methodsList.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div>
                  <p className="font-semibold capitalize">{method.name}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={{ query: { data: encodeData(method) } }}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(method.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </CardContent>
    </Card>
  )
}
