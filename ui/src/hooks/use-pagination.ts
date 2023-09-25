import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface PaginationProps {
  pages: number
  itemsPerPage: number
  totalItems: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: Dispatch<SetStateAction<number>>
  setTotalItems: Dispatch<SetStateAction<number>>
}

export const usePagination = (): PaginationProps => {
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    setPages(Math.ceil(totalItems / itemsPerPage))
  }, [itemsPerPage, totalItems])

  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage])

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    pages,
    setCurrentPage,
    setTotalItems,
    setItemsPerPage,
  }
}
