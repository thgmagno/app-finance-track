'use client'

import { actions } from '@/actions'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { usePathname, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'

export default function StoreCategories() {
  const [formState, action] = useFormState(actions.categories.upsert, {
    errors: {},
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()

  return (
    <div>
      <h1>Store Categories</h1>

      <form action={action}>
        <input type="hidden" name="id" />
        <input type="text" name="name" className="bg-zinc-800" />
        <select name="type" className="bg-zinc-800">
          <option value="EXPENSE">EXPENSE</option>
          <option value="RECEIPT">RECEIPT</option>
          <option value="SAVING">SAVING</option>
        </select>
        {Object.values(formState.errors).length > 0 && (
          <pre>{JSON.stringify(formState.errors, null, 2)}</pre>
        )}
        <SubmitButton title="Save" />
      </form>
    </div>
  )
}
