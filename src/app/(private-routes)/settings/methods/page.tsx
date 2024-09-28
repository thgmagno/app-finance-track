import { actions } from '@/actions'
import { CardMethods } from '@/components/cards/CardMethods'
import { Time } from '@/lib/time'
import { unstable_cache as cache } from 'next/cache'

export default async function Methods() {
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
      <CardMethods />
    </div>
  )
}
