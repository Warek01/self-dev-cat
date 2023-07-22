import { FC, memo } from 'react'

import { RegisterContainer } from "@containers";

const RegisterPage: FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <RegisterContainer />
    </main>
  )
}

export default memo(RegisterPage)
