import { useUnit } from 'effector-react'
import { $store, setFilter } from '~widgets/assets/assets.store'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '~components/ui/pagination'

export function AssetsPagination() {
  const { filter, count } = useUnit($store)
  const pageSize = filter.page_size || 25
  const totalPages = Math.ceil(count / pageSize)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">Всего: {count}</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious disabled={filter.page <= 1} onClick={() => setFilter({ page: filter.page - 1 })} /></PaginationItem>
          <PaginationItem><PaginationLink isActive>{filter.page}</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext disabled={filter.page >= totalPages} onClick={() => setFilter({ page: filter.page + 1 })} /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
