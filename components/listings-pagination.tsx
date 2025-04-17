import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ListingsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ListingsPagination({ currentPage, totalPages, onPageChange }: ListingsPaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex w-[100px] justify-start">
        {currentPage > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-2">Previous</span>
          </Button>
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex w-[100px] justify-end">
        {currentPage < totalPages && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="mr-2">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
} 