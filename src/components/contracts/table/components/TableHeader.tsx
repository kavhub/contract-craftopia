import React from "react";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { type ColumnDefinition } from "../CustomizeColumnsButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableHeaderProps {
  visibleColumns: ColumnDefinition[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
}

export function TableHeader({ visibleColumns, onSort, sortConfig }: TableHeaderProps) {
  const tooltipDescriptions: Record<string, string> = {
    name: "Name of the contract document",
    type: "Type or category of the contract",
    dateUploaded: "Date when the contract was uploaded",
    currency: "Currency used in the contract",
    value: "Monetary value of the contract",
    parties: "Parties involved in the contract",
    restrictions: "Any restrictions or limitations"
  };

  return (
    <UITableHeader>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      {column.label}
                      <ArrowUpDown className={`h-4 w-4 ${
                        sortConfig?.key === column.id
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltipDescriptions[column.id] || `${column.label} column`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
          ))}
        <TableHead className="w-[100px] text-right sticky right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          Actions
        </TableHead>
      </TableRow>
    </UITableHeader>
  );
}