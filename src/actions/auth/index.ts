import { login } from '@/actions/auth/login'
import { register } from '@/actions/auth/register'
import { getServerSession, keepSessionUpdated } from '@/actions/auth/session'

export const auth = {
  login,
  register,
  session: {
    getServerSession,
    keepSessionUpdated,
  },
}
