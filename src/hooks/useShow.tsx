import { useEffect, useState } from 'react'

export const useShow = () => {
  const [show, setShow] = useState<boolean>(false)

  function open () {
    setShow(true)
  }
  const close = () => {
    setShow(false)
  }

  useEffect(() => {
    console.log(show)
  }, [show])

  return { show, open, close }
}
