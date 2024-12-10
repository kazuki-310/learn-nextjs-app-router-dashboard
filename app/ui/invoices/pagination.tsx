'use client'

import { generatePagination } from '@/app/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useQueryState('page', {
    shallow: false,
  })
  const currentPage = Number(page) || 1
  const allPages = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const createPageURL = useCallback((pageNumber: number | string) => {
    return `?page=${pageNumber}`
  }, [])

  const handlePageChange = (pageNumber: number | string) => {
    setPage(pageNumber.toString())
  }

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />

      <div className="flex -space-x-px">
        {allPages.map((pageItem, index) => {
          const position =
            index === 0
              ? 'first'
              : index === allPages.length - 1
                ? 'last'
                : allPages.length === 1
                  ? 'single'
                  : pageItem === '...'
                    ? 'middle'
                    : undefined

          return (
            <PaginationNumber
              key={pageItem}
              href={createPageURL(pageItem)}
              page={pageItem}
              position={position}
              isActive={currentPage === Number(pageItem)}
              onClick={() => handlePageChange(pageItem)}
            />
          )
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </div>
  )
}

type PaginationNumberProps = {
  page: number | string
  href: string
  isActive: boolean
  position?: 'first' | 'last' | 'middle' | 'single'
  onClick: () => void
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  onClick,
}: PaginationNumberProps) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {page}
    </Link>
  )
}

type PaginationArrowProps = {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
  onClick: () => void
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  onClick,
}: PaginationArrowProps) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  )

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {icon}
    </Link>
  )
}
