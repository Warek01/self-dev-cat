import {
  createRef,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TextInput } from '../../components'

import icons from '../../icons'
import { login } from '../../lib/auth/login.ts'
import { AppRoute } from '../../lib/enums/AppRoute.ts'
import { useAppDispatch } from '../../lib/hooks/useAppDispatch.ts'
import useGlobalListener from '../../lib/hooks/useGlobalListener.ts'

const MIN_PASSWORD_LENGTH = 6

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()

  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false)

  const loginRefs = useMemo(
    () => ({
      username: createRef<HTMLInputElement>(),
      password: createRef<HTMLInputElement>(),
    }),
    [],
  )

  const handleLogin = useCallback(async () => {
    let loginSuccess = true

    const username = loginRefs.username.current?.value ?? ''
    const password = loginRefs.password.current?.value ?? ''

    if (password.length < MIN_PASSWORD_LENGTH) {
      setIsInvalidPassword(true)
      loginSuccess = false
    }

    if (!loginSuccess) {
      return
    }

    const { error, unauthorized } = await login({ username, password })
    if (error) {
      toast('Login failed', { type: 'error' })
    }

    if (unauthorized) {
      setIsInvalidPassword(true)
      setIsInvalidUsername(true)
      toast('Wrong username or password', { type: 'error' })
    }
  }, [])

  useGlobalListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (document.activeElement === loginRefs.username.current ||
        document.activeElement === loginRefs.password.current)
    ) {
      handleLogin()
    }
  })

  return (
    <main
      className="mx-auto max-w-3xl flex flex-col gap-6 items-center my-auto
      dark:bg-dark-white/5 rounded-xl p-12 shadow-xl"
    >
      <div className="p-4 bg-black/5 dark:bg-dark-white/5 rounded-full mb-6 shadow-xl">
        <icons.User width={48} height={48} />
      </div>
      <TextInput
        name="Username"
        placeholder="Username"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        ref={loginRefs.username}
        onChange={() => setIsInvalidUsername(false)}
        invalid={isInvalidUsername}
        invalidText="Invalid Username."
      />
      <TextInput
        password
        name="Password"
        placeholder="Password"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        ref={loginRefs.password}
        onChange={() => setIsInvalidPassword(false)}
        invalid={isInvalidPassword}
        invalidText={`Password is shorter than ${MIN_PASSWORD_LENGTH} characters.`}
      />
      <button
        onClick={handleLogin}
        className="py-2 px-4 rounded-md mt-8 shadow-lg hover:shadow-xl hover:bg-black/10"
      >
        Log in
      </button>
      <Link to={AppRoute.REGISTER}>Register</Link>
    </main>
  )
}

export default memo(LoginForm, () => true)
