import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../ui/pagination";

interface ReusablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number; // optional for how many numbers around current page
}

const CustomPagination: React.FC<ReusablePaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    pages.push(1);

    if (start > 2) {
      pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}

        {/* Pages */}
        {pages.map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
