import { actions } from '@/actions'
import { CardCategories } from '@/components/cards/CardCategories'
import { CardLoading } from '@/components/cards/CardLoading'
import { Time } from '@/lib/time'
import { unstable_cache as cache } from 'next/cache'
import { Suspense } from 'react'

export default async function Categories({
  searchParams,
}: {
  searchParams: { data?: string }
}) {
  const getCategories = cache(
    async () => {
      return await actions.categories.findMany()
    },
    ['categories'],
    { revalidate: Time.month.oneMonth, tags: ['categories'] },
  )

  const categories = await getCategories()

  return (
    <div>
      <Suspense fallback={<CardLoading />}>
        <CardCategories data={searchParams.data} categoriesList={categories} />
      </Suspense>
    </div>
  )
}
