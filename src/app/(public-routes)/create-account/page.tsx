import { CreateAccountForm } from '@/components/auth/CreateAccountForm'

export default async function CreateAccount() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CreateAccountForm />
    </main>
  )
}
