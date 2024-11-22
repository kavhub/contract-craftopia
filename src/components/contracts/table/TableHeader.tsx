import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { type ColumnDefinition } from "./CustomizeColumnsButton";

interface ContractsTableHeaderProps {
  visibleColumns: ColumnDefinition[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
}

export function ContractsTableHeader({ visibleColumns, onSort, sortConfig }: ContractsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px]" />
        {visibleColumns
          .filter((col) => col.visible && col.id !== 'status')
          .map((column) => (
            <TableHead
              key={column.id}
              className="min-w-[150px] cursor-pointer"
              onClick={() => onSort(column.id)}
            >
              <div className="flex items-center gap-2">
                {column.label}
                <ArrowUpDown className={`h-4 w-4 ${
                  sortConfig?.key === column.id
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`} />
              </div>
            </TableHead>
          ))}
        <TableHead className="w-[100px] text-right sticky right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}