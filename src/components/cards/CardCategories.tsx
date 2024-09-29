'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { ErrorMessage } from '@/components/shared/ErrorMessage'
import React from 'react'
import { Categories } from '@prisma/client'
import { Edit, Grid2x2Plus, MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

export function CardCategories({
  data,
  categoriesList,
}: {
  data?: string
  categoriesList: Categories[]
}) {
  const [formState, action] = useFormState(actions.categories.upsert, {
    errors: {},
  })

  const parsed: Categories | null = data ? JSON.parse(decodeURI(data)) : null

  return (
    <div className="flex flex-col space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            This is the visible name of your financial category. For example,
            "Food", "Transport", or "Leisure", which helps classify your
            expenses or income.
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <input type="hidden" name="id" value={parsed?.id ?? ''} />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={parsed?.name ?? ''}
                  />
                  <ErrorMessage message={formState?.errors.name} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type">
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a type"
                        defaultValue={parsed?.type ?? ''}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                        <SelectItem value="RECEIPT">Receipt</SelectItem>
                        <SelectItem value="SAVING">Saving</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={formState?.errors.type} />
                </div>
              </div>
              <ErrorMessage message={formState?.errors._form} />
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
      <ListCategories categoriesList={categoriesList} />
    </div>
  )
}

function ListCategories({ categoriesList }: { categoriesList: Categories[] }) {
  const Empty = () => (
    <div className="flex flex-col items-center justify-center space-y-1.5 rounded-lg border p-5 text-sm text-muted-foreground">
      <Grid2x2Plus className="h-5 w-5" />
      <p>No categories added</p>
    </div>
  )

  const encodeData = (data: Categories) => encodeURI(JSON.stringify(data))

  const handleDelete = async (id: string) => {
    toast({ description: '⌛ Loading...' })
    const { success, message } = await actions.categories.drop(id)

    return success
      ? toast({ description: message })
      : toast({ description: message, variant: 'destructive' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories list</CardTitle>
      </CardHeader>
      <CardContent>
        {categoriesList.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {categoriesList.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div>
                  <Badge>{category.type}</Badge>
                  <p className="mt-3 font-semibold capitalize">
                    {category.name}
                  </p>
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
                      <Link href={{ query: { data: encodeData(category) } }}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(category.id)}>
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
