import { actions } from '@/actions'
import { DropButton } from '@/components/shared/DropButton'
import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'

export default async function Categories() {
  const getCategories = cache(
    async () => {
      return await actions.categories.findMany()
    },
    ['categories'],
    { revalidate: 30, tags: ['categories'] },
  )

  const categories = await getCategories()

  return (
    <div>
      <div className="flex justify-between">
        <h1>Categories</h1>
        <Link href="/settings/categories/store">Add new</Link>
      </div>
      {categories.length >= 0 &&
        categories.map((category) => (
          <div key={category.id} className="flex">
            <p>
              {category.name} - {category.type}
            </p>
            <DropButton id={category.id} action={actions.categories.drop} />
          </div>
        ))}
    </div>
  )
}
