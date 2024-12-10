'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useQueryState } from 'nuqs'

export default function Search({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useQueryState('query', {
    shallow: false,
    throttleMs: 500,
  })
  const [_, setPage] = useQueryState('page')

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          setPage('1')
          setQuery(e.target.value)
        }}
        defaultValue={query || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
