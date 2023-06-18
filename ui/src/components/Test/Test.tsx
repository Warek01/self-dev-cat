import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Test: FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <h1 className="text-3xl, text-red-700 bg-amber-300">
      Hey
      <button onClick={handleClick}>CLick me</button>
    </h1>
  )
}

export default Test
