'use client'

import * as React from "react"
import { cn } from "@/utilities/ui"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"

// ---------- Root Pagination ----------
export const Pagination: React.FC<React.ComponentProps<'nav'>> = ({ className, ...props }) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

// ---------- Pagination Content ----------
export const PaginationContent: React.FC<React.ComponentProps<'ul'>> = ({ className, ...props }) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

// ---------- Pagination Item ----------
export const PaginationItem: React.FC<React.ComponentProps<'li'>> = (props) => {
  return <li data-slot="pagination-item" {...props} />
}

// ---------- Pagination Link ----------
export type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

export const PaginationLink: React.FC<PaginationLinkProps> = ({
  className,
  isActive,
  size = "icon",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      disabled={disabled}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

// ---------- Previous Button ----------
export type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & {
  text?: string
}

export const PaginationPrevious: React.FC<PaginationPreviousProps> = ({
  className,
  text = "Previous",
  disabled = false,
  ...props
}) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      disabled={disabled}
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

// ---------- Next Button ----------
export type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  text?: string
}

export const PaginationNext: React.FC<PaginationNextProps> = ({
  className,
  text = "Next",
  disabled = false,
  ...props
}) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      disabled={disabled}
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

// ---------- Ellipsis ----------
export const PaginationEllipsis: React.FC<React.ComponentProps<'span'>> = ({
  className,
  ...props
}) => {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}

// ---------- Full PostsPagination Component ----------
export const PostsPagination: React.FC<{
  page: number
  totalPages: number
  className?: string
}> = ({ page, totalPages, className }) => {
  const router = useRouter()
  const hasNext = page < totalPages
  const hasPrev = page > 1

  // Dynamic page numbers, show up to 5 pages around current
  const pages: (number | 'ellipsis')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 4) pages.push('ellipsis')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page + 1 < totalPages - 1) pages.push('ellipsis')
    pages.push(totalPages)
  }

  return (
    <Pagination className={cn("my-12", className)}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            disabled={!hasPrev}
            onClick={() => hasPrev && router.push(`/posts/page/${page - 1}`)}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => router.push(`/posts/page/${p}`)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            disabled={!hasNext}
            onClick={() => hasNext && router.push(`/posts/page/${page + 1}`)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}