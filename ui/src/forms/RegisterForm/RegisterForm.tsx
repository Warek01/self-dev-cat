import {
  createRef,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, TextInput } from '../../components'
import icons from '../../icons'
import { register } from '../../lib/auth/register.ts'

import { AppRoute } from '../../lib/enums/AppRoute.ts'
import { isEmail } from '../../lib/helpers/isEmail.ts'
import useGlobalListener from '../../lib/hooks/useGlobalListener.ts'

const MIN_PASSWORD_LENGTH = 6

const RegisterForm: FC = () => {
  const navigate = useNavigate()

  const [validInputs, setValidInputs] = useState({
    username: true,
    email: true,
    password: true,
    passwordConfirm: true,
  })

  const loginRefs = useMemo(
    () => ({
      username: createRef<HTMLInputElement>(),
      email: createRef<HTMLInputElement>(),
      password: createRef<HTMLInputElement>(),
      passwordConfirm: createRef<HTMLInputElement>(),
    }),
    [],
  )

  const handleRegistration = useCallback(async () => {
    let regSuccess = true

    const email = loginRefs.email.current?.value ?? ''
    const password = loginRefs.password.current?.value ?? ''
    const passwordConfirm = loginRefs.passwordConfirm.current?.value ?? ''
    const username = loginRefs.username.current?.value ?? ''

    if (!isEmail(email)) {
      setValidInputs((val) => ({ ...val, email: false }))
      regSuccess = false
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setValidInputs((val) => ({ ...val, password: false }))
      regSuccess = false
    }
    if (passwordConfirm !== password) {
      setValidInputs((val) => ({ ...val, passwordConfirm: false }))
      regSuccess = false
    }
    if (!/([a-z]|[A-Z]|[1-9]|_|\$|@|-\{|})+/.test(username)) {
      setValidInputs((val) => ({ ...val, username: false }))
      regSuccess = false
    }

    if (!regSuccess) {
      return
    }

    const status = await register({
      username,
      password,
      email,
    })

    if (status.error) {
      toast(status.error.toString(), { type: 'error' })
    }
  }, [])

  useGlobalListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (document.activeElement === loginRefs.email.current ||
        document.activeElement === loginRefs.username.current ||
        document.activeElement === loginRefs.passwordConfirm.current ||
        document.activeElement === loginRefs.password.current)
    ) {
      handleRegistration()
    }
  })

  return (
    <main
      className="max-w-3xl flex flex-col gap-6 items-center w-full
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
        onChange={() => setValidInputs((val) => ({ ...val, email: true }))}
        invalid={!validInputs.email}
        invalidText="Invalid Email."
      />
      <TextInput
        name="Username"
        placeholder="Username"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        ref={loginRefs.username}
        onChange={() => setValidInputs((val) => ({ ...val, username: true }))}
        invalid={!validInputs.username}
        invalidText="Username is too short or has invalid characters."
      />
      <TextInput
        name="Password"
        placeholder="Password"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        password
        ref={loginRefs.password}
        onChange={() => setValidInputs((val) => ({ ...val, password: true }))}
        invalid={!validInputs.password}
        invalidText="Invalid password."
      />
      <TextInput
        name="PasswordConfirm"
        placeholder="Confirm password"
        className="w-full sm:w-xs md:w-sm lg:w-md"
        autoComplete
        password
        ref={loginRefs.passwordConfirm}
        onChange={() =>
          setValidInputs((val) => ({ ...val, passwordConfirm: true }))
        }
        invalid={!validInputs.passwordConfirm}
        invalidText="Passwords do not match."
      />
      <Button
        text="Create account"
        onClick={handleRegistration}
        className="py-2 px-4 rounded-md mt-8 shadow-lg hover:bg-transparent hover:shadow-xl dark:hover:bg-dark-white/10"
      />
      <Link to={AppRoute.LOGIN}>Have an account?</Link>
    </main>
  )
}

export default memo(RegisterForm)
