import { actions } from '@/actions'
import { CardCategories } from '@/components/cards/CardCategories'
import { Time } from '@/lib/time'
import { unstable_cache as cache } from 'next/cache'

export default async function Categories() {
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
      <CardCategories categoriesList={categories} />
    </div>
  )
}
