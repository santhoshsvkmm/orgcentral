
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColumnDef<TData, TValue = any> {
  accessorKey: keyof TData | string; 
  header: string | (({ column }: { column: { toggleSorting: (isDesc: boolean) => void; getIsSorted: () => false | 'asc' | 'desc' } }) => React.ReactNode);
  cell: (({ row }: { row: TData }) => React.ReactNode);
  enableSorting?: boolean;
  size?: string; 
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  searchableColumns?: (keyof TData)[];
  globalFilterPlaceholder?: string;
  noResultsMessage?: string;
  actionColumnAlignment?: 'left' | 'center' | 'right';
}

const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

export function DataTable<TData, TValue>({
  columns,
  data,
  itemsPerPage: initialItemsPerPage = 10,
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  searchableColumns,
  globalFilterPlaceholder = 'Search...',
  noResultsMessage = 'No results found.',
  actionColumnAlignment = 'right',
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = React.useState(initialItemsPerPage);
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof TData | string; direction: 'asc' | 'desc' } | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState('');

  React.useEffect(() => {
    setCurrentItemsPerPage(initialItemsPerPage);
    setCurrentPage(1); 
  }, [initialItemsPerPage]);

  const filteredData = React.useMemo(() => {
    let filtered = [...data];
    if (globalFilter && searchableColumns && searchableColumns.length > 0) {
      filtered = filtered.filter(item =>
        searchableColumns.some(columnKey => {
          const value = item[columnKey];
          return String(value).toLowerCase().includes(globalFilter.toLowerCase());
        })
      );
    }
    return filtered;
  }, [data, globalFilter, searchableColumns]);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key as keyof TData];
        const valB = b[sortConfig.key as keyof TData];

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * (sortConfig.direction === 'asc' ? 1 : -1);
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * (sortConfig.direction === 'asc' ? 1 : -1);
        }
        return String(valA).localeCompare(String(valB)) * (sortConfig.direction === 'asc' ? 1 : -1);
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / currentItemsPerPage);
  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + currentItemsPerPage);

  const handleSort = (key: keyof TData | string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); 
  };
  
  const getSortDirectionIcon = (key: keyof TData | string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3 opacity-30 group-hover:opacity-100" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUpDown className="ml-2 h-3 w-3 rotate-0" />
    ) : (
      <ArrowUpDown className="ml-2 h-3 w-3 rotate-180" />
    );
  };

  const handleItemsPerPageChange = (value: string) => {
    setCurrentItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {searchableColumns && searchableColumns.length > 0 && (
          <div className="relative flex-grow sm:flex-grow-0 sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={globalFilterPlaceholder}
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:max-w-xs pl-10 h-10"
            />
          </div>
        )}
        <div className="flex items-center space-x-2 ml-auto">
          <p className="text-sm text-muted-foreground">Rows per page:</p>
          <Select
            value={String(currentItemsPerPage)}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[70px] h-9 text-sm">
              <SelectValue placeholder={currentItemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map(option => (
                <SelectItem key={option} value={String(option)} className="text-sm">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>{columns.map((column) => <TableHead 
                key={String(column.accessorKey)} 
                style={{ width: column.size || 'auto' }}
                className={cn(
                    column.enableSorting ? "cursor-pointer group" : "",
                    (String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && `text-${actionColumnAlignment}`
                )}
                onClick={() => column.enableSorting && handleSort(column.accessorKey)}
            ><div className={cn("flex items-center", 
                (String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && 
                (actionColumnAlignment === 'center' ? 'justify-center' : actionColumnAlignment === 'right' ? 'justify-end' : '')
              )}>{typeof column.header === 'function' 
                    ? column.header({ column: { toggleSorting: (isDesc) => handleSort(column.accessorKey), getIsSorted: () => sortConfig?.key === column.accessorKey ? sortConfig.direction : false } }) 
                    : column.header}{column.enableSorting && getSortDirectionIcon(column.accessorKey)}</div></TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={`row-${index}-${JSON.stringify(row)}`}>{columns.map((column) => <TableCell key={String(column.accessorKey)} className={cn((String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && `text-${actionColumnAlignment}`)}>{column.cell({ row })}</TableCell>)}</TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

DataTable.displayName = "DataTable";
