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

import icons from '../../icons';
import { TextInput } from '../../components'
import { AppRoute } from '../../lib/constants/enums/AppRoute.ts'
import { isEmail } from '../../lib/helpers/isEmail.ts'
import useGlobalListener from '../../lib/hooks/useGlobalListener.ts'

const MIN_PASSWORD_LENGTH = 6

const LoginForm: FC = () => {
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false)

  const loginRefs = useMemo(
    () => ({
      email: createRef<HTMLInputElement>(),
      password: createRef<HTMLInputElement>(),
    }),
    [],
  )

  const handleLogin = useCallback(async () => {
    let loginSuccess = true

    const email = loginRefs.email.current?.value ?? ''
    const password = loginRefs.password.current?.value ?? ''

    if (!isEmail(email)) {
      setIsInvalidEmail(true)
      loginSuccess = false
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setIsInvalidPassword(true)
      loginSuccess = false
    }

    if (!loginSuccess) {
      return
    }

    console.log('Login')

    // loginSuccess = await auth.login(email, password)
    //
    // if (loginSuccess) {
    //   await router.push(AppRoute.Home)
    // }
  }, [])

  useGlobalListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (document.activeElement === loginRefs.email.current ||
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
        name="Email"
        placeholder="Email"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        ref={loginRefs.email}
        onChange={() => setIsInvalidEmail(false)}
        invalid={isInvalidEmail}
        invalidText="Invalid Email."
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
