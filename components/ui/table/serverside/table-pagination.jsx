import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 *
 * @param {Obj} props
 * @param {Obj} props.pagination
 * @param {Number} props.pagination.pageSize // current page size
 * @param {Number} props.pagination.totalCount // total count
 * @param {Number} props.pagination.pageIndex // starts from 0
 * @param {Function} props.setPagination
 * @returns
 */

const rowsPerPageOptions = [5, 10, 20, 50];

export function DataTablePagination({ pagination }) {
  const { pageSize, totalCount, pageIndex, setPagination } = pagination;
  const currentPageCount =
    (pageIndex + 1) * pageSize > totalCount
      ? totalCount
      : (pageIndex + 1) * pageSize;
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const canGoPreviousPage = pageIndex > 0;
  const canGoNextPage = pageIndex + 1 < totalPageCount;

  const goToPreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex - 1,
    }));
  };

  const goToFirstPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));

  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));
  };

  const goToLastPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: totalPageCount - 1 }));

  const resetPageIndex = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  const handlePageSizeChange = (value) => {
    setPagination((prev) => ({ ...prev, pageSize: +value }));
    resetPageIndex();
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {currentPageCount} of {totalCount} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {rowsPerPageOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {totalPageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={!canGoPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={goToPreviousPage}
            disabled={!canGoPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={goToNextPage}
            disabled={!canGoNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={!canGoNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
