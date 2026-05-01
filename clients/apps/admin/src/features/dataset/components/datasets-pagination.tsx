import { useUnit } from 'effector-react'
import { $store, setFilter } from '~widgets/datasets/datasets.store'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '~components/ui/pagination'

export function DatasetsPagination() {
  const { filter, count } = useUnit($store)
  const pageSize = filter.page_size || 25
  const totalPages = Math.ceil(count / pageSize)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Всего: {count} элементов
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={filter.page <= 1}
              onClick={() => setFilter({ page: filter.page - 1 })}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page: number
            if (totalPages <= 5) {
              page = i + 1
            } else if (filter.page <= 3) {
              page = i + 1
            } else if (filter.page >= totalPages - 2) {
              page = totalPages - 4 + i
            } else {
              page = filter.page - 2 + i
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === filter.page}
                  onClick={() => setFilter({ page })}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              disabled={filter.page >= totalPages}
              onClick={() => setFilter({ page: filter.page + 1 })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
