'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type ModalOverlayProps = {
  clearParam?: string | string[]
  disableCloseModal: boolean
}

export function ModalOverlay({
  clearParam,
  disableCloseModal,
}: Readonly<ModalOverlayProps>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const closeModal = useCallback(() => {
    if (disableCloseModal) return

    if (clearParam && !Array.isArray(clearParam)) {
      const params = new URLSearchParams(searchParams)
      params.delete(clearParam)
      return replace(`${pathname}?${params.toString()}`)
    }

    if (clearParam && Array.isArray(clearParam)) {
      const params = new URLSearchParams(searchParams)
      clearParam.forEach((param) => {
        params.delete(param)
      })
      return replace(`${pathname}?${params.toString()}`)
    }

    replace(pathname)
  }, [clearParam, disableCloseModal, pathname, replace, searchParams])

  return (
    <button
      id="overlay"
      className="fixed inset-0 bg-black opacity-75 cursor-default z-[100]"
      type="button"
      onClick={closeModal}
      aria-label="Close Modal"
    />
  )
}
