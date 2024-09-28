import { PageTitle } from '@/components/shared/PageTitle'
import { Button } from '@/components/ui/button'

export default async function Expenses() {
  const AddButton = () => <Button>Add new</Button>

  return (
    <>
      <PageTitle title="Expenses" children={<AddButton />} />
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          facilis eius exercitationem voluptate vitae? Ea quibusdam nesciunt
          magni maiores non alias libero dignissimos molestias dolor id,
          eligendi, quas suscipit rem!
        </p>
      </main>
    </>
  )
}
