
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
import { ArrowUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColumnDef<TData, TValue = any> {
  accessorKey: keyof TData | string; // Use string for custom/display columns like 'actions'
  header: string | (({ column }: { column: { toggleSorting: (isDesc: boolean) => void; getIsSorted: () => false | 'asc' | 'desc' } }) => React.ReactNode);
  cell: (({ row }: { row: TData }) => React.ReactNode);
  enableSorting?: boolean;
  size?: string; // e.g. "100px", "auto", "20%"
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  itemsPerPage?: number;
  searchableColumns?: (keyof TData)[];
  globalFilterPlaceholder?: string;
  noResultsMessage?: string;
  actionColumnAlignment?: 'left' | 'center' | 'right';
}

export function DataTable<TData, TValue>({
  columns,
  data,
  itemsPerPage = 10,
  searchableColumns,
  globalFilterPlaceholder = 'Search...',
  noResultsMessage = 'No results found.',
  actionColumnAlignment = 'right',
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof TData | string; direction: 'asc' | 'desc' } | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState('');

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
        // Fallback for other types (e.g., dates as strings)
        return String(valA).localeCompare(String(valB)) * (sortConfig.direction === 'asc' ? 1 : -1);
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: keyof TData | string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
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

  return (
    <div className="space-y-4">
      {searchableColumns && searchableColumns.length > 0 && (
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={globalFilterPlaceholder}
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="w-full max-w-sm pl-10 h-10"
            />
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                    key={String(column.accessorKey)} 
                    style={{ width: column.size || 'auto' }}
                    className={cn(
                        column.enableSorting ? "cursor-pointer group" : "",
                        (String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && `text-${actionColumnAlignment}`
                    )}
                    onClick={() => column.enableSorting && handleSort(column.accessorKey)}
                >
                  <div className={cn("flex items-center", 
                    (String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && 
                    (actionColumnAlignment === 'center' ? 'justify-center' : actionColumnAlignment === 'right' ? 'justify-end' : '')
                  )}>
                    {typeof column.header === 'function' 
                        ? column.header({ column: { toggleSorting: (isDesc) => handleSort(column.accessorKey), getIsSorted: () => sortConfig?.key === column.accessorKey ? sortConfig.direction : false } }) 
                        : column.header}
                    {column.enableSorting && getSortDirectionIcon(column.accessorKey)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={`row-${index}`}>
                  {columns.map((column) => (
                    <TableCell 
                        key={String(column.accessorKey)}
                        className={cn((String(column.accessorKey).toLowerCase() === 'actions' || String(column.header).toLowerCase() === 'actions') && `text-${actionColumnAlignment}`)}
                    >
                        {column.cell({ row })}
                    </TableCell>
                  ))}
                </TableRow>
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
      {totalPages > 1 && (
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
