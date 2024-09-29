import { actions } from '@/actions'
import { CardLoading } from '@/components/cards/CardLoading'
import { CardMethods } from '@/components/cards/CardMethods'
import { Time } from '@/lib/time'
import { unstable_cache as cache } from 'next/cache'
import { Suspense } from 'react'

export default async function Methods({
  searchParams,
}: {
  searchParams: { data?: string }
}) {
  const getMethods = cache(
    async () => {
      return await actions.methods.findMany()
    },
    ['methods'],
    { revalidate: Time.month.oneMonth, tags: ['methods'] },
  )

  const methods = await getMethods()

  return (
    <div>
      <Suspense fallback={<CardLoading />}>
        <CardMethods data={searchParams.data} methodsList={methods} />
      </Suspense>
    </div>
  )
}
