import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import { type ColumnDefinition } from "./CustomizeColumnsButton";
import { ContractTableRow } from "./ContractTableRow";
import type { Contract } from "./types";
import * as XLSX from 'xlsx';

interface EnhancedContractsTableProps {
  contracts: Contract[];
  visibleColumns: ColumnDefinition[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function EnhancedContractsTable({
  contracts,
  visibleColumns,
}: EnhancedContractsTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const toggleRow = (contractId: number) => {
    setExpandedRows((prev) =>
      prev.includes(contractId)
        ? prev.filter((id) => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSort = (key: string) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return currentSort.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedContracts = React.useMemo(() => {
    if (!sortConfig) return contracts;

    return [...contracts].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Contract];
      const bValue = b[sortConfig.key as keyof Contract];

      if (aValue === undefined || bValue === undefined) return 0;

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [contracts, sortConfig]);

  const handleExport = () => {
    const exportData = sortedContracts.map(contract => {
      const row: Record<string, any> = {};
      visibleColumns
        .filter(col => col.visible)
        .forEach(col => {
          if (col.id === 'dateUploaded') {
            row[col.label] = format(new Date(contract[col.id]), "MMM d, yyyy");
          } else {
            row[col.label] = contract[col.id as keyof Contract];
          }
        });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contracts");
    XLSX.writeFile(wb, "contracts.xlsx");
  };

  const renderCellContent = (contract: Contract, columnId: string) => {
    const content = (() => {
      switch (columnId) {
        case "name":
          return contract.name;
        case "type":
          return contract.type;
        case "dateUploaded":
          return format(new Date(contract.dateUploaded), "MMM d, yyyy");
        case "status":
          return (
            <Badge
              variant={
                contract.status === "Active"
                  ? "default"
                  : contract.status === "Pending"
                  ? "secondary"
                  : "outline"
              }
            >
              {contract.status}
            </Badge>
          );
        case "currency":
          return contract.currency;
        case "value":
          return contract.value?.toLocaleString();
        case "parties":
          return contract.parties?.join(", ");
        case "restrictions":
          return contract.restrictions;
        default:
          return contract.terms?.[columnId];
      }
    })();

    return content ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="truncate max-w-[200px]">{content}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      "-"
    );
  };

  return (
    <div className="relative border rounded-lg">
      <div className="p-4 border-b">
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
      <ScrollArea className="w-full overflow-auto" type="always">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]" />
                {visibleColumns
                  .filter((col) => col.visible)
                  .map((column) => (
                    <TableHead
                      key={column.id}
                      className="min-w-[150px] cursor-pointer"
                      onClick={() => handleSort(column.id)}
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
            <TableBody>
              {sortedContracts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No contracts found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                sortedContracts.map((contract) => (
                  <React.Fragment key={contract.id}>
                    <ContractTableRow
                      contract={contract}
                      visibleColumns={visibleColumns}
                      isExpanded={expandedRows.includes(contract.id)}
                      onToggleExpand={() => toggleRow(contract.id)}
                      renderCellContent={renderCellContent}
                    />
                    {expandedRows.includes(contract.id) && (
                      <TableRow>
                        <TableCell colSpan={visibleColumns.length + 2}>
                          <div className="p-4 bg-muted/50">
                            <h4 className="font-medium mb-2">Additional Details</h4>
                            <dl className="grid grid-cols-2 gap-4">
                              {Object.entries(contract)
                                .filter(([key]) => !["id"].includes(key))
                                .map(([key, value]) => (
                                  <div key={key}>
                                    <dt className="text-sm font-medium text-muted-foreground capitalize">
                                      {key}
                                    </dt>
                                    <dd className="text-sm">
                                      {Array.isArray(value)
                                        ? value.join(", ")
                                        : String(value)}
                                    </dd>
                                  </div>
                                ))}
                            </dl>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}